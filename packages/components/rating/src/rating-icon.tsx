import {clsx} from "@nextui-org/shared-utils";

import {useRatingContext} from "./rating-context";

interface RatingIconProps {
  offset: number;
  icon?: React.ReactNode;
  fillColor?: string;
}

export const RatingIcon = ({offset, icon, fillColor}: RatingIconProps) => {
  const id = Math.random().toString(36);
  const context = useRatingContext();
  const {slots, isRTL, classNames, opacity, selectedOpacity} = context;

  icon = icon ?? context.icon;
  fillColor = fillColor ?? context.fillColor;
  const strokeColor = context.strokeColor ?? fillColor;
  const iconStyles = slots.icon({class: clsx(classNames?.icon)});

  return (
    <svg className={iconStyles} data-slot="icon">
      <defs>
        <linearGradient id={"grad" + id}>
          <stop
            offset={offset}
            stopColor={fillColor}
            stopOpacity={isRTL ? opacity : selectedOpacity}
          />
          <stop stopColor={fillColor} stopOpacity={isRTL ? selectedOpacity : opacity} />
        </linearGradient>
      </defs>
      <g fill={`url(#${"grad" + id})`} stroke={strokeColor}>
        {icon}
      </g>
    </svg>
  );
};
