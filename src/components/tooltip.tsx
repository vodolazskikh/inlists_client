import React, { memo, FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import { killTooltip } from "state/actions/tooltip";
import { TooltipType } from "types/tooltip";

interface Props {
  type?: TooltipType;
}

export const Tooltip: FC<Props> = memo(({ type }) => {
  const dispatch = useDispatch();

  const closeTooltip = () => {
    dispatch(killTooltip());
  };

  const text = useMemo(() => {
    switch (type) {
      case "no_user":
        return "Войдите, чтобы добавить свой список";
    }
  }, [type]);

  return (
    <div
      onClick={closeTooltip}
      className="animate-bounce cursor-pointer z-top absolute top-32 left-32 bg-black text-white py-4 px-16 rounded-md"
    >
      {text}
    </div>
  );
});
