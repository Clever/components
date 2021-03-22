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
  isCloseable?: boolean;
}

export const cssClass = {
  CONTAINER: "AlertBox2",
  CONTENT_CONTAINER: "AlertBox2--contentContainer",
  CONTENT: "AlertBox2--content",
  CLOSE_BUTTON: "AlertBox2--closeButton",
};

/**
 * TODO: Add short description.
 */
export const AlertBox2: React.FC<Props> = ({ children, className, type, isCloseable }) => {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    setIsClosed(false);
  }, [children, type, isCloseable]);

  if (isClosed) {
    return null;
  }

  return (
    <div className={classnames(cssClass.CONTAINER, `AlertBox2--${type}`, className)}>
      <div className={cssClass.CONTENT_CONTAINER}>
        <FontAwesome fixedWidth name={ICON_MAP[type]} className={`AlertBox2--icon--${type}`} />
        <div className={cssClass.CONTENT}>{children}</div>
      </div>
      {isCloseable && (
        <div>
          <button
            aria-label="Close"
            className={cssClass.CLOSE_BUTTON}
            onClick={() => setIsClosed(true)}
          >
            {/* https://www.compart.com/en/unicode/U+2715 */}
            &#10005;
          </button>
        </div>
      )}
    </div>
  );
};
