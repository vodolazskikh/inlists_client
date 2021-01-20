/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ListPreview } from "../components/listPreview";
import { User } from "../components/user";
import { SearchInput } from "../components/searchInput";
import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "state/actions/popup";
import { generateUuid } from "utils/generateUuid";
import { List } from "types/data";
import { features } from "config";
import { City } from "../components/city";
import { useHistory, useLocation } from "react-router-dom";
import { AppState } from "types/state";
import { getListById } from "state/actions/lists/byId";
import { fetchListsByCity } from "state/actions/lists/byCity";
import { Loading } from "svg/loading";
import { CityCode } from "types/city";
import { setUserCity } from "state/actions/user";

export const Main: FC = memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const popup = useSelector((state: AppState) => state.popup);
  const listsInState = useSelector((state: AppState) => state.lists);
  const lsCityCode = localStorage.getItem("user_last_city") || "nsk";
  const [cityCode, setCityCode] = useState(lsCityCode);

  const cityChangeHandler = useCallback((newCityCode: CityCode) => {
    localStorage.setItem("user_last_city", newCityCode);
    dispatch(setUserCity(newCityCode));
    setCityCode(newCityCode);
  }, []);

  const listsByCity: List[] | undefined = useSelector(
    (state: AppState) => state.city.data?.[cityCode]
  );

  const isCityGeneralListsLoading = useSelector(
    (state: AppState) => state.city.meta.loading
  );

  useEffect(() => {
    // Сфетчим все топ-списки для города (если их еще нет в стейте)
    if (listsByCity?.length) {
      return;
    }
    const city = localStorage.getItem("user_last_city") as CityCode;
    dispatch(setUserCity(city || "nsk"));
    dispatch(fetchListsByCity({ city: cityCode }));
  }, [cityCode]);

  const openFullscreenMode = (item: List) => {
    history.push(`/list?id=${item._id}`);
    dispatch(openPopup({ id: generateUuid(), type: "list", item }));
  };

  const adsEl = {
    _id: "promo",
    title: "Промо-блок",
    description: "Я продам этот рекламный-слот и стану очень богатым",
    rating: 5,
    items: [],
    isAds: true,
    isCityGeneral: true,
  };

  let mutableListWithAds: List[] = [];

  if (listsByCity && features.main_promo) {
    mutableListWithAds = [
      ...listsByCity.slice(0, 2),
      adsEl,
      ...listsByCity.slice(2, listsByCity.length),
    ];
  } else if (listsByCity && !features.main_promo) {
    mutableListWithAds = [...listsByCity];
  }

  useEffect(() => {
    if (location.pathname === "/list" && !popup.id && popup.type !== "list") {
      const openedIdList = location.search.split("?id=")[1];

      dispatch(getListById({ id: openedIdList }));
      if (listsInState.data && listsInState.data[openedIdList]) {
        dispatch(
          openPopup({
            id: generateUuid(),
            type: "list",
            item: listsInState.data[openedIdList],
          })
        );
      }
    }
  }, [location, listsInState.data]);

  useEffect(() => {
    if (location.pathname === "/add" && popup.type !== "addNew") {
      dispatch(openPopup({ id: generateUuid(), type: "addNew" }));
    }
  }, [location, popup.type]);

  const body = useMemo(() => {
    if (isCityGeneralListsLoading) {
      return (
        <div className="border-black bg-gray-100 m-8 px-32 py-32 rounded-md col-span-4 row-span-4">
          <Loading />
        </div>
      );
    }
    return mutableListWithAds.map((item, ind) => (
      <ListPreview
        key={`${item._id}_${ind}`}
        onClick={() => openFullscreenMode(item)}
        position={ind}
        list={item}
      />
    ));
  }, [isCityGeneralListsLoading, mutableListWithAds]);

  return (
    <div className="min-h-screen gap-4 flex flex-col items-center justify-center text-gray-500 relative">
      <section className="absolute top-32 right-32 flex-col flex items-start">
        <User />
      </section>
      <section className="grid grid-cols-4 p-32 z-base sm:flex sm:flex-col sm:mt-112 w-full">
        <div className="col-span-4 select-none">
          <City
            cityCode={cityCode as CityCode}
            onCityChange={cityChangeHandler}
          />
        </div>
        {features.search && <SearchInput />}
        {body}
      </section>
    </div>
  );
});
