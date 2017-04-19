import React, {Component} from "react";

import Example from "./Example";
import View from "./View";
import {TextInput} from "src";

import "./TextInputView.less";


export default class TextInputView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      readOnly: false,
      hasError: false,
      inputValue: "",
      obscured: false,
      required: false,
    };
  }

  render() {
    const {cssClass} = TextInputView;

    return (
      <View className={cssClass.CONTAINER} title="TextInput">
        <Example
          code={`
            <TextInput
              disabled={this.state.disabled}
              readOnly={this.state.readOnly}
              required={this.state.required}
              enableShow={this.state.obscured}
              error={this.state.hasError ? "Enter a valid email address" : null}
              type={this.state.obscured ? "password" : "text"}
              label="TextInput Label"
              name="TextInputName"
              placeholder="TextInput Placeholder"
              onChange={e => this.setState({inputValue: e.target.value})}
              value={this.state.inputValue}
              //You can pass additional properties as well to the inner input element
              onMouseOver={e => {console.log("mouseover!", e)}}
            />
          `}
        >
          <div className={cssClass.INPUT_CONTAINER}>
            <TextInput
              disabled={this.state.disabled}
              readOnly={this.state.readOnly}
              required={this.state.required}
              enableShow={this.state.obscured}
              error={this.state.hasError ? "Invalid password" : null}
              type={this.state.obscured ? "password" : "text"}
              label="TextInput Label"
              name="TextInputName"
              placeholder="TextInput Placeholder"
              onChange={e => this.setState({inputValue: e.target.value})}
              value={this.state.inputValue}
              onMouseOver={e => {console.log("mouseover!", e);}}
            />
          </div>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.disabled}
              onChange={({target}) => this.setState({disabled: target.checked})}
            />
            {" "}
            Disabled
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.readOnly}
              onChange={({target}) => this.setState({readOnly: target.checked})}
            />
            {" "}
            Read Only
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.required}
              onChange={({target}) => this.setState({required: target.checked})}
            />
            {" "}
            Required
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.hasError}
              onChange={({target}) => this.setState({hasError: target.checked})}
            />
            {" "}
            Error
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.obscured}
              onChange={({target}) => this.setState({obscured: target.checked})}
            />
            {" "}
            Obscured
          </label>
        </Example>
      </View>
    );
  }
}

TextInputView.cssClass = {
  CONFIG: "TextInputView--config",
  CONTAINER: "TextInputView",
  INPUT_CONTAINER: "TextInputView--inputContainer",
};
