import React from "react";

require("./TextInput.less");

export class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inFocus: false, hidden: true};
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
  }

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

  toggleHidden() {
    this.setState({hidden: !this.state.hidden});
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

    // placeholder shown
    if (!this.props.value && this.props.placeholder) {
      wrapperClass += " TextInput--placeholder-shown";
    }

    // note on the upper right corner
    let inputNote;
    if (this.props.required) {
      inputNote = <span className="TextInput--required">required</span>;
    }
    if (this.props.error) {
      inputNote = <span className="TextInput--error">{this.props.error}</span>;
    }

    let type = (this.props.type === "email" || (this.props.type === "password" && this.state.hidden))
      ? this.props.type : "text";

    return (
      <div className={wrapperClass}>
        <div className="TextInput--infoRow">
          <label className="TextInput--label" htmlFor={this.props.name}>{this.props.label}</label>
          {inputNote}
        </div>
        <input
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
        {this.props.enableShow &&
          <button type="button" className="TextInput--link" onClick={this.toggleHidden}>
            {this.state.hidden ? "Show" : "Hide"}
          </button>
        }
      </div>
    );
  }
}

TextInput.propTypes = {
  disabled: React.PropTypes.bool,
  disableAutocomplete: React.PropTypes.bool,
  enableShow: React.PropTypes.bool,
  error: React.PropTypes.string,
  label: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  onKeyPress: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  placeholder: React.PropTypes.node,
  readOnly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  type: React.PropTypes.string,
  value: React.PropTypes.node,
};
