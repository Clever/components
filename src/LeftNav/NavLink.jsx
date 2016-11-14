import React, {PropTypes} from "react";
import classnames from "classnames";

export function NavLink(props) {
  const {cssClass} = NavLink;

  const selected = props.selected ? cssClass.SELECTED : null;

  return (
    <li
      className={classnames(cssClass.CONTAINER, props.className, selected)}
      onClick={props.onClick}
    >
      <div className={cssClass.ICON}>{props.icon}</div>
      <div className={cssClass.LABEL}>{props.label}</div>
    </li>
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
