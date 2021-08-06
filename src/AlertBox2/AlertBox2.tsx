import * as classnames from "classnames";
import * as React from "react";
import { useEffect, useState } from "react";

import * as FontAwesome from "react-fontawesome";

import "./AlertBox2.less";

export enum AlertBox2Type {
  CRITICAL = "critical",
  CAUTION = "caution",
  SUCCESS = "success",
  INFO = "info",
}

const ICON_MAP = {
  critical: "exclamation-circle",
  caution: "exclamation-triangle",
  success: "thumbs-up",
  info: "exclamation-circle",
};

export interface Props {
  children: React.ReactNode;
  className?: string;
  type: AlertBox2Type;
  // provide optional buttons separately because it affects the css spacing
  buttons?: React.ReactNode;
  isCloseable?: boolean;
  onClose?: () => void;
  iconOverride?: React.ReactNode;
}

export const cssClass = {
  CONTAINER: "AlertBox2",
  CONTENT_CONTAINER: "AlertBox2--contentContainer",
  CONTENT_CONTAINER_WITH_BUTTONS: "AlertBox2--contentContainer--withButtons",
  ICON: "AlertBox2--icon",
  CONTENT: "AlertBox2--content",
  CLOSE_BUTTON: "AlertBox2--closeButton",
};

/**
 * TODO: Add short description.
 */
export const AlertBox2: React.FC<Props> = ({
  children,
  className,
  type,
  buttons,
  isCloseable,
  iconOverride,
  onClose,
}) => {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    setIsClosed(false);
  }, [children, type, isCloseable]);

  if (isClosed) {
    return null;
  }

  return (
    <div className={classnames(cssClass.CONTAINER, `AlertBox2--${type}`, className)}>
      <div
        className={classnames(
          cssClass.CONTENT_CONTAINER,
          !!buttons && cssClass.CONTENT_CONTAINER_WITH_BUTTONS,
        )}
      >
        <div>
          {iconOverride || (
            <FontAwesome
              className={classnames(cssClass.ICON, `AlertBox2--icon--${type}`)}
              fixedWidth
              name={ICON_MAP[type]}
            />
          )}
        </div>
        <div className={cssClass.CONTENT}>{children}</div>
      </div>
      <div className="AlertBox2--buttons">
        {buttons}
        {isCloseable && (
          <button
            aria-label="Close"
            className={cssClass.CLOSE_BUTTON}
            onClick={() => {
              if (onClose) {
                onClose();
              }

              setIsClosed(true);
            }}
          >
            {/* https://www.compart.com/en/unicode/U+2715 */}
            &#10005;
          </button>
        )}
      </div>
    </div>
  );
};
