import { ListCard } from "components/listCard";
import { ListPreview } from "components/listPreview";
import { User } from "components/user";
import { lists } from "mocks/lists";
import React, { FC, memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Filters } from "components/filters";
import { FilterName } from "types/data";

export const Profile: FC = memo(() => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const handleItemClick = useCallback((num: number) => {
    setSelectedItemIndex(num);
  }, []);

  const onFilterApply = (filterName: FilterName) => {
    console.log("Выбрал фильтр", filterName);
  };

  return (
    <div className="min-h-screen gap-4 flex flex-col items-center justify-center text-gray-500 relative">
      <section className="absolute top-32 right-32 flex-col flex items-start">
        <User isInUserProfile />
      </section>
      <section className="flex w-full items-center justify-evenly">
        <div>
          <div className="ml-8 text-lg mb-32 cursor-pointer absolute top-48">
            <Link to="/">Вернуться назад</Link>
          </div>
          <div className="ml-8 mb-16">
            <Filters
              handleFilterApply={onFilterApply}
              types={[
                { type: "my", name: "Я автор" },
                { type: "friends", name: "Списки друзей" },
                { type: "favorites", name: "Моё избранное" },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 max-h-600 overflow-scroll">
            {lists.map((list, position) => (
              <ListPreview
                key={`${list.id}_${position}`}
                onClick={() => handleItemClick(position)}
                isSelected={selectedItemIndex === position}
                list={list}
              />
            ))}
          </div>
        </div>
        <div className="min-w-600">
          <ListCard list={lists[selectedItemIndex]} usage="flat" />
        </div>
      </section>
    </div>
  );
});
