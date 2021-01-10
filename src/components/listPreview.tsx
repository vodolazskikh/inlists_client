import React, { memo, FC } from "react";
import { List } from "../types/data";
import classNames from "classnames";

interface Props {
  list: List;
  onClick: () => void;
  isSelected?: boolean;
  position?: number;
}

export const ListPreview: FC<Props> = memo(
  ({ list, position, isSelected, onClick }) => {
    return (
      <div
        onClick={onClick}
        className={classNames(
          "select-none bg-white border-black bg-blue-100 m-8 px-32 py-8 rounded-md cursor-pointer text-lg flex items-center justify-between z-base transform hover:scale-105 transition-transform",
          {
            "col-span-2 bg-red-200":
              (position === 0 || position === 3 || position === 9) &&
              !list.isAds,
          },
          {
            "col-span-3":
              (position === 2 || position === 6 || position === 10) &&
              !list.isAds,
          },
          {
            "bg-blue-400 text-white": isSelected,
          },
          { "col-span-1 row-span-2 bg-blue-400 text-white": list.isAds }
        )}
      >
        <span>{list.title}</span>
        <span>{list.emoji}</span>
      </div>
    );
  }
);
