/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, memo, useMemo, useEffect } from "react";
import { List } from "types/data";
import { useDispatch } from "react-redux";
import { closePopup } from "state/actions/popup";
import { ListCard } from "components/listCard";
import { AddNew } from "components/addNew";
import { useHistory } from "react-router-dom";

interface Props {
  type?: "list" | "addNew";
  item?: List;
}

export const Popup: FC<Props> = memo(({ item, type }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  history.listen((location) => {
    if (location.pathname === "/") {
      closeCurrentPopup();
    }
  });

  const closeCurrentPopup = () => {
    dispatch(closePopup());
  };
  useEffect(() => {
    document.addEventListener("keydown", closePopupByEsc, false);

    return () => {
      document.removeEventListener("keydown", closePopupByEsc, false);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const closePopupByEsc = (e: any) => {
    if (!e) {
      return;
    }

    if (e.key === "Escape") {
      closeCurrentPopup();
      history.goBack();
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
    <div className="w-screen h-full bg-black bg-opacity-80 absolute top-0 left-0 z-base flex items-center justify-center sm:items-start sm:p-0">
      <div className="w-3/5 h-2/3 bg-white rounded-md relative p-16 sm:w-full sm:h-screen sm:rounded-none">
        {body}
      </div>
    </div>
  );
});
