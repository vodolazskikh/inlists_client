import { Close } from "icons/close";
import React, { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { closePopup } from "state/actions/popup";

interface Props {}

export const AddNew: FC<Props> = memo(() => {
  const dispatch = useDispatch();
  const closeCurrentPopup = () => {
    dispatch(closePopup());
  };

  return (
    <div>
      <div className="flex justify-end">
        <span className="cursor-pointer" onClick={closeCurrentPopup}>
          <Close />
        </span>
      </div>
    </div>
  );
});
