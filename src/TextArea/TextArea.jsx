import React from "react";
import * as PropTypes from "prop-types";
import classnames from "classnames";
import TextareaAutosize from "react-autosize-textarea";

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

    const props = {
      className: "TextArea--input",
      disabled: this.props.disabled,
      maxLength: this.props.maxLength,
      minLength: this.props.minLength,
      name: this.props.name,
      onBlur: this.onBlur,
      onChange: this.props.onChange,
      onFocus: this.onFocus,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly,
      ref: "input",
      required: this.props.required,
      spellCheck: this.props.spellCheck,
      value: this.props.value,
      rows: this.props.rows || 1,
    };

    let rows = this.props.rows;
    if (this.props.placeholder) {
      // Need to add another row for autoGrow since it seems to collapse in a way that conflicts with the placeholder
      // margin
      rows = this.props.rows + 1;
    }

    let textarea = <textarea {...props} rows={rows} />;
    if (this.props.autoResize) {
      rows++;
      textarea = <TextareaAutosize {...props} rows={rows} />;
    }

    return (
      <div className={classnames(wrapperClass, this.props.className)}>
        <div className="TextArea--infoRow">
          <label className="TextArea--label" htmlFor={this.props.name}>{this.props.label}</label>
          {inputNote}
        </div>
        {textarea}
      </div>
    );
  }
}

TextArea.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  optional: PropTypes.bool,
  placeholder: PropTypes.node,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  spellCheck: PropTypes.bool,
  value: PropTypes.node,
  className: PropTypes.string,
  autoResize: PropTypes.bool,
  rows: PropTypes.number,
};
