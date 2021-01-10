import React, { FC, memo } from "react";
import { lists } from "../mocks/lists";
import { ListPreview } from "../components/listPreview";
import { User } from "../components/user";
import { SearchInput } from "../components/searchInput";
import { useDispatch } from "react-redux";
import { openPopup } from "state/actions/popup";
import { generateUuid } from "utils/generateUuid";
import { List } from "types/data";
import { features } from "config";
import { City } from "../components/city";
import { useHistory } from "react-router-dom";

export const Main: FC = memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();

  const openFullscreenMode = (item: List) => {
    history.push(`/list?id=${item.id}`);
    dispatch(openPopup({ id: generateUuid(), type: "list", item }));
  };

  const adsEl = {
    id: "promo",
    title: "Промо-блок",
    description: "Я продам этот рекламный-слот и стану очень богатым",
    rating: 5,
    list: [],
    isAds: true,
  };

  const listWithAds = features.main_promo
    ? [...lists.slice(0, 2), adsEl, ...lists.slice(2, lists.length)]
    : lists;

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
        {listWithAds.map((item, ind) => (
          <ListPreview
            key={`${item.id}_${ind}`}
            onClick={() => openFullscreenMode(item)}
            position={ind}
            list={item}
          />
        ))}
      </section>
    </div>
  );
});
