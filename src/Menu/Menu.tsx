import * as _ from "lodash";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import * as RootCloseWrapper from "react-overlays/lib/RootCloseWrapper";

import MenuItem, { cssClass as menuItemCss, Props as MenuItemProps } from "./MenuItem";
import MorePropTypes from "../utils/MorePropTypes";
import { ChildrenOf, Values } from "../utils/types";

import "./Menu.less";

export interface Props {
  children?: ChildrenOf<typeof MenuItem>;
  className?: string;
  maxHeight?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;
  onOpenChange?: (isOpen: boolean) => void;
  onSelect?: Function;
  placement?: Values<typeof Placement>;
  stayOpenOnSelect?: boolean;
  trigger: React.ReactElement;
  triggerRefOverride?: React.RefObject<HTMLElement>;
  wrapItems?: boolean;
  useSafariCompatibilityMode?: boolean;
  [additionalProp: string]: any;
}

const Placement = {
  LEFT: "left",
  RIGHT: "right",
} as const;

const propTypes = {
  children: MorePropTypes.oneOrManyOf(MorePropTypes.instanceOfComponent(MenuItem)),
  className: PropTypes.string,
  maxHeight: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  onOpenChange: PropTypes.func,
  onSelect: PropTypes.func,
  placement: PropTypes.oneOf(Object.values(Placement)),
  stayOpenOnSelect: PropTypes.bool,
  trigger: PropTypes.node.isRequired,
  wrapItems: PropTypes.bool,
  useSafariCompatibilityMode: PropTypes.bool,
};

const defaultProps = {
  maxHeight: "50vh",
  maxWidth: "50vw",
  minWidth: "100%",
  onOpenChange: _.noop,
  onSelect: _.noop,
  placement: Placement.LEFT,
};

const cssClass = {
  CONTAINER: "Menu",
  DROPDOWN_CONTAINER: "Menu--dropdown--container",
  DROPDOWN: "Menu--dropdown",
  ITEM_WRAPPER: "Menu--itemWrapper",
  TRIGGER: "Menu--trigger",
  WRAP: "Menu--dropdown--wrap",

  placement: (p) => `Menu--dropdown--placement--${p}`,
};

const KeyCode = {
  ARROW_DOWN: 40,
  ARROW_UP: 38,
  END: 35,
  ESCAPE: 27,
  HOME: 36,
} as const;

const ArrowScrollDirection = {
  [KeyCode.ARROW_DOWN]: 1,
  [KeyCode.ARROW_UP]: -1,
} as const;

let nextID = 0;

/**
 * Attaches a dropdown menu to the given child node.
 *
 * Follows recommendations from w3.org:
 * https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/menu-button/menu-button-links.html
 */
export default class Menu extends React.PureComponent<Props> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  static Item = MenuItem;
  static Placement = Placement;

  _menuID = nextID++;

  IDs = {
    DROPDOWN: `Menu--dropdown--${this._menuID}`,
    TRIGGER: `Menu--trigger--${this._menuID}`,
  };

  _containerEl;
  _triggerRef;

  state = {
    focusIndex: 0,
    open: false,
  };

  render() {
    const {
      className,
      maxHeight,
      maxWidth,
      minWidth,
      placement,
      trigger,
      triggerRefOverride,
      wrapItems,
      useSafariCompatibilityMode,
    } = this.props;
    const { open } = this.state;

    const additionalProps = _.omit(
      this.props,
      Object.keys(propTypes) as (keyof typeof propTypes)[],
    );

    return (
      <RootCloseWrapper onRootClose={() => this._setDropdownOpen(false)}>
        <div
          {...additionalProps}
          className={classnames(cssClass.CONTAINER, className)}
          onKeyDown={this._handleKeyDown}
          onKeyUp={this._handleKeyUp}
          onBlur={this._handleFocusOut}
        >
          {React.cloneElement(trigger, {
            "aria-controls": this.IDs.DROPDOWN,
            "aria-expanded": open,
            "aria-haspopup": true,
            className: classnames(cssClass.TRIGGER, trigger.props.className),
            id: this.IDs.TRIGGER,
            onClick: this._handleTriggerClick,
            ref: triggerRefOverride || this._handleTriggerRef,
            role: "button",
          })}
          {open && (
            <ul
              aria-labelledby={this.IDs.TRIGGER}
              className={classnames(
                cssClass.DROPDOWN,
                cssClass.placement(placement),
                wrapItems && cssClass.WRAP,
              )}
              id={this.IDs.DROPDOWN}
              role="menu"
              style={{ maxHeight, maxWidth, minWidth }}
            >
              {this._getMenuItems().map((menuItem, i) => (
                <li className={cssClass.ITEM_WRAPPER} key={i} role="none">
                  {React.cloneElement(menuItem, {
                    focused: this._isFocused(menuItem, i),
                    onClick: (e) => this._handleItemClick(menuItem, e),
                    onMouseEnter: (e) => this._handleItemMouseEnter(menuItem, i, e),
                    useSafariCompatibilityMode,
                  })}
                </li>
              ))}
            </ul>
          )}
        </div>
      </RootCloseWrapper>
    );
  }

  _handleTriggerRef = (ref) => {
    this._triggerRef = ref;
  };

  _handleTriggerClick = (e) => {
    const { trigger } = this.props;

    this._toggleDropdown();

    if (trigger.props.onClick) {
      trigger.props.onClick(e);
    }
  };

  _handleItemClick = (menuItem, e) => {
    const { stayOpenOnSelect } = this.props;

    if (!stayOpenOnSelect) {
      this._setDropdownOpen(false, () => setTimeout(this._refocusTrigger));
    }

    menuItem.props.onClick(e);
  };

  _handleItemMouseEnter = (menuItem, i, e) => {
    this.setState({ focusIndex: i });

    menuItem.props.onMouseEnter(e);
  };

  _handleFocusOut = (e) => {
    const nextElement = e.relatedTarget;
    if (!nextElement) {
      return;
    } else if (
      nextElement.classList.contains(menuItemCss.CONTAINER) &&
      nextElement.parentNode.parentNode.id === this.IDs.DROPDOWN
    ) {
      return;
    }
    if (nextElement.id === this.IDs.TRIGGER) {
      return;
    }

    this._setDropdownOpen(false);
  };

  _handleKeyDown = (e) => {
    switch (e.keyCode) {
      case KeyCode.ARROW_DOWN:
        this._handleArrowKeyDown(e);
        return;
      case KeyCode.ARROW_UP:
        this._handleArrowKeyDown(e);
        return;
      default:
        return;
    }
  };

  _handleArrowKeyDown = (e) => {
    const { focusIndex, open } = this.state;

    const menuItems = this._getMenuItems();
    if (menuItems.length === 0) {
      return;
    }

    const defaultFocusIndex = menuItems.findIndex((i) => !!i.props.selected);
    const shouldResetFocus = !open || focusIndex === null;

    const lastFocusIndex = shouldResetFocus ? defaultFocusIndex : focusIndex;
    let nextFocusIndex = lastFocusIndex + ArrowScrollDirection[e.keyCode];
    if (nextFocusIndex >= menuItems.length) {
      nextFocusIndex = 0;
    }
    if (nextFocusIndex < 0) {
      nextFocusIndex = menuItems.length - 1;
    }
    this.setState({ focusIndex: nextFocusIndex, open: true });
    this.props.onOpenChange(true);

    e.preventDefault();
    e.stopPropagation();
  };

  _handleKeyUp = (e) => {
    const { open } = this.state;

    const menuItems = this._getMenuItems();
    if (menuItems.length === 0) {
      return;
    }

    switch (e.keyCode) {
      case KeyCode.ESCAPE:
        this._setDropdownOpen(false, () => setTimeout(this._refocusTrigger));
        return;
      case KeyCode.HOME:
        if (!open) {
          return;
        }

        this.setState({ focusIndex: 0 });

        e.preventDefault();
        e.stopPropagation();

        return;
      case KeyCode.END:
        if (!open) {
          return;
        }

        this.setState({ focusIndex: menuItems.length - 1 });

        e.preventDefault();
        e.stopPropagation();

        return;
      default:
        return;
    }
  };

  _getKeyCode(e) {
    if (!_.isNil(e.key)) {
      return e.key;
    }

    if (!_.isNil(e.keyIdentifier)) {
      return e.keyIdentifier;
    }

    return e.keyCode;
  }

  _refocusTrigger = () => this._triggerRef && this._triggerRef.focus && this._triggerRef.focus();

  _toggleDropdown = () => this._setDropdownOpen(!this.state.open);

  _setDropdownOpen = (open, cb = _.noop) => {
    const menuItems = this._getMenuItems();
    let focusIndex = menuItems.findIndex((i) => !!i.props.selected);
    if (focusIndex === -1) {
      focusIndex = 0;
    }

    this.setState({ focusIndex, open }, cb);
    this.props.onOpenChange(open);
  };

  _getMenuItems() {
    return (React.Children.toArray(this.props.children) as React.ReactElement<
      MenuItemProps
    >[]).filter((i) => !!i);
  }

  _isFocused(menuItem, itemIndex) {
    const { focusIndex } = this.state;

    if (focusIndex === null) {
      return !!menuItem.props.selected;
    }

    return itemIndex === focusIndex;
  }
}
