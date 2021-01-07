import React, { FC, memo } from "react";

export const SearchInput: FC = memo(() => {
  return (
    <input
      placeholder="Введи свой запрос"
      className="col-span-2 focus:outline-none border-black m-8 px-16 py-8 text-xl rounded-md"
      type="text"
      autoFocus
    />
  );
});
