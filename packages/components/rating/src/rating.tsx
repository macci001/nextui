import {forwardRef} from "@nextui-org/system";
import {useMemo} from "react";
import {VisuallyHidden} from "@react-aria/visually-hidden";

import {UseRatingProps, useRating} from "./use-rating";
import RatingSegment from "./rating-segment";
import {RatingProvider} from "./rating-context";

export interface RatingProps extends UseRatingProps {}

const Rating = forwardRef<"div", RatingProps>((props, ref) => {
  const context = useRating({...props, ref});

  const {
    Component,
    children,
    length,
    hasHelper,
    description,
    setRatingValue,
    getBaseProps,
    getMainWrapperProps,
    getIconWrapperProps,
    getInputProps,
    getHelperWrapperProps,
    getDescriptionProps,
    value,
    ratingValue,
  } = context;

  const IconList = useMemo(() => {
    if (children) {
      return <div {...getIconWrapperProps()}>{children}</div>;
    }

    return (
      <div {...getIconWrapperProps()}>
        {Array.from(Array(length)).map((_, idx) => (
          <RatingSegment key={"segment-" + idx} index={idx} />
        ))}
      </div>
    );
  }, [children, getIconWrapperProps]);

  const Helper = useMemo(() => {
    if (!hasHelper) {
      return null;
    }

    return (
      <div {...getHelperWrapperProps()}>
        <div {...getDescriptionProps()}>{description}</div>
      </div>
    );
  }, [hasHelper, description, getHelperWrapperProps, getDescriptionProps]);

  const Input = useMemo(
    () => (
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
    ),
    [value, ratingValue, setRatingValue, getInputProps],
  );

  return (
    <Component {...getBaseProps()}>
      <RatingProvider value={context}>
        <div {...getMainWrapperProps()}>
          {IconList}
          {Helper}
          {Input}
        </div>
      </RatingProvider>
    </Component>
  );
});

Rating.displayName = "NextUI.Rating";

export default Rating;
