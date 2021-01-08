import React, { FC, memo } from "react";
import { lists } from "../mocks/lists";
import { ListPreview } from "../components/listPreview";
import { User } from "../components/user";
import { SearchInput } from "../components/searchInput";
import { useDispatch } from "react-redux";
import { openPopup } from "state/actions/popup";
import { generateUuid } from "utils/generateUuid";
import { List } from "types/data";

export const Main: FC = memo(() => {
  const dispatch = useDispatch();

  const openFullscreenMode = (item: List) => {
    dispatch(openPopup({ id: generateUuid(), type: "list", item }));
  };

  return (
    <div className="min-h-screen gap-4 flex flex-col items-center justify-center text-gray-500 relative">
      <section className="absolute top-32 right-32 flex-col flex items-start">
        <User />
      </section>
      <section className="grid grid-cols-4 p-32 z-base sm:flex sm:flex-col sm:mt-112">
        <SearchInput />
        {lists.map((item, ind) => (
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
