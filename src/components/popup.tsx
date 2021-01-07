import React, { FC, memo, useMemo, useEffect } from "react";
import { List } from "types/data";
import { useDispatch } from "react-redux";
import { closePopup } from "state/actions/popup";
import { ListCard } from "components/listCard";
import { AddNew } from "components/addNew";

interface Props {
  type?: "list" | "addNew";
  item?: List;
}

export const Popup: FC<Props> = memo(({ item, type }) => {
  const dispatch = useDispatch();
  const closeCurrentPopup = () => {
    dispatch(closePopup());
  };
  useEffect(() => {
    document.addEventListener("keydown", closePopupByEsc, false);

    return () => {
      document.removeEventListener("keydown", closePopupByEsc, false);
    };
  }, []);

  const closePopupByEsc = (e: any) => {
    if (!e) {
      return;
    }
    if (e.key === "Escape") {
      closeCurrentPopup();
    }
  };

  const body = useMemo(() => {
    switch (type) {
      case "list":
        if (!item) {
          return null;
        }
        return <ListCard list={item} usage="popup" />;
      case "addNew":
        return <AddNew />;
    }
  }, [type, item?.id]);

  if (!type) {
    return null;
  }

  return (
    <div className="w-screen h-screen bg-black bg-opacity-80 absolute top-0 left-0 z-base flex items-center justify-center">
      <div className="w-2/5 h-2/3 bg-white rounded-md relative p-16">
        {body}
      </div>
    </div>
  );
});
