import * as _ from "lodash";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import * as ReactDOM from "react-dom";

import "./MenuItem.less";

export interface Props {
  children: React.ReactNode;
  className?: string;
  component?: any;
  customStyles?: boolean;
  disabled?: boolean;
  focused?: boolean;
  href?: string;
  onBlur?: Function;
  onClick?: Function;
  onMouseEnter?: Function;
  selected?: boolean;
  target?: string;
  useSafariCompatibilityMode?: boolean;
  [additionalProp: string]: any;
}

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  component: PropTypes.any,
  customStyles: PropTypes.bool,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  href: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  selected: PropTypes.bool,
  target: PropTypes.string,
  useSafariCompatibilityMode: PropTypes.bool,
};

const defaultProps = {
  onClick: _.noop,
  onMouseEnter: _.noop,
};

export const cssClass = {
  CONTAINER: "Menu--MenuItem",
  DEFAULT_STYLES: "Menu--MenuItem--default",

  selected: (baseClass) => (baseClass ? `${baseClass}--selected` : ""),
};

export default class MenuItem extends React.PureComponent<Props> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  _containerEl;

  componentDidMount() {
    this._containerEl = ReactDOM.findDOMNode(this);
    this._updateFocus(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._updateFocus(nextProps);
  }

  render() {
    const {
      children,
      className,
      component,
      customStyles,
      href,
      onBlur,
      onClick,
      onMouseEnter,
      selected,
      target,
      disabled,
      useSafariCompatibilityMode,
    } = this.props;
    const additionalProps = _.omit(this.props, Object.keys(propTypes));

    let MenuButton = component;
    if (!MenuButton) {
      // Render disabled href elements as buttons so that they can be disabled
      MenuButton = href && !disabled ? "a" : "button";
    }

    // Safari fires focusout events on button mousedown events - it basically removes and returns
    // focus between mousedown and mouseup. Yes, that is quite weird.
    //
    // To avoid closing the menu before the user is done clicking a button menu item, we trigger
    // onClick on mousedown instead.
    //
    // This only needs to be done for buttons, not anchors.
    let onMouseDown: Function;
    if (useSafariCompatibilityMode && MenuButton === "button") {
      onMouseDown = onClick;
    }

    return (
      <MenuButton
        {...additionalProps}
        className={classnames(
          cssClass.CONTAINER,
          !customStyles && cssClass.DEFAULT_STYLES,
          className,
          selected && cssClass.selected(cssClass.CONTAINER),
          selected && cssClass.selected(className),
        )}
        href={href}
        onBlur={onBlur}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        disabled={disabled}
        role="menuitem"
        tabIndex={-1}
        target={target}
      >
        {children}
      </MenuButton>
    );
  }

  _updateFocus(props) {
    if (props.focused) {
      if (this._containerEl && this._containerEl.focus) {
        setTimeout(() => this._containerEl.focus());
      }
    }
  }
}
