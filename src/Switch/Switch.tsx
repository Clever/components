import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import {CloseIcon} from "../CloseIcon/CloseIcon";
import Checkmark from "../Checkbox/CheckMark";

import "./Switch.less";
import {FlexBox, Justify} from "../flex";

const propTypes = {
  ariaLabelledby: PropTypes.string,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  ariaLabelledby: "",
  ariaLabel: "",
  className: "",
  disabled: false,
};

const cssClass = {
  BG:  "Switch--bg",
  CHECKED: "Switch--checked",
  CHECKED_ICON: "Switch--checkedIcon",
  CONTAINER: "Switch",
  DISABLED: "Switch--disabled",
  HANDLE: "Switch--handle",
  HANDLE_GRIP_LEFT: "Switch--handleGripLeft",
  HANDLE_GRIP_RIGHT: "Switch--handleGripRight",
  UNCHECKED_ICON: "Switch--uncheckedIcon",
  OUTLINE: "Switch--outline",
  HOVER: "Switch--hover",
};

/**
 * Switch toggles a single setting on or off with an immediate effect.
 * Common uses:
 *   - Enable or disable preferences, settings, or features.
 *
 * W3C spec: https://www.w3.org/TR/wai-aria-practices-1.1/#checkbox
 */
export default class Switch extends React.PureComponent {
  static propTypes = propTypes;
  static cssClass = cssClass;
  static defaultProps = defaultProps;

  state = {
    hasOutline: false,
    hover: false,
    mouseDown: false,
  };

  render() {
    const {
      ariaLabelledby,
      ariaLabel,
      className,
      checked,
      disabled,
    } = this.props;

    const {hasOutline} = this.state;

    return (
      <button
        aria-checked={checked}
        aria-disabled={disabled}
        aria-labelledby={ariaLabelledby}
        aria-label={ariaLabel}
        className={classnames(cssClass.CONTAINER, className)}
        onMouseDown={() => this._onMouseDown()}
        onMouseUp={() => this._onMouseUp()}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        role="checkbox"
      >
        <FlexBox
          className={classnames(cssClass.BG,
            checked && cssClass.CHECKED,
            disabled && cssClass.DISABLED,
            hasOutline && cssClass.OUTLINE,
          )}
        >
          <FlexBox justify={Justify.BETWEEN} grow>
            <FlexBox column justify={Justify.CENTER}><Checkmark className={cssClass.CHECKED_ICON} /></FlexBox>
            <FlexBox column justify={Justify.CENTER}><CloseIcon className={cssClass.UNCHECKED_ICON} /></FlexBox>
          </FlexBox>
        </FlexBox>
        <div
          className={classnames(cssClass.HANDLE, checked && cssClass.CHECKED, disabled && cssClass.DISABLED)}
        >
          <div className={cssClass.HANDLE_GRIP_LEFT}></div>
          <div className={cssClass.HANDLE_GRIP_RIGHT}></div>
        </div>
      </button>
    );
  }

  _onFocus = () => {
    if (!this.state.mouseDown && !this.props.disabled) {
      this.setState({hasOutline: true});
    }
  }

  _onBlur = () => {
    this.setState({hasOutline: false});
  }

  _onMouseDown = () => {
    this.setState({mouseDown: true});
  }

  _onMouseUp = () => {
    const {onChange, checked, disabled} = this.props;
    this.setState({mouseDown: false});
    if (!disabled) {
      onChange(!checked);
    }
  }
}
