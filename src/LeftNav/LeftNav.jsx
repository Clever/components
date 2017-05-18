import * as PropTypes from "prop-types";
import * as React from "react";
import _ from "lodash";
import classnames from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import RootCloseWrapper from "react-overlays/lib/RootCloseWrapper";

import MorePropTypes from "../utils/MorePropTypes";
import {NavLink} from "./NavLink";
import {NavGroup} from "./NavGroup";

import "./LeftNav.less";


/** NOTE: Corresponds to the `@timingSlowly` LESS constant in src/less/animations.less. */
const WIDTH_TRANSITION_DURATION_MS = 400;

export class LeftNav extends React.PureComponent {
  constructor(props) {
    super(props);

    // If a NavLink in a NavGroup is marked as selected on initialization, we
    // should open the drawer to show it. Otherwise, don't start with the drawer open.
    const selectedNavGroup = _.find(this._getNonEmptyChildren(props.children), child =>
      child.type === NavGroup &&
        this._getNonEmptyChildren(child.props.children).some(navLink => navLink.props.selected)
    );
    this.state = {openNavGroup: selectedNavGroup ? selectedNavGroup.props.id : null};
  }

  _getNonEmptyChildren(children) {
    return _.compact(React.Children.toArray(children));
  }

  render() {
    const {cssClass} = LeftNav;
    const {
      children,
      className,
      collapseOnSubNavOpen,
      collapsed,
      withActiveNavGroups,
      withTooltips,
    } = this.props;
    const {openNavGroup} = this.state;
    const _collapsed = collapsed || (collapseOnSubNavOpen && !!openNavGroup);

    // Clone all of the children so that we can attach our own click handlers
    const navItems = this._getNonEmptyChildren(children).map(child => {
      // Configure top level NavLinks to close any open NavGroup on click
      if (child.type === NavLink) {
        return React.cloneElement(child, {
          _collapsed,
          _withTooltips: withTooltips,
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
        const open = child.props.id === openNavGroup;
        return React.cloneElement(child, {
          _collapsed,
          _open: open,
          _withActiveNavGroups: withActiveNavGroups,
          _withTooltips: withTooltips,
          _onClick: () => this.setState({openNavGroup: open ? null : child.props.id}),
        });
      }

      return null; // Should never get here thanks to PropType validation
    });

    // Find the open NavGroup so that we can render its children NavLinks in the drawer
    const openChild = _.find(this._getNonEmptyChildren(navItems), item => item.props._open);

    return (
      <RootCloseWrapper onRootClose={() => this._onRootClose()}>
        <nav
          className={classnames(
            cssClass.CONTAINER,
            _collapsed && cssClass.COLLAPSED,
            openChild && cssClass.WITH_SUBNAV_OPEN,
            className)}
        >
          <div className={classnames(cssClass.TOPNAV, _collapsed && cssClass.TOPNAV_COLLAPSED)}>
            {navItems}
          </div>
          <ReactCSSTransitionGroup
            className={classnames(cssClass.SUBNAV, openChild && cssClass.SUBNAV_OPEN)}
            transitionEnterTimeout={WIDTH_TRANSITION_DURATION_MS}
            transitionLeaveTimeout={WIDTH_TRANSITION_DURATION_MS}
            component="div"
            transitionName={cssClass.SUBNAV_CONTENT_ANIM}
          >
            {openChild && (
              <div className={cssClass.SUBNAV_CONTENT}>
                {openChild.props.children}
              </div>
            )}
          </ReactCSSTransitionGroup>
        </nav>
      </RootCloseWrapper>
    );
  }

  _onRootClose() {
    const {closeSubNavOnBlur} = this.props;

    if (!closeSubNavOnBlur) {
      return;
    }

    this.setState({openNavGroup: null});
  }
}

LeftNav.NavLink = NavLink;
LeftNav.NavGroup = NavGroup;

LeftNav.propTypes = {
  children: MorePropTypes.oneOrManyOf(PropTypes.oneOfType([
    MorePropTypes.instanceOfComponent(NavLink),
    MorePropTypes.instanceOfComponent(NavGroup),
  ])),
  className: PropTypes.string,
  closeSubNavOnBlur: PropTypes.bool,
  collapseOnSubNavOpen: PropTypes.bool,
  collapsed: PropTypes.bool,
  withActiveNavGroups: PropTypes.bool,
  withTooltips: PropTypes.bool,
};

LeftNav.cssClass = {
  COLLAPSED: "LeftNav--collapsed",
  CONTAINER: "LeftNav",
  SUBNAV_CONTENT_ANIM: "LeftNav--subnav--content--anim",
  SUBNAV_CONTENT: "LeftNav--subnav--content",
  SUBNAV_OPEN: "LeftNav--subnav--open",
  SUBNAV: "LeftNav--subnav",
  TOPNAV_COLLAPSED: "LeftNav--topnav--collapsed",
  TOPNAV: "LeftNav--topnav",
  WITH_SUBNAV_OPEN: "LeftNav--withSubnavOpen",
};
