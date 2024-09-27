import type {VariantProps} from "tailwind-variants";

import {tv} from "../utils/tv";
import {dataFocusVisibleClasses} from "../utils";

const toast = tv({
  slots: {
    wrapper: [
      "flex",
      "w-screen",
      "h-[100dvh]",
      "fixed",
      "inset-0",
      "z-50",
      "overflow-x-auto",
      "justify-center",
    ],
    base: [
      "flex",
      "flex-col",
      "relative",
      "bg-white",
      "z-50",
      "w-full",
      "box-border",
      "bg-content1",
      "outline-none",
      "p-2 mx-1",
      "my-1",
      "sm:mx-4",
      "sm:my-4",
      "w-[50vw] md:w-[30vw]",
      "rounded-md",
      "text-white",
      "shadow-inner",
      "overflow-hidden",
    ],
    content: ["flex items-center gap-x-2"],
    title: ["text-base", "font-medium"],
    description: ["text-sm"],
    progressBar: [
      "absolute",
      "h-[2px]",
      "right-0",
      "bottom-0",
      "w-full",
      "overflow-hidden",
      "bg-black-500",
      "rounded-none",
    ],
    closeButton: [
      "absolute",
      "appearance-none",
      "outline-none",
      "select-none",
      "top-1",
      "right-1",
      "rtl:left-1",
      "rtl:right-[unset]",
      "p-2",
      "text-white",
      "hover:text-foreground-900",
      "tap-highlight-transparent",
      // focus ring
      ...dataFocusVisibleClasses,
    ],
  },
  variants: {
    size: {
      xs: "",
    },
    variant: {
      success: "bg-success",
      error: "bg-danger",
      warning: "bg-warning",
      info: "bg-primary",
    },
    color: {
      default: "",
      primary: "",
      secondary: "",
      success: "",
      warning: "",
      danger: "",
    },
  },
  defaultVariants: {
    size: "xs",
    variant: "info",
  },
  compoundVariants: [
    {
      variant: "info",
      color: "primary",
    },
    {
      variant: "warning",
      color: "warning",
    },
    {
      variant: "error",
      color: "danger",
    },
    {
      variant: "success",
      color: "success",
    },
  ],
});

export type ToastVariantProps = VariantProps<typeof toast>;
export type ToastSlots = keyof ReturnType<typeof toast>;

export {toast};
