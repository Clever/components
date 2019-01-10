import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import "./Step.less";
import CheckMark from "./CheckMark";
import { FlexBox } from "src/flex";
import Exclamation from "./Exclamation";

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.node]),
  showTitle: PropTypes.bool,
  showMessage: PropTypes.bool,
  showDescription: PropTypes.bool,
  id: PropTypes.number,
  seekable: PropTypes.bool,
  success: PropTypes.bool,
  current: PropTypes.bool,
  warning: PropTypes.bool,
  optional: PropTypes.bool,
  onClick: PropTypes.func,
};

const cssClass = {
  CURRENT: "Step--current",
  BUTTON: "Step--button",
  CONTAINER: "Step",
  DESCRIPTION: "Step--description",
  ICON: "Step--icon",
  MESSAGE_OPTIONAL: "Step--message--optional",
  MESSAGE_WARNING: "Step--message--warning",
  SEEKABLE: "Step--seekable",
  SUCCESS: "Step--success",
  TITLE: "Step--title",
  WARNING: "Step--warning",
};

const defaultProps = {
  showTitle: true,
  showMessage: true,
  showDescription: true,
};

/**
 * Single icon and caption denoting a step.
 * Usually used in a Stepper for providing a list of steps to the user.
 */
export default class Step extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static cssClass = cssClass;

  _onClick = () => this.props.onClick(this.props.index);

  _iconContent = () => {
    const {index, success, current, warning } = this.props;
    const stepNumber = index + 1;
    if (current) return stepNumber.toString();
    if (success) return (<CheckMark />);
    if (warning) return (<Exclamation />);
    return stepNumber.toString();
   }

  render() {
    const {className, title, description, success, current, warning, optional, seekable } = this.props;
    const stepClassName = classnames(
      className,
      cssClass.CONTAINER,
      success && cssClass.SUCCESS,
      current && cssClass.CURRENT,
      warning && cssClass.WARNING,
      seekable && cssClass.SEEKABLE,
    );

    const listValue = (
      <div className={stepClassName}>
        <FlexBox className={cssClass.ICON}>{this._iconContent()}</FlexBox>
        <div>
          {title && (
            <div className={cssClass.TITLE}>
              {title}
            </div>
          )}
          {warning && (
            <div className={cssClass.MESSAGE_WARNING}>
            We ran into an error on this step
            </div>
          )}
          {optional && (
            <div className={cssClass.MESSAGE_OPTIONAL}>
            Optional
            </div>
          )}
          {description && (
            <div className={cssClass.DESCRIPTION}>
              {description}
            </div>
          )}
        </div>
      </div>
    );
    if (seekable) {
      return (
        <button className={cssClass.BUTTON} onClick={this._onClick}>{listValue}</button>
      );
    }
    return listValue;
  }
}
