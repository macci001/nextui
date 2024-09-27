import React from "react";
import {Meta} from "@storybook/react";
import {toast} from "@nextui-org/theme";

import {Toast, ToastProps, ToastProvider, addToast} from "../src";

export default {
  title: "Components/Toast",
  component: Toast,
  argTypes: {
    color: {
      control: {type: "select"},
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {type: "select"},
      options: ["sm", "md", "lg"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof Toast>;

const defaultProps = {
  ...toast.defaultVariants,
  options: {
    timeout: 2000,
  },
};
const Template = (args: ToastProps) => (
  <>
    <ToastProvider {...args} />{" "}
    <button
      onClick={() => {
        addToast({
          title: "name",
          description: "hello",
          config: {
            variant: "info",
          },
        });
      }}
    >
      info
    </button>
    <button
      onClick={() => {
        addToast({
          title: "hello",
          description: "description",
          config: {
            variant: "warning",
          },
        });
      }}
    >
      warning
    </button>
    <button
      onClick={() => {
        addToast({
          title: "hello",
          description: "description",
          config: {
            variant: "success",
          },
        });
      }}
    >
      success
    </button>
    <button
      onClick={() => {
        addToast({
          title: "hello",
          description: "description",
          config: {
            variant: "error",
            timeout: 3000,
          },
        });
      }}
    >
      error
    </button>
  </>
);

export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  },
};
