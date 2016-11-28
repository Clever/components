import React, {PropTypes} from "react";
import classnames from "classnames";

export function NavLink(props) {
  const {cssClass} = NavLink;

  const selected = props.selected ? cssClass.SELECTED : null;

  return (
    <a
      className={classnames(cssClass.CONTAINER, props.className, selected)}
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
      href="#" // Ensures links are tabbable for accessibility
    >
      <div className={cssClass.ICON}>{props.icon}</div>
      <div className={cssClass.LABEL}>{props.label}</div>
    </a>
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
