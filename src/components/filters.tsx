import React, { FC, memo, useState } from "react";
import { FilterName, FilterType } from "../types/data";
import classNames from "classnames";

interface Props {
  types: FilterType[];
  handleFilterApply: (filterName: FilterName) => void;
}

export const Filters: FC<Props> = memo(({ types, handleFilterApply }) => {
  const [selectedItem, setSelectedItem] = useState<FilterName>("my");
  const onFilterClick = (type: FilterName) => () => {
    handleFilterApply(type);
    setSelectedItem(type);
  };

  return (
    <div className="flex">
      {types.map((item) => (
        <div
          key={item.name}
          onClick={onFilterClick(item.type)}
          className={classNames(
            "select-none mr-16 border-2 py-4 px-16 cursor-pointer rounded-full",
            {
              "bg-gray-200": selectedItem === item.type,
            }
          )}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
});
