import React, { FC, memo, useRef } from "react";
import { Checkbox } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";

interface Props {
  title: string | undefined;
  isChecked: boolean;
  onTextChange?: (v: string, pos?: number) => void;
  pos?: number;
}

export const LiItem: FC<Props> = memo(({ title, onTextChange, pos }) => {
  const ref = useRef(null);

  return (
    <li className="mb-12">
      <Checkbox
        ref={ref}
        shape="curve"
        variant="thick"
        animation="jelly"
        color="info"
      >
        {title}
      </Checkbox>
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
});
