import * as React from "react";
import { useRootClose } from "@restart/ui";

interface Props {
  /**
   * Callback fired after click or mousedown. Also triggers when user hits `esc`.
   */
  onRootClose?(e: Event): void;

  /**
   * Children to render.
   */
  children?: (ref: React.Ref<any>) => React.ReactNode;

  /**
   * Disable the the RootCloseWrapper, preventing it from triggering
   * `onRootClose`.
   */
  disabled?: boolean;
}

export const RootCloseWrapper: React.FC<Props> = ({
  onRootClose,
  children,
  disabled = false,
}: Props) => {
  const triggerRef = React.useRef<HTMLElement>(null);

  useRootClose(triggerRef, onRootClose, {
    disabled,
  });

  if (typeof children === "function") {
    return <>{children(triggerRef)}</>;
  }
  return <>{React.cloneElement(children, triggerRef)}</>;
};
