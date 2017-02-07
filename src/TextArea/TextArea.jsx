import React from "react";

import "./TextArea.less";

/*
  Add a description of your component here.

  If your component can be expressed without state,
  use the stateless function syntax instead!
*/
export class TextArea extends React.Component {
  constructor(props) {
    super(props);

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

    // TODO:  throw error for mutually exclusive states
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
    if (this.props.error) {
      inputNote = <span className="TextArea--error">{this.props.error}</span>;
    }

    return (
      <div className={wrapperClass}>
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
  placeholder: React.PropTypes.node,
  readOnly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  spellCheck: React.PropTypes.bool,
  value: React.PropTypes.node,
};
