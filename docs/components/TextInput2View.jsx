import * as React from "react";
import FontAwesome from "react-fontawesome";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { TextInput2, FlexBox, ItemAlign, SegmentedControl, Label } from "src";
import { FormElementSize } from "../../src/utils/Forms";

import "./TextInput2View.less";

const cssClass = {
  CONFIG_CONTAINER: "TextInput2View--configContainer",
  CONFIG_OPTIONS: "TextInput2View--configOptions",
  CONFIG: "TextInput2View--config",
  CONFIG_TOGGLE: "TextInput2View--configToggle",
  CONTAINER: "TextInput2View",
  INTRO: "TextInput2View--intro",
  PROPS: "TextInput2View--props",
};

export default class TextInput2View extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    value: "",
    label: "example label",
    placeholder: "example placeholder",
    helpText: "example help text",
    showIcon: false,
    requirement: "optional",
    size: FormElementSize.MEDIUM,
  };

  render() {
    return (
      <View
        className={cssClass.CONTAINER}
        title="TextInput2"
        sourcePath="src/TextInput2/TextInput2.tsx"
      >
        <header className={cssClass.INTRO}>
          <p className={cssClass.BETA}>
            <Label color="new-feature">Beta</Label> TextInput2 is in Beta. Complete functionality
            isn't available yet and breaking changes may still be introduced.
          </p>
          <p>Updated design for TextInput component</p>
          <p>This is your standard &lt;input&gt; component.</p>
          <CodeSample>
            {`
              import {TextInput2} from "clever-components";
              // OR
              import TextInput2 from "clever-components/dist/TextInput2"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <TextInput2
              className="my--custom--class"
              name="TextInput2--input"
              label={this.state.label}
              icon={this.state.showIcon ? <FontAwesome name="calendar" /> : null}
              helpText={this.state.helpText}
              placeholder={this.state.placeholder}
              requirement={this.state.requirement}
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
              size={this.state.size}
            />
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { label, placeholder, helpText, showIcon, requirement, size } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          <TextInput2
            className={cssClass.CONFIG_OPTIONS}
            name="TextInput2View--labelTextInput"
            label="Label text"
            requirement="required"
            onChange={(e) => this.setState({ label: e.target.value })}
            value={label}
          />
        </div>
        <div className={cssClass.CONFIG}>
          <TextInput2
            className={cssClass.CONFIG_OPTIONS}
            name="TextInput2View--placeholderTextInput"
            label="Placeholder text"
            requirement="optional"
            onChange={(e) => this.setState({ placeholder: e.target.value })}
            value={placeholder}
          />
        </div>
        <div className={cssClass.CONFIG}>
          <TextInput2
            className={cssClass.CONFIG_OPTIONS}
            name="TextInput2View--helpTextInput"
            label="Help text"
            requirement="optional"
            onChange={(e) => this.setState({ helpText: e.target.value })}
            value={helpText}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showIcon}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ showIcon: e.target.checked })}
          />{" "}
          Show Icon
        </label>
        <div className={cssClass.CONFIG}>
          Requirement:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            options={[
              { content: "none", value: "" },
              { content: "optional", value: "optional" },
              { content: "required", value: "required" },
            ]}
            value={requirement}
            onSelect={(value) => this.setState({ requirement: value })}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Size:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            options={[
              { content: "small", value: FormElementSize.SMALL },
              { content: "medium", value: FormElementSize.MEDIUM },
              { content: "large", value: FormElementSize.LARGE },
              { content: "full-width", value: FormElementSize.FULL_WIDTH },
            ]}
            value={size}
            onSelect={(value) => this.setState({ size: value })}
          />
        </div>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<TextInput2 /> Props"
        availableProps={[
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "name",
            type: "String",
            description:
              "Name for input element which will also be used as the id for the label to reference",
          },
          {
            name: "label",
            type: "React Node",
            description: "Label text",
          },
          {
            name: "placeholder",
            type: "String",
            description: "Placeholder text",
            optional: true,
          },
          {
            name: "helpText",
            type: "String",
            description: "Help text",
            optional: true,
          },
          {
            name: "icon",
            type: "React Node",
            description: "Custom icon that shows up to the left of the input text",
            optional: true,
          },
          {
            name: "requirement",
            type: '"required" or "optional"',
            description: "Indicator to note if the input is required or optional",
            optional: true,
          },
          {
            name: "value",
            type: "String",
            description: "Value of the input text",
          },
          {
            name: "onChange",
            type: "Function",
            description: "Called when value of input changes",
          },
          {
            name: "size",
            type: "string",
            description: (
              <p>
                The size of the input. One of:
                <br />
                {Object.keys(FormElementSize).map((size) => (
                  <span key={size}>
                    <code>FormElementSize.{size}</code>
                    <br />
                  </span>
                ))}
              </p>
            ),
            optional: true,
            defaultValue: <code>FormElementSize.FULL_WIDTH</code>,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
