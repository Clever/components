import * as React from "react";
import classnames from "classnames";
import * as _ from "lodash";


const CLASSNAMES = {
  CONTAINER: "NavLink",
  INNER_DIV: "NavLink--contents",
  LABEL: "NavLink--label",
  ICON: "NavLink--icon",
  SELECTED: "NavLink--selected",
};

export function NavLink(props) {
  const selected = props.selected ? CLASSNAMES.SELECTED : null;
  let Component = "button";
  if (props.component) {
    Component = props.component;
  } else if (props.href) {
    Component = "a";
  }

  return (
    <Component className={classnames(CLASSNAMES.CONTAINER, props.className, selected)} {..._.pick(props, ["href", "to", "onClick"])}>
      <div className={CLASSNAMES.INNER_DIV}>
        <div className={CLASSNAMES.ICON}>{props.icon}</div>
        <div className={CLASSNAMES.LABEL}>{props.label}</div>
      </div>
    </Component>
  );
}

NavLink.propTypes = {
  className:  React.PropTypes.string,
  icon:  React.PropTypes.node,
  label:  React.PropTypes.string.isRequired,
  onClick:  React.PropTypes.func,
  to:  React.PropTypes.string,
  href:  React.PropTypes.string,
  selected:  React.PropTypes.bool,
  component:  React.PropTypes.any,
};
