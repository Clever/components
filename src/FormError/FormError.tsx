import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import {FlexBox, FlexItem} from "../flex";
import ErrorIcon from "./ErrorIcon";

import "./FormError.less";

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const cssClass = {
  CONTAINER: "FormError",
  ICON: "FormError--icon",
  MESSAGE: "FormError--message",
};

/**
 * Convenience display component for simple form errors.
 * TODO: This is a v0 created for use with the RadioGroup and CheckboxGroup components and probably
 * needs to be fleshed out a little more.
 */
export default class FormError extends React.PureComponent {
  static propTypes = propTypes;
  static cssClass = cssClass;

  render() {
    const {children, className} = this.props;

    return (
      <FlexBox alignItems="start" className={classnames(cssClass.CONTAINER, className)}>
        <ErrorIcon className={cssClass.ICON} />
        <FlexItem className={cssClass.MESSAGE} grow>
          {children}
        </FlexItem>
      </FlexBox>
    );
  }
}
