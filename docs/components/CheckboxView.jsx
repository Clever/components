import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Checkbox, FlexBox, ItemAlign, TextInput } from "src";

import "./CheckboxView.less";

const cssClass = {
  CHECKBOX: "CheckboxView--checkbox",
  CONFIG_CONTAINER: "CheckboxView--configContainer",
  CONFIG_OPTIONS: "CheckboxView--configOptions",
  CONFIG: "CheckboxView--config",
  CONFIG_TOGGLE: "CheckboxView--configToggle",
  CONTAINER: "CheckboxView",
  INTRO: "CheckboxView--intro",
  PROPS: "CheckboxView--props",
};

export default class CheckboxView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    box1Checked: false,
    box1Label: "A checkbox",
    box1Partial: false,
    box2Checked: false,
    box2Partial: false,
    disabled: false,
  };

  render() {
    const { box1Checked, box1Label, box1Partial, box2Checked, box2Partial, disabled } = this.state;

    return (
      <View className={cssClass.CONTAINER} title="Checkbox" sourcePath="src/Checkbox/Checkbox.tsx">
        <header className={cssClass.INTRO}>
          <p>
            This is a form element that allows for single or multiple selections from a relatively
            short list of options. Standalone checkboxes have two state: checked and unchecked.
          </p>
          <ul>
            <b>Common uses:</b>
            <li>Use a checkbox for optional opt-in/out form elements.</li>
            <li>
              Use checkboxes when a user may view and select one or multiple inputs within a form
              element.
            </li>
          </ul>
          <p>
            For a list of related options that can be selected/unselected as a group, consider using{" "}
            <a href="/#/components/checkbox-group">
              <code>CheckboxGroup</code>
            </a>
            .
          </p>
          <CodeSample>
            {`
              import {Checkbox} from "clever-components";
              // OR
              import Checkbox from "clever-components/dist/Checkbox"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <Checkbox
              checked={box1Checked}
              className={cssClass.CHECKBOX}
              disabled={disabled}
              onChange={(newState) =>
                this.setState({ box1Checked: newState.checked, box1Partial: false })
              }
              partial={box1Partial}
            >
              {box1Label}
            </Checkbox>
            <Checkbox
              checked={box2Checked}
              className={cssClass.CHECKBOX}
              disabled={disabled}
              onChange={(newState) =>
                this.setState({ box2Checked: newState.checked, box2Partial: false })
              }
              partial={box2Partial}
            >
              Another checkbox
            </Checkbox>
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { disabled, box1Label, box1Partial, box2Partial } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          <TextInput
            className={cssClass.CONFIG_OPTIONS}
            onChange={(e) => this.setState({ box1Label: e.target.value })}
            label="Box 1 Label"
            name="CheckboxView--label--input"
            placeholder="Box 1 Label"
            value={box1Label}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={disabled}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ disabled: e.target.checked })}
          />{" "}
          Disabled
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={box1Partial}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ box1Partial: e.target.checked })}
          />{" "}
          Box 1 - Partial
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={box2Partial}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ box2Partial: e.target.checked })}
          />{" "}
          Box 2 - Partial
        </label>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<Checkbox /> Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "The checkbox label.",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "disabled",
            type: "bool",
            description: "Whether or not to disable interaction with/changes to the checkbox.",
            optional: true,
          },
          {
            name: "id",
            type: "string",
            description: (
              <p>
                Optional ID for the checkbox - will be included in the onChange event arguments if
                specified.
              </p>
            ),
            optional: true,
          },
          {
            name: "onChange",
            type: "Function(checkboxID: string, value: any)",
            description: (
              <p>Event handler called when the state of the checkbox is changed by the user.</p>
            ),
          },
          {
            name: "partial",
            type: "bool",
            description: (
              <p>
                Optionally enable the "partially checked" state.
                <br />
                A partially checked checkbox will move into the fully checked state when clicked by
                the user.
                <br />
                <b>NOTE:</b> Only applies to checkboxes with the <code>checked</code> prop set.
                Ignored otherwise.
              </p>
            ),
            optional: true,
          },
          {
            name: "tabIndex",
            type: "number",
            description: "Optional DOM tab index property",
            optional: true,
            defaultValue: "Browser default",
          },
          {
            name: "value",
            type: "Any",
            description: (
              <p>
                Optional value for the checkbox - will be included in the onChange event arguments
                if specified.
              </p>
            ),
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
