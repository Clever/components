import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { MessagingInput, Label } from "src";

import "./MessagingInputView.less";

const cssClass = {
  BETA: "MessagingInputView--beta",
  CONFIG_CONTAINER: "MessagingInputView--configContainer",
  CONFIG_OPTIONS: "MessagingInputView--configOptions",
  CONFIG: "MessagingInputView--config",
  CONFIG_TOGGLE: "MessagingInputView--configToggle",
  CONTAINER: "MessagingInputView",
  INTRO: "MessagingInputView--intro",
  PROPS: "MessagingInputView--props",
};

export default class MessagingInputView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    inputValue: "",
  };

  render() {
    const { inputValue } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="MessagingInput"
        sourcePath="src/MessagingInput/MessagingInput.tsx"
      >
        <header className={cssClass.INTRO}>
          <p className={cssClass.BETA}>
            <Label color="new-feature">Beta</Label> MessagingInput is in Beta and breaking changes
            may still be introduced.
          </p>
          <p>
            MessagingInput is an input to be used for entering and submitting text for messaging.
          </p>
          <CodeSample>
            {`
              import {MessagingInput} from "clever-components";
              // OR
              import MessagingInput from "clever-components/dist/MessagingInput"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <MessagingInput
              value={inputValue}
              onChange={newValue => this.setState({ inputValue: newValue })}
              onSubmit={message => {
                // eslint-disable-next-line no-alert
                alert(message);
                this.setState({ inputValue: "" });
              }}
            />
          </ExampleCode>
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<MessagingInput /> Props"
        availableProps={[
          {
            name: "value",
            type: "string",
            description: "The text that's been entered in the MessagingInput.",
          },
          {
            name: "onChange",
            type: "(newValue: string) => void",
            description: "Function that's called when the inputted text changes.",
          },
          {
            name: "onSubmit",
            type: "(message: string) => void",
            description: "Function that's called when the text is submitted.",
          },
          {
            name: "onBlur",
            type: "() => void",
            description: "Function that's called when the input is unfocused.",
            optional: true,
          },
          {
            name: "ref",
            type: "React.Ref<TextArea>",
            description: "Allows getting a ref to the underlying TextArea.",
            optional: true,
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
