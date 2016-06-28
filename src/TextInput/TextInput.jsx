import React from "react";

require("./TextInput.less");

export class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inFocus: false};
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({inFocus: true});
  }

  onBlur() {
    this.setState({inFocus: false});
  }

  render() {
    var wrapperClass = "TextInput";

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

    // placeholder shown
    if (!this.props.value && this.props.placeholder) {
      wrapperClass += " TextInput--placeholder-shown";
    }

    // note on the upper right corner
    var inputNote;
    if (this.props.required) {
      inputNote = <span className="TextInput--required">required</span>;
    }
    if (this.props.error) {
      inputNote = <span className="TextInput--error">{this.props.error}</span>;
    }

    var type = "text";
    if (this.props.type) {
      type = this.props.type;
      if (this.props.type === "password") {
        wrapperClass += " TextInput--password";
      }
    }

    return (
      <div className={wrapperClass}>
        <div className="TextInput--infoRow">
          <label className="TextInput--label" htmlFor={this.props.name}>{this.props.label}</label>
          {inputNote}
        </div>
        <input
          className="TextInput--input"
          type={type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.props.onChange}
          readOnly={this.props.readOnly}
          disabled={this.props.disabled}
          required={this.props.required}
        />
      </div>
    );
  }
}

TextInput.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  value: React.PropTypes.node,
  placeholder: React.PropTypes.node,
  type: React.PropTypes.string,
  onChange: React.PropTypes.func,
  error: React.PropTypes.string,
  required: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
};
