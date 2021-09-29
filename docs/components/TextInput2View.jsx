import * as React from "react";
import FontAwesome from "react-fontawesome";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { TextInput2, FlexBox, ItemAlign, SegmentedControl, Label } from "src";
import { FormElementSize, FormElementRequirement } from "../../src/utils/Forms";

import "./TextInput2View.less";

const cssClass = {
  CONFIG_CONTAINER: "TextInput2View--configContainer",
  CONFIG_OPTIONS: "TextInput2View--configOptions",
  CONFIG: "TextInput2View--config",
  CONFIG_TEXT: "TextInput2View--configText",
  CONFIG_TOGGLE: "TextInput2View--configToggle",
  CONTAINER: "TextInput2View",
  INTRO: "TextInput2View--intro",
  PROPS: "TextInput2View--props",
};

export default class TextInput2View extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    value: "",
    label: "Username",
    hideLabel: false,
    placeholder: "kstark",
    helpText: "first name and last initial",
    showIcon: false,
    requirement: FormElementRequirement.REQUIRED,
    obscurable: false,
    initialIsInError: false,
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
              hideLabel={this.state.hideLabel}
              icon={this.state.showIcon ? <FontAwesome name="calendar" /> : null}
              helpText={this.state.helpText}
              placeholder={this.state.placeholder}
              requirement={this.state.requirement}
              obscurable={this.state.obscurable}
              value={this.state.value}
              initialIsInError={this.state.initialIsInError}
              errorValidation={(value) => (value.toLowerCase() !== value ? "only lowercase" : null)}
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
    const {
      label,
      hideLabel,
      placeholder,
      helpText,
      showIcon,
      requirement,
      obscurable,
      initialIsInError,
      size,
    } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          <TextInput2
            className={cssClass.CONFIG_OPTIONS}
            name="TextInput2View--labelTextInput"
            label="Label text"
            requirement={FormElementRequirement.REQUIRED}
            onChange={(e) => this.setState({ label: e.target.value })}
            value={label}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            className={cssClass.CONFIG_TOGGLE}
            checked={hideLabel}
            onChange={(e) => this.setState({ hideLabel: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_TEXT}>Hide Label</span>
        </label>
        <div className={cssClass.CONFIG}>
          <TextInput2
            className={cssClass.CONFIG_OPTIONS}
            name="TextInput2View--placeholderTextInput"
            label="Placeholder text"
            requirement={FormElementRequirement.OPTIONAL}
            onChange={(e) => this.setState({ placeholder: e.target.value })}
            value={placeholder}
          />
        </div>
        <div className={cssClass.CONFIG}>
          <TextInput2
            className={cssClass.CONFIG_OPTIONS}
            name="TextInput2View--helpTextInput"
            label="Help text"
            requirement={FormElementRequirement.OPTIONAL}
            onChange={(e) => this.setState({ helpText: e.target.value })}
            value={helpText}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            className={cssClass.CONFIG_TOGGLE}
            checked={showIcon}
            onChange={(e) => this.setState({ showIcon: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_TEXT}>Show Icon</span>
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            className={cssClass.CONFIG_TOGGLE}
            checked={obscurable}
            onChange={(e) => this.setState({ obscurable: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_TEXT}>Obscurable</span>
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            className={cssClass.CONFIG_TOGGLE}
            checked={initialIsInError}
            onChange={(e) => this.setState({ initialIsInError: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_TEXT}>Initial error</span>
        </label>
        <div className={cssClass.CONFIG}>
          <span className={cssClass.CONFIG_TEXT}>Requirement:</span>
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            options={[
              { content: "none", value: "" },
              { content: "optional", value: FormElementRequirement.OPTIONAL },
              { content: "required", value: FormElementRequirement.REQUIRED },
              { content: "disabled", value: FormElementRequirement.DISABLED },
            ]}
            value={requirement}
            onSelect={(value) => this.setState({ requirement: value })}
          />
        </div>
        <div className={cssClass.CONFIG}>
          <span className={cssClass.CONFIG_TEXT}>Size:</span>
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
            type: "String",
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
            name: "hideLabel",
            type: "Boolean",
            description:
              "Hide label for visual purposes only (will still be available to screen readers)",
            optional: true,
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
            type: '"required", "optional", or "disabled"',
            description: "Indicator to note if the input is required, optional, or disabled",
            optional: true,
          },
          {
            name: "obscurable",
            type: "boolean",
            description: "Obscure input with hide/show toggle",
            optional: true,
          },
          {
            name: "initialIsInError",
            type: "boolean",
            description: "Intialize the component in an error state",
            optional: true,
          },
          {
            name: "errorValidation",
            type: "Function",
            description:
              "Any custom validation that you want on the input. Returns null for no error, otherwise returns a string as an error message to be displayed",
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
            name: "onFocus",
            type: "Function",
            description: "Called when focus is placed on the input",
            optional: true,
          },
          {
            name: "onBlur",
            type: "Function",
            description: "Called when focus is removed from the input",
            optional: true,
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
