import {forwardRef} from "@nextui-org/system";
import {Button, ButtonProps} from "@nextui-org/button";
import {CloseIcon} from "@nextui-org/shared-icons";

import {Progress} from "../../../core/react/src";

import {UseToastProps, useToast} from "./use-toast";

export interface ToastProps extends UseToastProps {}

const Toast = forwardRef<"div", ToastProps>((props, ref) => {
  const {
    Component,
    Icon,
    domRef,
    styles,
    closeProgressBarValue,
    getToastProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
    getProgressBarProps,
    getCloseButtonProps,
  } = useToast({
    ...props,
    ref,
  });

  return (
    <Component ref={domRef} className={styles} {...getToastProps()}>
      <main {...getContentProps()}>
        <Icon />
        <div className="h-10 w-[2px] bg-default/40" />
        <div>
          <div {...getTitleProps()}>{props.toast.content.title}</div>
          <div {...getDescriptionProps()}>{props.toast.content.description}</div>
        </div>
      </main>
      <Button {...(getCloseButtonProps() as ButtonProps)} size="xs" variant="light">
        <CloseIcon />
      </Button>
      <Progress
        {...getProgressBarProps()}
        aria-label="toast-close-indicator"
        value={closeProgressBarValue}
      />
    </Component>
  );
});

Toast.displayName = "NextUI.Toast";

export default Toast;
