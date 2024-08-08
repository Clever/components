import * as PropTypes from "prop-types";
import * as React from "react";
import * as _ from "lodash";
import * as classnames from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import * as RootCloseWrapper from "react-overlays/lib/RootCloseWrapper";

import MorePropTypes from "../utils/MorePropTypes";
import { NavLink } from "./NavLink";
import { NavGroup } from "./NavGroup";
import { ChildrenOf } from "../utils/types";

import "./LeftNav.less";

export interface Props {
  children?: LeftNavChildren;
  className?: string;
  closeSubNavOnBlur?: boolean;
  collapseOnSubNavOpen?: boolean;
  collapsed?: boolean;
  narrow?: boolean;
  withActiveNavGroups?: boolean;
  withTooltips?: boolean;
}

interface State {
  openNavGroup: string;
}

type LeftNavChildren = ChildrenOf<typeof NavLink | typeof NavGroup>;

const propTypes = {
  children: MorePropTypes.oneOrManyOf(
    PropTypes.oneOfType([
      MorePropTypes.instanceOfComponent(NavLink),
      MorePropTypes.instanceOfComponent(NavGroup),
    ]),
  ),
  className: PropTypes.string,
  closeSubNavOnBlur: PropTypes.bool,
  collapseOnSubNavOpen: PropTypes.bool,
  collapsed: PropTypes.bool,
  narrow: PropTypes.bool,
  withActiveNavGroups: PropTypes.bool,
  withTooltips: PropTypes.bool,
};

export const cssClass = {
  COLLAPSED: "LeftNav--collapsed",
  CONTAINER: "LeftNav",
  NARROW: "LeftNav--narrow",
  SUBNAV_CONTENT_ANIM: "LeftNav--subnav--content--anim",
  SUBNAV_CONTENT: "LeftNav--subnav--content",
  SUBNAV_OPEN: "LeftNav--subnav--open",
  SUBNAV: "LeftNav--subnav",
  TOPNAV_COLLAPSED: "LeftNav--topnav--collapsed",
  TOPNAV: "LeftNav--topnav",
  WITH_SUBNAV_OPEN: "LeftNav--withSubnavOpen",
};

/** NOTE: Corresponds to the `@timingSlowly` LESS constant in src/less/animations.less. */
const WIDTH_TRANSITION_DURATION_MS = 400;

export class LeftNav extends React.PureComponent<Props, State> {
  static propTypes = propTypes;

  static NavLink = NavLink;
  static NavGroup = NavGroup;

  constructor(props: Props) {
    super(props);

    // If a NavLink in a NavGroup is marked as selected on initialization, we
    // should open the drawer to show it. Otherwise, don't start with the drawer open.
    const selectedNavGroup = _.find(
      this._getNonEmptyChildren(props.children),
      (child) =>
        child.type === NavGroup &&
        this._getNonEmptyChildren(child.props.children).some((navLink) => navLink.props.selected),
    );
    this.state = { openNavGroup: selectedNavGroup ? selectedNavGroup.props.id : null };
  }

  _getNonEmptyChildren(children: LeftNavChildren) {
    return _.compact(React.Children.toArray(children)) as React.ReactElement[];
  }
  render() {
    const {
      children,
      className,
      collapseOnSubNavOpen,
      collapsed,
      narrow,
      withActiveNavGroups,
    } = this.props;
    let { withTooltips } = this.props;
    const { openNavGroup } = this.state;
    const _collapsed = collapsed || (collapseOnSubNavOpen && !!openNavGroup);

    // Clone all of the children so that we can attach our own click handlers
    const navItems = this._getNonEmptyChildren(children).map((child) => {
      // Disable ToolTips when LeftNav is not collapsed
      if (_collapsed) {
        withTooltips = true;
      } else {
        withTooltips = false;
      }
      // Configure top level NavLinks to close any open NavGroup on click
      if (child.type === NavLink) {
        return React.cloneElement(child, {
          _collapsed,
          _withTooltips: withTooltips,
          onClick: () => {
            this.setState({ openNavGroup: null });
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
          _onClick: () => this.setState({ openNavGroup: open ? null : child.props.id }),
        });
      }

      return null; // Should never get here thanks to PropType validation
    });

    // Find the open NavGroup so that we can render its children NavLinks in the drawer
    const openChild: any = _.find(this._getNonEmptyChildren(navItems), (item) => item.props._open);

    return (
      <RootCloseWrapper onRootClose={() => this._onRootClose()}>
        <nav
          className={classnames(
            cssClass.CONTAINER,
            _collapsed && cssClass.COLLAPSED,
            narrow && cssClass.NARROW,
            openChild && cssClass.WITH_SUBNAV_OPEN,
            className,
          )}
        >
          <div className={classnames(cssClass.TOPNAV, _collapsed && cssClass.TOPNAV_COLLAPSED)}>
            {navItems}
          </div>
          <TransitionGroup
            className={classnames(cssClass.SUBNAV, openChild && cssClass.SUBNAV_OPEN)}
            component="div"
            transitionName={cssClass.SUBNAV_CONTENT_ANIM}
          >
            {openChild && (
              <div className={cssClass.SUBNAV_CONTENT}>
                {React.Children.map(openChild.props.children, (child) => {
                  // ^ cannot use normal array map, because open.props.children may be an array or a single react element
                  return (
                    <CSSTransition
                      className={cssClass.SUBNAV_CONTENT_ANIM}
                      timeout={{
                        enter: WIDTH_TRANSITION_DURATION_MS,
                        exit: WIDTH_TRANSITION_DURATION_MS,
                      }}
                    >
                      {child}
                    </CSSTransition>
                  );
                })}
              </div>
            )}
          </TransitionGroup>
        </nav>
      </RootCloseWrapper>
    );
  }

  _onRootClose() {
    const { closeSubNavOnBlur } = this.props;

    if (!closeSubNavOnBlur) {
      return;
    }

    this.setState({ openNavGroup: null });
  }
}
