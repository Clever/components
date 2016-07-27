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
    this.setState({inFocus: true});
  }

  onBlur() {
    this.setState({inFocus: false});
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

    let type = (this.props.type === "password" && this.state.hidden) ? "password" : "text";

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
  enableShow: React.PropTypes.bool,
};
