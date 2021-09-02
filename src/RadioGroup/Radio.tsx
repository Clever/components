import * as classnames from "classnames";
import * as React from "react";
import * as ReactDOM from "react-dom";

import "./Radio.less";

export interface Props<IDType extends string = string, ValueType = any> {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  id: IDType;
  onSelect?: (id: IDType, value: ValueType) => void;
  tabIndex?: number;
  value?: ValueType;
  lang?: string;
}

const cssClass = {
  CHECKED: "Radio--checked",
  CONTAINER: "Radio",
  DISABLED: "Radio--disabled",
  INNER: "Radio--inner",
  LABEL: "Radio--label",
  OUTER: "Radio--outer",
};

const LABEL_ID_PREFIX = "Radio--label";
let nextLabelIDSuffix = 0;
const getNextLabelID = () => `${LABEL_ID_PREFIX}--${nextLabelIDSuffix++}`;

/**
 * Single radio button input.
 * Usually used in a RadioGroup for providing a list of mutually-exclusive options to the user.
 */
export default class Radio<
  IDType extends string = string,
  ValueType = any
> extends React.PureComponent<Props<IDType, ValueType>> {
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
    const { checked, children, className, disabled, tabIndex, lang } = this.props;

    return (
      <button
        aria-checked={!!checked}
        aria-labelledby={this._labelID}
        className={classnames(
          cssClass.CONTAINER,
          checked && cssClass.CHECKED,
          disabled && cssClass.DISABLED,
          className,
        )}
        disabled={disabled}
        onClick={this._onClick}
        onFocus={this._onClick}
        role="radio"
        tabIndex={tabIndex}
        lang={lang}
      >
        <div className={cssClass.OUTER}>
          <div className={cssClass.INNER} />
        </div>
        <span className={cssClass.LABEL} id={this._labelID}>
          {children}
        </span>
      </button>
    );
  }

  _onClick = () => {
    const { disabled, id, onSelect, value } = this.props;

    if (disabled) {
      return;
    }

    if (onSelect) {
      onSelect(id, value);
    }
  };
}
