import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";

import "./Step.less";
import CheckMark from "./CheckMark";
import {FlexBox} from "../flex";
import Exclamation from "./Exclamation";

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.node,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  warning: PropTypes.string,
  state: PropTypes.oneOf(["INCOMPLETE", "SUCCESS", "WARNING"]),
  current: PropTypes.bool,
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
  state: "INCOMPLETE",
  warning: "We ran into an error on this step",
};

/**
 * Single icon and caption denoting a step.
 * Usually used in a Stepper for providing a list of steps to the user.
 */
export default class Step extends React.PureComponent {
  static propTypes = propTypes;
  static cssClass = cssClass;
  static defaultProps = defaultProps;

  _onClick = () => this.props.onClick(this.props.id);

  _iconContent = () => {
    const {label, current, state} = this.props;
    const iconMap = {
      SUCCESS:  (<CheckMark />),
      WARNING: (<Exclamation />),
      INCOMPLETE: label,
    };
    if (current) {
      return label;
    }
    return iconMap[state];
  }

  render() {
    const {className, title, description, state, current, warning, optional, onClick} = this.props;
    const stepClassName = classnames(
      className,
      cssClass.CONTAINER,
      cssClass.BUTTON,
      state === "SUCCESS" && cssClass.SUCCESS,
      current && cssClass.CURRENT,
      state === "WARNING" && cssClass.WARNING,
      onClick && cssClass.SEEKABLE,
    );

    const icon = (<FlexBox className={cssClass.ICON}>{this._iconContent()}</FlexBox>);
    const content = (
      <div>
          {title && (
            <div className={cssClass.TITLE}>
              {title}
            </div>
          )}
          {state === "WARNING" && (
            <div className={cssClass.MESSAGE_WARNING}>
              {warning}
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
    );

    if (onClick) {
      return (
      <button
        tabIndex={0}
        className={classnames(stepClassName, cssClass.BUTTON)}
        onClick={this._onClick}
      >
        {icon}
        {content}
      </button>);
    }

    return (
      <div className={stepClassName}>
        {icon}
        {content}
      </div>
    );
  }
}
