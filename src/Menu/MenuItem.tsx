import * as _ from "lodash";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import * as ReactDOM from "react-dom";

import "./MenuItem.less";

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
  selected: PropTypes.bool,
  target: PropTypes.string,
};

const defaultProps = {
  onClick: _.noop,
};

const cssClass = {
  CONTAINER: "Menu--MenuItem",
  DEFAULT_STYLES: "Menu--MenuItem--default",

  selected: baseClass => (baseClass ? `${baseClass}--selected` : ""),
};

export default class MenuItem extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static cssClass = cssClass;

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
      selected,
      target,
    } = this.props;
    const additionalProps = _.omit(this.props, Object.keys(propTypes));

    let MenuButton = component;
    if (!MenuButton) {
      MenuButton = href ? "a" : "button";
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
        role="menuitem"
        tabIndex={-1}
        target={target}
      >
        {children}
      </MenuButton>
    );
  }

  _handleClick = () => {
    this.props.onClick();
    this.props.onBlur();
  };

  _updateFocus(props) {
    if (props.focused) {
      if (this._containerEl && this._containerEl.focus) {
        setTimeout(() => this._containerEl.focus());
      }
    }
  }
}
