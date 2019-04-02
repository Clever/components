import React from "react";
import * as PropTypes from "prop-types";
import classnames from "classnames";
import _ from "lodash";

import { FormElementSize, formElementSizeClassName } from "../utils/Forms";

import "./TextInput.less";
import "../less/forms.less";

export class TextInput extends React.Component {
  static defaultProps = {
    placeholderCaps: true,
    size: FormElementSize.FULL_WIDTH,
  };

  constructor(props) {
    super(props);
    this.state = { inFocus: false, hidden: true };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
  }

  onFocus() {
    const { onFocus } = this.props;

    this.setState({ inFocus: true });
    if (onFocus) {
      onFocus();
    }
  }

  onBlur() {
    const { onBlur } = this.props;

    this.setState({ inFocus: false });
    if (onBlur) {
      onBlur();
    }
  }

  focus() {
    this.refs.input.focus();
  }

  toggleHidden() {
    this.setState({ hidden: !this.state.hidden });
  }

  render() {
    let wrapperClass = "TextInput";

    // add additional wrapper classes
    if (this.props.error) wrapperClass += " TextInput--hasError";

    // TODO:  throw error for mutually exclusive states
    if (this.props.readOnly) {
      wrapperClass += " TextInput--readonly";
    } else if (this.props.disabled) {
      wrapperClass += " TextInput--disabled";
    } else if (this.state.inFocus) {
      wrapperClass += " TextInput--inFocus";
    }

    // placeholder shown with caps
    if (!this.props.value && this.props.placeholder && this.props.placeholderCaps) {
      wrapperClass += " TextInput--placeholder-shown";
    } else if (!this.props.value && this.props.placeholder) {
      wrapperClass += " TextInput--placeholder-shown-no-caps";
    }

    // note on the upper right corner
    let inputNote;
    if (this.props.required) {
      inputNote = <span className="TextInput--required">required</span>;
    }
    if (this.props.error) {
      inputNote = <span className="TextInput--error">{this.props.error}</span>;
    }

    let type;
    if (this.props.type === "password") {
      type = this.state.hidden ? "password" : "text";
    } else {
      type = this.props.type || "text";
    }

    const additionalProps = _.omit(this.props, Object.keys(TextInput.propTypes));

    return (
      <div
        className={classnames(
          wrapperClass,
          formElementSizeClassName(this.props.size),
          this.props.className,
        )}
      >
        <div className="TextInput--infoRow">
          <label className="TextInput--label" htmlFor={this.props.name}>
            {this.props.label}
          </label>
          {inputNote}
        </div>
        <input
          {...additionalProps}
          autoComplete={this.props.disableAutocomplete && "off"}
          className="TextInput--input"
          disabled={this.props.disabled}
          name={this.props.name}
          onBlur={this.onBlur}
          onChange={this.props.onChange}
          onKeyPress={this.props.onKeyPress}
          onFocus={this.onFocus}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          ref="input"
          required={this.props.required}
          type={type}
          value={this.props.value}
        />
        {this.props.enableShow && (
          <button type="button" className="TextInput--link" onClick={this.toggleHidden}>
            {this.state.hidden ? "Show" : "Hide"}
          </button>
        )}
      </div>
    );
  }
}

TextInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disableAutocomplete: PropTypes.bool,
  enableShow: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.node,
  placeholderCaps: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  // Object.values isn't properly polyfilled in jsx files
  size: PropTypes.oneOf(Object.keys(FormElementSize).map(key => FormElementSize[key])),
  type: PropTypes.string,
  value: PropTypes.node,
};
