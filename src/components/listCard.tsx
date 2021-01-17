import React, { FC, memo } from "react";
import { List } from "../types/data";
import { Close } from "icons/close";
import { useDispatch } from "react-redux";
import { closePopup } from "state/actions/popup";
import { LiItem } from "components/liItem";
import { useHistory } from "react-router-dom";

interface Props {
  list: List;
  usage: "popup" | "flat";
}

export const ListCard: FC<Props> = memo(({ list, usage }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const closeCurrentPopup = () => {
    history.push("/");
    dispatch(closePopup());
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-xl mb-16 text-gray-900">
          <span className="mr-8">{list.emoji}</span>
          {list.title}
        </span>
        {usage === "popup" && (
          <span className="cursor-pointer" onClick={closeCurrentPopup}>
            <Close />
          </span>
        )}
      </div>
      <div className="ml-24 text-base mb-16 text-gray-900">
        {list.description}
      </div>
      <ul className="ml-24 text-base">
        {list.items.map((listItem, pos) => (
          <LiItem
            title={listItem.value}
            isChecked={false}
            key={`${pos}_${listItem}`}
          />
        ))}
      </ul>
    </>
  );
});
