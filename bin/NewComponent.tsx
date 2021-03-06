import * as classnames from "classnames";
import * as React from "react";

import { Button } from "../Button/Button";

import "./NewComponent.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  onPerformAction: (arg?: string) => any;
}

export const cssClass = {
  CONTAINER: "NewComponent",
  SUB_ELEMENT: "NewComponent--subElement",
};

/**
 * TODO: Add short description.
 */
export const NewComponent: React.FC<Props> = ({ children, className, onPerformAction }) => {
  return (
    <div className={classnames(cssClass.CONTAINER, className)}>
      <h3>TODO</h3>
      <p>{children}</p>
      <div className={cssClass.SUB_ELEMENT}>
        <Button
          onClick={() => onPerformAction("action performed")}
          type={Button.Type.PRIMARY}
          value="Do something"
        />
      </div>
    </div>
  );
};
