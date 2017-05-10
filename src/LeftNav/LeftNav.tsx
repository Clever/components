import * as React from "react";
import * as ReactCSSTransitionGroup from "react-addons-css-transition-group";
import MorePropTypes from "../utils/MorePropTypes";
import classnames from "classnames";
import _ from "lodash";

import {NavLink} from "./NavLink";
import {NavGroup} from "./NavGroup";

import "./LeftNav.less";


const CLASSNAMES = {
  CONTAINER: "LeftNav",
  COLLAPSED: "LeftNav--collapsed",
  TOPNAV: "LeftNav--topnav",
  SUBNAV: "LeftNav--subnav",
};

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
    // Clone all of the children so that we can attach our own click handlers
    const children = React.Children.map(this.props.children, child => {
      // Configure top level NavLinks to close any open NavGroup on click
      if (child.type === NavLink) {
        return React.cloneElement(child, {
          onClick: () => {
            this.setState({openNavGroup: null});
            if (child.props.onClick) {
              child.props.onClick();
            }
          },
        });
      }

      // Configure NavGroups to open/close themselves on click
      if (child.type === NavGroup) {
        const open = child.props.id === this.state.openNavGroup;
        return React.cloneElement(child, {
          _open: open,
          _onClick: () => this.setState({openNavGroup: open ? null : child.props.id}),
        });
      }

      return null; // Should never get here thanks to PropType validation
    });

    // Find the open NavGroup so that we can render its children NavLinks in the drawer
    const openChild = _.find(React.Children.toArray(children), child => child.props._open);

    const collapsed = this.props.collapsed ? CLASSNAMES.COLLAPSED : null;

    return (
      <nav className={CLASSNAMES.CONTAINER}>
        <div className={classnames(CLASSNAMES.TOPNAV, collapsed)}>{children}</div>
        <ReactCSSTransitionGroup
          transitionEnterTimeout={200}
          transitionLeaveTimeout={300}
          component="div"
          transitionName="LeftNav--drawer-anim"
        >
          {openChild && <div className={CLASSNAMES.SUBNAV}>{openChild.props.children}</div>}
        </ReactCSSTransitionGroup>
      </nav>
    );
  }
}

export {NavLink} from "./NavLink";
export {NavGroup} from "./NavGroup";

LeftNav.propTypes = {
  children: MorePropTypes.oneOrManyOf(React.PropTypes.oneOfType([
    MorePropTypes.instanceOfComponent(NavLink),
    MorePropTypes.instanceOfComponent(NavGroup),
  ])),
  collapsed:  React.PropTypes.bool,
};
