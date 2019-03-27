import * as _ from "lodash";
import * as PropTypes from "prop-types";
import * as React from "react";
import classnames from "classnames";

import MorePropTypes from "../utils/MorePropTypes";
import { NavLink } from "./NavLink";

import "./NavGroup.less";

// NavGroup doesn't render its children because LeftNav will render them in
// a drawer if the NavGroup is open.
export class NavGroup extends React.PureComponent {
  render() {
    const { cssClass } = NavGroup;
    const {
      _collapsed,
      _onClick,
      _open,
      _withActiveNavGroups,
      _withTooltips,
      children,
      className,
      icon,
      label,
    } = this.props;

    const childSelected = !!_.find(React.Children.toArray(children), item => item.props.selected);

    return (
      <NavLink
        className={classnames(cssClass.CONTAINER, _open && cssClass.OPEN, className)}
        icon={icon}
        label={label}
        onClick={_onClick}
        selected={_withActiveNavGroups && childSelected}
        _collapsed={_collapsed}
        _withArrow
        _withTooltips={_withTooltips}
      />
    );
  }
}

NavGroup.propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(NavLink)).isRequired,
  className: PropTypes.string,
  icon: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,

  // Internal use only:
  _collapsed: PropTypes.bool,
  _onClick: PropTypes.func,
  _open: PropTypes.bool,
  _withActiveNavGroups: PropTypes.bool,
  _withTooltips: PropTypes.bool,
};

NavGroup.cssClass = {
  CONTAINER: "NavGroup",
  OPEN: "NavGroup--open",
};
