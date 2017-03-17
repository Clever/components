import React, {PropTypes} from "react";
import classnames from "classnames";
import * as _ from "lodash";

export function NavLink(props) {
  const {cssClass} = NavLink;

  const selected = props.selected ? cssClass.SELECTED : null;
  let Component = "button";
  if (props.component) {
    Component = props.component;
  } else if (props.href) {
    Component = "a";
  }

  return (
    <Component className={classnames(cssClass.CONTAINER, props.className, selected)} {..._.pick(props, ["href", "to", "onClick"])}>
      <div className={cssClass.INNER_DIV}>
        <div className={cssClass.ICON}>{props.icon}</div>
        <div className={cssClass.LABEL}>{props.label}</div>
      </div>
    </Component>
  );
}

NavLink.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
  href: PropTypes.string,
  selected: PropTypes.bool,
  component: PropTypes.any,
};

NavLink.cssClass = {
  CONTAINER: "NavLink",
  INNER_DIV: "NavLink--contents",
  LABEL: "NavLink--label",
  ICON: "NavLink--icon",
  SELECTED: "NavLink--selected",
};
