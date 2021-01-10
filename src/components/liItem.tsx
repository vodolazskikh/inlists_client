import React, { FC, memo, useRef, useState } from "react";
import { Checkbox } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";

interface Props {
  title: string | undefined;
  isChecked: boolean;
  onTextChange?: (v: string, pos?: number) => void;
  pos?: number;
}

export const LiItem: FC<Props> = memo(
  ({ title, onTextChange, pos, isChecked }) => {
    const ref = useRef(null);
    const [checkboxChecked, setCheckboxChecked] = useState(isChecked);

    const checkboxClickHandler = () => {
      setCheckboxChecked((v) => !v);
    };

    return (
      <li
        className="mb-12 flex items-baseline cursor-pointer"
        onClick={checkboxClickHandler}
      >
        <Checkbox
          ref={ref}
          shape="curve"
          variant="thick"
          animation="jelly"
          color="info"
          checked={checkboxChecked}
        ></Checkbox>
        <div className="whitespace-normal">{title}</div>
        {!title && onTextChange && (
          <input
            placeholder="Напишите что-нибудь"
            className="outline-none"
            autoFocus
            onChange={(e) => onTextChange(e.currentTarget.value, pos)}
          />
        )}
      </li>
    );
  }
);
