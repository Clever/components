import * as _ from "lodash";
import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import Checkbox from "../Checkbox";
import FormError from "../FormError";

import "./CheckboxGroup.less";

interface Option {
  id: string;
  checked?: boolean;
  disabled?: boolean;
  label: React.ReactNode;
  value?: any;
}

export interface Props {
  className?: string;
  disabled?: boolean;
  error?: React.ReactNode;
  label: React.ReactNode;
  onChange: (options: Option[]) => void;
  options: Option[];
  title?: React.ReactNode;
}

const OPTION_PROP_TYPE = PropTypes.shape({
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.node.isRequired,
  value: PropTypes.any,
});

const propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.node,
  label: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(OPTION_PROP_TYPE).isRequired,
  title: PropTypes.node,
};

const cssClass = {
  CHECKBOX: "CheckboxGroup--checkbox",
  CHECKBOX_GLOBAL: "CheckboxGroup--checkbox--global",
  CONTAINER: "CheckboxGroup",
  LABEL: "CheckboxGroup--label",
  SUB_OPTIONS: "CheckboxGroup--subOptions",
};

const LABEL_ID_PREFIX = "CheckboxGroup--label";
let nextLabelIDSuffix = 0;
const getNextLabelID = () => `${LABEL_ID_PREFIX}--${nextLabelIDSuffix++}`;

/**
 * Renders a group of related checkboxes that can all be checked/unchecked together by clicking a
 * parent checkbox, or separately by clicking each individual checkbox.
 *
 * TODO: Add support for resetting the options to their initial state when going from all unchecked
 * to partially checked as per
 * https://www.w3.org/TR/wai-aria-practices-1.1/examples/checkbox/checkbox-2/checkbox-2.html
 *
 * W3C spec: https://www.w3.org/TR/wai-aria-practices-1.1/#checkbox
 */
export default class CheckboxGroup extends React.PureComponent<Props> {
  static propTypes = propTypes;

  _labelID = getNextLabelID();
  _optionRefsByID = {};

  render() {
    const { className, disabled, error, label, options, title } = this.props;

    const allChecked = _.every(options, o => o.checked);
    const someChecked = _.some(options, o => o.checked);

    return (
      <div
        aria-labelledby={this._labelID}
        className={classnames(cssClass.CONTAINER, className)}
        role="group"
      >
        <div className={cssClass.LABEL} id={this._labelID}>
          {title}
        </div>
        {error && <FormError>{error}</FormError>}
        <Checkbox
          checked={someChecked}
          className={cssClass.CHECKBOX_GLOBAL}
          disabled={!!disabled}
          id="global"
          onChange={this._handleGlobalChange}
          partial={someChecked && !allChecked}
        >
          {label}
        </Checkbox>
        <div className={cssClass.SUB_OPTIONS}>
          {_.map(options, (o: any) => (
            <Checkbox
              checked={o.checked}
              className={cssClass.CHECKBOX}
              disabled={!!disabled || !!o.disabled}
              id={o.id}
              key={o.id}
              onChange={this._handleSingleChange}
              value={o.value}
            >
              {o.label}
            </Checkbox>
          ))}
        </div>
      </div>
    );
  }

  _handleGlobalChange = ({ checked }) => {
    const { onChange, options } = this.props;

    onChange(_.map(options, o => ({ ...o, checked })));
  };

  _handleSingleChange = ({ id, checked }) => {
    const { onChange, options } = this.props;

    onChange(
      _.map(options, (o: any) => ({
        ...o,
        checked: o.id === id ? checked : o.checked,
      })),
    );
  };
}
