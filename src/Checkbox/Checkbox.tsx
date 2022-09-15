import * as classnames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import * as ReactDOM from "react-dom";

import CheckMark from "./CheckMark";
import PartialMark from "./PartialMark";

import "./Checkbox.less";

export interface Props {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
  onChange?: ({ id: string, checked: boolean, value: any }) => void;
  partial?: boolean;
  tabIndex?: number;
  value?: any;
}

const propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
  partial: PropTypes.bool,
  tabIndex: PropTypes.number,
  value: PropTypes.any,
};

const cssClass = {
  CHECK_MARK: "Checkbox--checkMark",
  CHECKED: "Checkbox--checked",
  CONTAINER: "Checkbox",
  DISABLED: "Checkbox--disabled",
  INNER: "Checkbox--inner",
  LABEL: "Checkbox--label",
  OUTER: "Checkbox--outer",
  PARTIAL_MARK: "Checkbox--partialMark",
  PARTIAL: "Checkbox--partial",
};

const LABEL_ID_PREFIX = "Checkbox--label";
let nextLabelIDSuffix = 0;
const getNextLabelID = () => `${LABEL_ID_PREFIX}--${nextLabelIDSuffix++}`;

/**
 * Form element for single or multiple selections from a list.
 * Common uses:
 *   - Use a checkbox for optional opt-in/out form elements
 *   - Use checkboxes when a user may view and select one or more options from a relatively short
 *     list of choices.
 *
 * W3C spec: https://www.w3.org/TR/wai-aria-practices-1.1/#checkbox
 */
export default class Checkbox extends React.PureComponent<Props> {
  static propTypes = propTypes;

  _element = null;
  _labelID = getNextLabelID();

  focus() {
    if (this._element) {
      this._element.focus();
    }
  }

  componentDidMount() {
    this._element = ReactDOM.findDOMNode(this);
  }

  render() {
    const { checked, children, className, disabled, partial, tabIndex } = this.props;

    let ariaCheckedState;
    ariaCheckedState = !!checked;
    if (ariaCheckedState && partial) {
      ariaCheckedState = "mixed";
    }
    const hasLabel = !!children;

    return (
      <button
        aria-checked={ariaCheckedState}
        aria-labelledby={hasLabel ? this._labelID : undefined}
        // TODO: aria-label needs to be translated
        aria-label={!hasLabel ? "select/unselect" : undefined}
        className={classnames(
          cssClass.CONTAINER,
          checked && cssClass.CHECKED,
          disabled && cssClass.DISABLED,
          partial && cssClass.PARTIAL,
          className,
        )}
        disabled={disabled}
        onClick={this._onClick}
        role="checkbox"
        tabIndex={tabIndex}
      >
        <div className={cssClass.OUTER}>
          <div className={cssClass.INNER}>
            {partial ? (
              <PartialMark className={cssClass.PARTIAL_MARK} />
            ) : (
              checked && <CheckMark className={cssClass.CHECK_MARK} />
            )}
          </div>
        </div>
        <span className={cssClass.LABEL} id={this._labelID}>
          {children}
        </span>
      </button>
    );
  }

  _onClick = () => {
    const { disabled, id, onChange, checked, partial, value } = this.props;

    if (disabled) {
      return;
    }

    // Toggle the checked state.
    // If we're in a partial checked state, moved to a fully checked state.
    let newCheckedState = !checked;
    if (checked && partial) {
      newCheckedState = true;
    }

    if (onChange) {
      onChange({ id, checked: newCheckedState, value });
    }
  };
}
