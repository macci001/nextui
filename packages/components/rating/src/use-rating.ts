import type {RatingSlots, RatingVariantProps, SlotsToClasses} from "@nextui-org/theme";

import {
  HTMLNextUIProps,
  mapPropsVariants,
  PropGetter,
  useProviderContext,
} from "@nextui-org/system";
import {rating} from "@nextui-org/theme";
import {ReactRef, useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr, objectToDeps} from "@nextui-org/shared-utils";
import {ReactNode, useCallback, useMemo, useRef} from "react";
import {useHover} from "@react-aria/interactions";
import {mergeProps} from "@react-aria/utils";
import {useLocale} from "@react-aria/i18n";
import {StarIcon} from "@nextui-org/shared-icons";
import {AriaTextFieldProps} from "@react-types/textfield";
import {useControlledState} from "@react-stately/utils";

export type RatingValueType = {
  hoveredValue: number;
  selectedValue: number;
};

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLInputElement | null>;
  /*
   * The Rating Segments that make up the Rating Component.
   */
  children?: ReactNode;
  /**
   * Ref to the DOM node.
   */
  baseRef?: ReactRef<HTMLDivElement | null>;
  /**
   * Icon to be used for rating. By default, star icon will be used.
   */
  icon?: React.ReactNode;
  /**
   * Color to be filled in the icon. By default, fillColor will be gold.
   */
  fillColor?: string;
  /**
   * Color for the stroke of the icon. By default, strokeColor will be equal to fillColor.
   */
  strokeColor?: string;
  /**
   * Opacity when the icon is not hovered/selected. By default, opacity will be 0.2
   */
  opacity?: number;
  /**
   * Opacity when the icon is hovered/selected. By default, selectedOpacity will be 1
   */
  selectedOpacity?: number;
  /**
   * Precision fraction round-off for Rating value.
   */
  precision?: number;
  /**
   * Maximum value for the Rating.
   */
  length: number;
  /**
   * If true, then only the Icon corresponding to Rating value will be highlighted.
   */
  isSingleSelection?: boolean;
  /**
   * Boolean to disable the Rating Component.
   */
  isDisabled?: boolean;
  /**
   * Boolean to disable animation.
   */
  disableAnimation?: boolean;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Rating classNames={{
   *    base:"base-classes",
   *    mainWrapper:"main-wrapper-classes",
   *    iconWrapper: "icon-wrapper-classes",
   *    iconSegement: "icon-segment-classes",
   *    icon: "icon-classes",
   *    helperWrapper: "helper-wrapper-classes",
   *    description: "description-classes"
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<RatingSlots>;
  /**
   * React aria onChange event.
   */
  onValueChange?: (value: number) => void;
}

export type UseRatingProps = Props & RatingVariantProps & Omit<AriaTextFieldProps, "onChange">;

export function useRating(originalProps: UseRatingProps) {
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(originalProps, rating.variantKeys);

  const {
    ref,
    baseRef,
    as,
    className,
    length,
    classNames,
    strokeColor,
    precision = 1,
    fillColor = "gold",
    opacity = 0.2,
    selectedOpacity = 1,
    children = null,
    isSingleSelection = false,
    icon = StarIcon({}),
    onValueChange = () => {},
    ...otherProps
  } = props;

  const {disableAnimation = globalContext?.disableAnimation ?? false, isDisabled = false} =
    originalProps;

  const {direction} = useLocale();
  const isRTL = direction === "rtl";

  const Component = as || "div";

  const domRef = useDOMRef<HTMLInputElement>(ref);
  const baseDomRef = useDOMRef<HTMLDivElement>(baseRef);
  const iconWrapperRef = useRef<HTMLDivElement>(null);

  const slots = useMemo(
    () =>
      rating({
        ...variantProps,
        disableAnimation,
        isDisabled,
      }),
    [objectToDeps(variantProps)],
  );

  const handleValueChange = useCallback(
    (value: RatingValueType | undefined) => {
      if (value && value.selectedValue != undefined && value.selectedValue != -1) {
        onValueChange(value.selectedValue);
      }
    },
    [onValueChange],
  );

  const [ratingValue, setRatingValue] = useControlledState<RatingValueType>(
    props.value
      ? {hoveredValue: Number(props.value), selectedValue: Number(props.value)}
      : undefined,
    props.defaultValue
      ? {hoveredValue: Number(props.defaultValue), selectedValue: Number(props.defaultValue)}
      : {hoveredValue: -1, selectedValue: -1},
    handleValueChange,
  );

  const description = props.description;
  const hasHelper = !!description;

  const {hoverProps, isHovered: isIconWrapperHovered} = useHover({isDisabled});
  const shouldConsiderHover = Math.floor(1 / precision) == 1 / precision;

  const onMouseMoveIconWrapper = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!iconWrapperRef || !iconWrapperRef.current) return;
    if (!shouldConsiderHover) return;

    let precisionValue = precision;

    if (isSingleSelection) precisionValue = 1;

    const clientX = e.clientX;
    const {x, width} = iconWrapperRef.current.getBoundingClientRect();
    const sweepedWidth = isRTL ? x + width - clientX : clientX - x;
    const updatedHoverValue = (sweepedWidth / width) * length;
    let precisedHoverValue = Math.floor(updatedHoverValue / precisionValue) * precisionValue;

    if (precisedHoverValue < updatedHoverValue)
      precisedHoverValue = precisedHoverValue + precisionValue;
    setRatingValue({hoveredValue: precisedHoverValue, selectedValue: ratingValue.selectedValue});
  };

  const baseStyles = clsx(classNames?.base, className);
  const getBaseProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: baseDomRef,
        className: slots.base({class: baseStyles}),
        ...mergeProps(props),
        "data-slot": "base",
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(originalProps?.isInvalid),
        "data-required": dataAttr(originalProps?.isRequired),
        "data-readonly": dataAttr(originalProps?.isReadOnly),
      };
    },
    [baseDomRef, slots, baseStyles, isDisabled, originalProps],
  );

  const getMainWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.mainWrapper({class: clsx(classNames?.mainWrapper)}),
        ...props,
        "data-slot": "main-wrapper",
      };
    },
    [slots],
  );

  const getIconWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: iconWrapperRef,
        onMouseMove: onMouseMoveIconWrapper,
        className: slots.iconWrapper({class: clsx(classNames?.iconWrapper)}),
        ...mergeProps(props, hoverProps),
        "data-slot": "icon-wrapper",
      };
    },
    [iconWrapperRef, slots, hoverProps, ratingValue, setRatingValue, onMouseMoveIconWrapper],
  );

  const getInputProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        ref: domRef,
        value: ratingValue.selectedValue == -1 ? null : ratingValue.selectedValue,
        className: slots.input({class: clsx(classNames?.input)}),
        type: "number",
        ...mergeProps(props, otherProps),
        "data-slot": "input",
      };
    },
    [domRef, ratingValue, slots, originalProps, slots, originalProps.value],
  );

  const getHelperWrapperProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.helperWrapper({class: clsx(classNames?.helperWrapper)}),
        ...props,
        "data-slot": "helper-wrapper",
      };
    },
    [slots],
  );

  const getDescriptionProps: PropGetter = useCallback(
    (props = {}) => {
      return {
        className: slots.description({class: clsx(classNames?.description)}),
        "data-slot": "description",
        ...props,
      };
    },
    [slots],
  );

  return {
    Component,
    children,
    isSingleSelection,
    precision,
    length,
    isRTL,
    isIconWrapperHovered,
    ratingValue,
    classNames,
    slots,
    fillColor,
    strokeColor,
    icon,
    hasHelper,
    description,
    shouldConsiderHover,
    opacity,
    selectedOpacity,
    setRatingValue,
    getBaseProps,
    getMainWrapperProps,
    getIconWrapperProps,
    getInputProps,
    getHelperWrapperProps,
    getDescriptionProps,
    ...otherProps,
  };
}

export type UseRatingReturn = ReturnType<typeof useRating>;
