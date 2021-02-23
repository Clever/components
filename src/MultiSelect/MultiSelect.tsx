import * as classnames from "classnames";
import * as React from "react";

import { Button } from "../Button/Button";

import "./MultiSelect.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  onPerformAction: (arg?: string) => any;
}

export const cssClass = {
  CONTAINER: "MultiSelect",
  SUB_ELEMENT: "MultiSelect--subElement",
};

/**
 * TODO: Add short description.
 */
const MultiSelect: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={classnames(cssClass.CONTAINER, className)}>
      <h3>TODO</h3>
      <p>{children}</p>
      <div className={cssClass.SUB_ELEMENT}>
        <Button onClick={() => undefined} type={Button.Type.PRIMARY} value="Do something" />
      </div>
    </div>
  );
};

export default MultiSelect;
