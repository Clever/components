import React from "react";
import classnames from "classnames";

import "./NavGroup.less";

export function NavGroup(props) {
  const {cssClass} = NavGroup;
  return (
    <div className={cssClass.CONTAINER}>
      <div className={cssClass.LABEL}>
        <span className={classnames(cssClass.ICON, props.icon)} />
        {props.label}
      </div>
      {props.children}
    </div>
  );
}

NavGroup.cssClass = {
  CONTAINER: "NavGroup",
  LABEL: "NavGroup--label",
  ICON: "NavGroup--icon",
};
