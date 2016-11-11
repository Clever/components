import React, {PropTypes} from "react";
import classnames from "classnames";

import {FlexBox, FlexItem, ItemAlign} from "../";

export function NavLink(props) {
  const {cssClass} = NavLink;

  const selected = props.selected ? cssClass.SELECTED : null;

  return (
    <FlexBox
      component="li"
      className={classnames(cssClass.CONTAINER, props.className, selected)}
      onClick={props.onClick}
      alignItems={ItemAlign.CENTER}
    >
      <FlexItem className={cssClass.ICON}>{props.icon}</FlexItem>
      <FlexItem className={cssClass.LABEL} data-text={props.label}>{props.label}</FlexItem>
    </FlexBox>
  );
}

NavLink.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

NavLink.cssClass = {
  CONTAINER: "NavLink",
  LABEL: "NavLink--label",
  ICON: "NavLink--icon",
  SELECTED: "NavLink--selected",
};
