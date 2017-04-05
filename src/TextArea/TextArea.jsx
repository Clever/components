import React from "react";
import classnames from "classnames";

import "./TextArea.less";

export class TextArea extends React.Component {
  static validateProps(props) {
    if (props.required && props.optional) {
      throw new Error("You cannot pass both `required` and `optional` on a TextArea.");
    }

    if (["readOnly", "disabled", "inFocus"].filter((x) => props[x]).length > 1) {
      throw new Error("The readOnly, disabled, and inFocus props on a TextArea are mutually exclusive.");
    }

    return props;
  }

  constructor(props) {
    super(TextArea.validateProps(props));

    this.state = {inFocus: false};
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  /* Insert any additional lifecycle methods,
     event handlers, and helper methods here */

  onFocus() {
    const {onFocus} = this.props;

    this.setState({inFocus: true});
    if (onFocus) {
      onFocus();
    }
  }

  onBlur() {
    const {onBlur} = this.props;

    this.setState({inFocus: false});
    if (onBlur) {
      onBlur();
    }
  }

  focus() {
    this.refs.input.focus();
  }

  render() {
    let wrapperClass = "TextArea";

    if (this.props.error) wrapperClass += " TextArea--hasError";

    if (this.props.readOnly) {
      wrapperClass += " TextArea--readonly";
    } else if (this.props.disabled) {
      wrapperClass += " TextArea--disabled";
    } else if (this.state.inFocus) {
      wrapperClass += " TextArea--inFocus";
    }

    // placeholder shown
    if (!this.props.value && this.props.placeholder) {
      wrapperClass += " TextArea--placeholder-shown";
    }

    // note on the upper right corner
    let inputNote;
    if (this.props.required) {
      inputNote = <span className="TextArea--required">required</span>;
    }
    if (this.props.optional) {
      inputNote = <span className="TextArea--optional">optional</span>;
    }

    if (this.props.error) {
      inputNote = <span className="TextArea--error">{this.props.error}</span>;
    }

    return (
      <div className={classnames(wrapperClass, this.props.className)}>
        <div className="TextArea--infoRow">
          <label className="TextArea--label" htmlFor={this.props.name}>{this.props.label}</label>
          {inputNote}
        </div>
        <textarea
          className="TextArea--input"
          disabled={this.props.disabled}
          maxLength={this.props.maxLength}
          minLength={this.props.minLength}
          name={this.props.name}
          onBlur={this.onBlur}
          onChange={this.props.onChange}
          onFocus={this.onFocus}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          ref="input"
          required={this.props.required}
          spellCheck={this.props.spellCheck}
          value={this.props.value}
        />
      </div>
    );
  }
}

TextArea.propTypes = {
  disabled: React.PropTypes.bool,
  error: React.PropTypes.string,
  label: React.PropTypes.string,
  maxLength: React.PropTypes.number,
  minLength: React.PropTypes.number,
  name: React.PropTypes.string.isRequired,
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  optional: React.PropTypes.bool,
  placeholder: React.PropTypes.node,
  readOnly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  spellCheck: React.PropTypes.bool,
  value: React.PropTypes.node,
  className: React.PropTypes.string,
};
