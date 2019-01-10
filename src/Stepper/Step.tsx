import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";
import * as _ from "lodash";

import {Button} from "../Button/Button";

import "./Step.less";
import CheckMark from "./CheckMark";
import { FlexBox } from "src/flex";
import Exclamation from "./Exclamation";

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  showTitle: PropTypes.bool,
  showMessage: PropTypes.bool,
  showDescription: PropTypes.bool,
  index: PropTypes.number,
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

  render() {
    const {className, title, description, showTitle, showMessage, showDescription,
      index, success, current, warning, optional, seekable, onClick} = this.props;
    const stepClassName = classnames(
      className,
      cssClass.CONTAINER,
      success && cssClass.SUCCESS,
      current && cssClass.CURRENT,
      warning && cssClass.WARNING,
      seekable && cssClass.SEEKABLE,
    );
    const stepNumber = index + 1;

    const listValue = (
      <div className={stepClassName}>
        <FlexBox className={cssClass.ICON}>
          { success && !current && <CheckMark /> }
          { warning && !current && <Exclamation /> }
          { current && !warning && stepNumber.toString()}
        </FlexBox>
        <div>
          {showTitle && (
            <span className={cssClass.TITLE}>
              {title}
            </span>
          )}
          {showMessage && warning && (
            <span className={cssClass.MESSAGE_WARNING}>
            We ran into an error on this step
            </span>
          )}
          {showMessage && optional && (
            <span className={cssClass.MESSAGE_OPTIONAL}>
            Optional
            </span>
          )}
          {showDescription && (
          _.isString(description)
            ? <p className={cssClass.DESCRIPTION}>
              {description}
            </p>
            : <div className={cssClass.DESCRIPTION}>
              {description}
            </div>
          )}
        </div>
      </div>
    );
    return (
      seekable
        ? <Button
          className={cssClass.BUTTON}
          type="linkPlain"
          onClick={() => onClick(index)}
          value={listValue}
        />
        : listValue
    );
  }
}
