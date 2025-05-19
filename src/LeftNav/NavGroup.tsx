import * as _ from "lodash";
import * as PropTypes from "prop-types";
import * as React from "react";
import * as classnames from "classnames";

import MorePropTypes from "../utils/MorePropTypes";
import { NavLink, Props as NavLinkProps } from "./NavLink";
import { OneOrMany } from "../utils/types";

import "./NavGroup.less";

export interface Props {
  children: OneOrMany<React.ReactElement<NavLink>>;
  className?: string;
  icon: React.ReactElement;
  id: string;
  label: React.ReactNode;
  title?: string;

  // Internal use only: (TODO: Remove?)
  _collapsed?: boolean;
  _onClick?: React.MouseEventHandler;
  _open?: boolean;
  _withActiveNavGroups?: boolean;
  _withTooltips?: boolean;
}

const propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(NavLink)).isRequired,
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  title: PropTypes.string,

  // Internal use only:
  _collapsed: PropTypes.bool,
  _onClick: PropTypes.func,
  _open: PropTypes.bool,
  _withActiveNavGroups: PropTypes.bool,
  _withTooltips: PropTypes.bool,
};

export const cssClass = {
  CONTAINER: "NavGroup",
  OPEN: "NavGroup--open",
};

// NavGroup doesn't render its children because LeftNav will render them in
// a drawer if the NavGroup is open.
export class NavGroup extends React.PureComponent<Props> {
  static propTypes = propTypes;

  render() {
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
      title,
    } = this.props;

    const childSelected = !!_.find(
      React.Children.toArray(children) as React.ReactElement<NavLinkProps>[],
      (item) => item.props.selected,
    );

    return (
      <NavLink
        className={classnames(cssClass.CONTAINER, _open && cssClass.OPEN, className)}
        icon={icon}
        label={label}
        title={(title || label) as string}
        onClick={_onClick}
        selected={_withActiveNavGroups && childSelected}
        _collapsed={_collapsed}
        _withArrow
        _withTooltips={_withTooltips}
        role="group"
        aria-expanded={_open}
      />
    );
  }
}
