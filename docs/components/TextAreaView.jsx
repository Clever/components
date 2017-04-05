import React from "react";

import Example from "./Example";
import View from "./View";
import {TextArea} from "src";

import "./TextAreaView.less";

export default class TextAreaView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      readOnly: false,
      required: false,
      inputValue: "",
    };
  }

  render() {
    const {cssClass} = TextAreaView;

    return (
      <View className={cssClass.CONTAINER} title="TextArea">
        <Example
          code={`
            <TextArea
              disabled={this.state.disabled}
              name="TextAreaName"
              label="TextArea Label"
              readOnly={this.state.readOnly}
              required={this.state.required}
              spellCheck={this.state.spellCheck}
              placeholder="TextArea Placeholder"
              onChange={e => this.setState({inputValue: e.target.value})}
              value={this.state.inputValue}
            />
          `}
        >
          <div>
            <TextArea
              disabled={this.state.disabled}
              name="TextAreaName"
              label="TextArea Label"
              readOnly={this.state.readOnly}
              required={this.state.required}
              optional={this.state.optional}
              spellCheck={this.state.spellCheck}
              placeholder="TextArea Placeholder"
              onChange={e => this.setState({inputValue: e.target.value})}
              value={this.state.inputValue}
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
              checked={this.state.optional}
              onChange={({target}) => this.setState({optional: target.checked})}
              disabled={this.state.required}
            />
            {" "}
            Optional
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.required}
              onChange={({target}) => this.setState({required: target.checked})}
              disabled={this.state.optional}
            />
            {" "}
            Required
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.spellCheck}
              onChange={({target}) => this.setState({spellCheck: target.checked})}
            />
            {" "}
            Spell Check
          </label>
        </Example>
      </View>
    );
  }

}

TextAreaView.cssClass = {
  CONFIG: "TextAreaView--config",
  CONTAINER: "TextAreaView",
};
