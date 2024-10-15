import {mergeRefs} from "@nextui-org/react-utils";
import {useMemo, useRef} from "react";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useHover} from "@react-aria/interactions";
import {Radio} from "@nextui-org/radio";

import {useRatingContext} from "./rating-context";
import {RatingIcon} from "./rating-icon";

interface RatingSegmentProps {
  index: number;
  icon?: React.ReactNode;
  fillColor?: string;
}

const RatingSegment = ({index, icon, fillColor}: RatingSegmentProps) => {
  const context = useRatingContext();
  const {
    domRef,
    ratingValue,
    isRTL,
    isIconWrapperHovered,
    shouldConsiderHover,
    precision,
    slots,
    classNames,
    isSingleSelection,
    name,
    onChange,
    onBlur,
  } = context;

  const iconRef = useRef<HTMLElement>(null);

  let value = ratingValue.selectedValue;

  if (isIconWrapperHovered && shouldConsiderHover) {
    value = ratingValue.hoveredValue;
  }

  const calculateOffsets = (value: number, index: number, isSingleSelection: boolean) => {
    if (isSingleSelection) {
      const singleOffset = Number(Math.floor(value) - 1 == index);

      return {offset: singleOffset, offsetRTL: 1 - singleOffset};
    }

    if (Math.floor(value) > index) {
      return {offset: 1, offsetRTL: 0};
    }

    if (Math.floor(value) < index) {
      return {offset: 0, offsetRTL: 1};
    }

    const fractionalPart = value - Math.floor(value);

    return {offset: fractionalPart, offsetRTL: 1 - fractionalPart};
  };

  const {offset, offsetRTL} = calculateOffsets(value, index, isSingleSelection);

  const segmentStyles = slots.iconSegment({class: clsx(classNames?.iconSegment)});
  const {isHovered, hoverProps} = useHover({});

  const radioButtons = useMemo(() => {
    const numButtons = Math.floor(1 / precision);
    const gridStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(${numButtons}, 1fr)`,
    };

    return (
      <div className="absolute inset-0 top-0 flex" style={gridStyle}>
        {Array.from(Array(numButtons)).map((_, idx) => {
          return (
            <div key={idx} className="col-span-1 inset-0 overflow-hidden bg-green-200xw opacity-0">
              <Radio
                key={idx}
                ref={domRef}
                classNames={{wrapper: "w-[100%] h-[100%]"}}
                name={name}
                value={
                  idx === numButtons - 1
                    ? (index + 1).toString()
                    : (index + precision + idx * precision).toString()
                }
                onBlur={onBlur}
                onChange={onChange}
              />
            </div>
          );
        })}
      </div>
    );
  }, [precision, name]);

  return (
    <div
      ref={mergeRefs(iconRef)}
      className={segmentStyles}
      data-hovered={dataAttr(isHovered)}
      data-slot="segment"
      {...hoverProps}
    >
      <RatingIcon fillColor={fillColor} icon={icon} offset={isRTL ? offsetRTL : offset} />
      {radioButtons}
    </div>
  );
};

export default RatingSegment;
