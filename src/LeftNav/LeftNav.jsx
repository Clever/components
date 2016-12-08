import * as React from "react";
const {PropTypes} = React;
import MorePropTypes from "../utils/MorePropTypes";
import classnames from "classnames";
import * as _ from "lodash";

import {NavLink} from "./NavLink";
import {NavGroup} from "./NavGroup";

import "./LeftNav.less";

export class LeftNav extends React.Component {
  constructor(props) {
    super(props);

    // If a NavLink in a NavGroup is marked as selected on initialization, we
    // should open the drawer to show it. Otherwise, don't start with the drawer open.
    const selectedNavGroup = _.find(React.Children.toArray(props.children), child =>
      child.type === NavGroup &&
        React.Children.toArray(child.props.children).some(navLink => navLink.props.selected)
    );
    this.state = {openNavGroup: selectedNavGroup ? selectedNavGroup.props.id : null};
  }

  render() {
    const {cssClass} = LeftNav;

    // Clone all of the children so that we can attach our own click handlers
    const children = React.Children.map(this.props.children, child => {
      // Configure top level NavLinks to close any open NavGroup on click
      if (child.type === NavLink && child.props.visible) {
        return React.cloneElement(child, {
          onClick: () => {
            this.setState({openNavGroup: null});
            child.props.onClick();
          },
        });
      }

      // Configure NavGroups to open/close themselves on click
      if (child.type === NavGroup && child.props.visible) {
        const anyVisible = _.some(child.props.children, (c) => c && c.props && c.props.visible);
        if (!anyVisible) {
          return null;
        }
        const open = child.props.id === this.state.openNavGroup;
        return React.cloneElement(child, {
          _open: open,
          _onClick: () => this.setState({openNavGroup: open ? null : child.props.id}),
        });
      }

      return null;
    });

    // Find the open NavGroup so that we can render its children NavLinks in the drawer
    const openChild = _.find(React.Children.toArray(children), child => child.props._open);

    const collapsed = this.props.collapsed ? cssClass.COLLAPSED : null;

    return (
      <nav className={cssClass.CONTAINER}>
        <div className={classnames(cssClass.TOPNAV, collapsed)}>{children}</div>
        {openChild && <div className={cssClass.SUBNAV}>{openChild.props.children}</div>}
      </nav>
    );
  }
}

LeftNav.NavLink = NavLink;
LeftNav.NavGroup = NavGroup;

LeftNav.propTypes = {
  children: MorePropTypes.oneOrManyOf(PropTypes.oneOfType([
    MorePropTypes.instanceOfComponent(NavLink),
    MorePropTypes.instanceOfComponent(NavGroup),
  ])),
  collapsed: PropTypes.bool,
};

LeftNav.cssClass = {
  CONTAINER: "LeftNav",
  COLLAPSED: "LeftNav--collapsed",
  TOPNAV: "LeftNav--topnav",
  SUBNAV: "LeftNav--subnav",
};
