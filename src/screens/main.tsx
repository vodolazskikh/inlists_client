/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, memo, useEffect } from "react";
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

export const Main: FC = memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const popup = useSelector((state: AppState) => state.popup);
  const listsInState = useSelector((state: AppState) => state.lists);

  const listsByCity: List[] | undefined = useSelector(
    (state: AppState) => state.city.data?.nsk
  );

  useEffect(() => {
    // Сфетчим все топ-списки для города
    dispatch(fetchListsByCity({ city: "nsk" }));
  }, []);

  const openFullscreenMode = (item: List) => {
    history.push(`/list?id=${item._id}`);
    dispatch(openPopup({ id: generateUuid(), type: "list", item }));
  };

  const adsEl = {
    _id: "promo",
    title: "Промо-блок",
    description: "Я продам этот рекламный-слот и стану очень богатым",
    rating: 5,
    list: [],
    isAds: true,
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
  }, [location, popup.type, listsInState.data]);

  useEffect(() => {
    if (location.pathname === "/add" && popup.type !== "addNew") {
      dispatch(openPopup({ id: generateUuid(), type: "addNew" }));
    }
  }, [location, popup.type]);

  return (
    <div className="min-h-screen gap-4 flex flex-col items-center justify-center text-gray-500 relative">
      <section className="absolute top-32 right-32 flex-col flex items-start">
        <User />
      </section>
      <section className="grid grid-cols-4 p-32 z-base sm:flex sm:flex-col sm:mt-112">
        <div className="col-span-4">
          <City />
        </div>
        {features.search && <SearchInput />}
        {mutableListWithAds.map((item, ind) => (
          <ListPreview
            key={`${item._id}_${ind}`}
            onClick={() => openFullscreenMode(item)}
            position={ind}
            list={item}
          />
        ))}
      </section>
    </div>
  );
});
