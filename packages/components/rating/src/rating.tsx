import {forwardRef} from "@nextui-org/system";
import {useMemo} from "react";
import {Radio, RadioGroup} from "@nextui-org/radio";

import {UseRatingProps, useRating} from "./use-rating";
import RatingSegment from "./rating-segment";
import {RatingProvider} from "./rating-context";

export interface RatingProps extends UseRatingProps {}

const Rating = forwardRef<"div", RatingProps>((props, ref) => {
  const context = useRating({...props, ref});

  const {
    Component,
    children,
    domRef,
    length,
    hasHelper,
    isInvalid,
    description,
    errorMessage,
    setRatingValue,
    getBaseProps,
    getMainWrapperProps,
    getIconWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    ratingValue,
    name,
    onBlur,
    onChange,
  } = context;

  const IconList = useMemo(() => {
    if (children) {
      return <div {...getIconWrapperProps()}>{children}</div>;
    }

    return (
      <div {...getIconWrapperProps()}>
        <RadioGroup
          name={name}
          orientation="horizontal"
          value={ratingValue.selectedValue.toString()}
          onBlur={onBlur}
          onChange={onChange}
          onValueChange={(e) => {
            setRatingValue({selectedValue: Number(e), hoveredValue: Number(e)});
          }}
        >
          <Radio
            ref={domRef}
            className={`absolute top-0 inset-0 opacity-0 cursor-pointer`}
            name={name}
            value={"0"}
            onBlur={onBlur}
            onChange={onChange}
          />
          {Array.from(Array(length)).map((_, idx) => (
            <RatingSegment key={"segment-" + idx} index={idx} />
          ))}
        </RadioGroup>
      </div>
    );
  }, [children, length, getIconWrapperProps, name, onBlur, onChange]);

  const Helper = useMemo(() => {
    if (!hasHelper) {
      return null;
    }
    if (isInvalid && !!errorMessage) {
      return (
        <div {...getHelperWrapperProps()}>
          <div {...getErrorMessageProps()}>{errorMessage}</div>
        </div>
      );
    }

    return (
      <div {...getHelperWrapperProps()}>
        <div {...getDescriptionProps()}>{description}</div>
      </div>
    );
  }, [
    hasHelper,
    isInvalid,
    description,
    errorMessage,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
  ]);

  return (
    <Component {...getBaseProps()}>
      <RatingProvider value={context}>
        <div {...getMainWrapperProps()}>
          {IconList}
          {Helper}
        </div>
      </RatingProvider>
    </Component>
  );
});

Rating.displayName = "NextUI.Rating";

export default Rating;
