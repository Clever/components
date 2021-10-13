import * as React from "react";
import { Link } from "react-router";
import FontAwesome from "react-fontawesome";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { TextInput2, Select2, FlexBox, ItemAlign, SegmentedControl, Label } from "src";
import { FormElementSize, FormElementRequirement } from "../../src/utils/Forms";

import "./Select2View.less";

const cssClass = {
  CONFIG_CONTAINER: "Select2View--configContainer",
  CONFIG_OPTIONS: "Select2View--configOptions",
  CONFIG: "Select2View--config",
  CONFIG_LABEL_TEXT: "Select2View--configLabelText",
  CONFIG_TOGGLE: "Select2View--configToggle",
  CONTAINER: "Select2View",
  INTRO: "Select2View--intro",
  PROPS: "Select2View--props",
};

export default class Select2View extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    label: "Select an option",
    hideLabel: false,
    clearable: true,
    creatable: false,
    requirement: FormElementRequirement.REQUIRED,
    initialIsInError: false,
    value: null,
    size: FormElementSize.MEDIUM,
  };

  render() {
    return (
      <View className={cssClass.CONTAINER} title="Select2" sourcePath="src/Select2/Select2.tsx">
        <header className={cssClass.INTRO}>
          <p className={cssClass.BETA}>
            <Label color="new-feature">Beta</Label> Select2 is in Beta. Complete functionality isn't
            available yet and breaking changes may still be introduced.
          </p>
          <p>Updated design for Select component</p>
          <p>
            The updated multi-item select component is{" "}
            <Link to="/components/multi-select">&lt;MultiSelect&gt;</Link>{" "}
          </p>
          <CodeSample>
            {`
              import {Select2} from "clever-components";
              // OR
              import Select2 from "clever-components/dist/Select2"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <Select2
              className="my--custom--class"
              name="Select2View--Select2"
              label={this.state.label}
              hideLabel={this.state.hideLabel}
              options={new Array(20).fill(0).map((_, i) => ({
                label: `Option ${i + 1}`,
                customLabel: (
                  <FlexBox>
                    <FontAwesome style={{ marginRight: "8px" }} name="exclamation-triangle" />
                    <span>Option {i + 1}</span>
                  </FlexBox>
                ),
                value: `option_${i + 1}_value`,
              }))}
              clearable={this.state.clearable}
              creatable={this.state.creatable}
              requirement={this.state.requirement}
              initialIsInError={this.state.initialIsInError}
              onChange={(v) => {
                console.log(`selected: ${v}`);
                this.setState({ value: v });
              }}
              value={this.state.value}
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
      value,
      hideLabel,
      clearable,
      creatable,
      requirement,
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
          <span className={cssClass.CONFIG_LABEL_TEXT}>Hide Label</span>
        </label>
        <div className={cssClass.CONFIG}>
          <span className={cssClass.CONFIG_LABEL_TEXT}>Controlled selected value:</span>
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            options={[
              { content: "Empty", value: "" },
              { content: "Option 1", value: "option_1_value" },
              { content: "Option 4", value: "option_4_value" },
              { content: "Option 20", value: "option_20_value" },
            ]}
            value={value}
            onSelect={(v) => this.setState({ value: v })}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={clearable}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ clearable: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_LABEL_TEXT}>Clearable</span>
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={creatable}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ creatable: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_LABEL_TEXT}>Creatable</span>
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
            onSelect={(v) => this.setState({ requirement: v })}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            className={cssClass.CONFIG_TOGGLE}
            checked={initialIsInError}
            onChange={(e) => this.setState({ initialIsInError: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_LABEL_TEXT}>Initial error</span>
        </label>
        <div className={cssClass.CONFIG}>
          <span className={cssClass.CONFIG_LABEL_TEXT}>Size:</span>
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            options={[
              { content: "small", value: FormElementSize.SMALL },
              { content: "medium", value: FormElementSize.MEDIUM },
              { content: "large", value: FormElementSize.LARGE },
              { content: "full-width", value: FormElementSize.FULL_WIDTH },
            ]}
            value={size}
            onSelect={(v) => this.setState({ size: v })}
          />
        </div>
      </FlexBox>
    );
  }

  // TODO: Update prop documentation.
  _renderProps() {
    return (
      <PropDocumentation
        title="<Select2 /> Props"
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
            name: "hideLabel",
            type: "Boolean",
            description:
              "Hide label for visual purposes only (will still be available to screen readers)",
            optional: true,
          },
          {
            name: "options",
            type: <code>{"Array<{ value: string, label: string, customLabel?: ReactNode }>"}</code>,
            description: (
              <div>
                List of options to be selected.
                <ul>
                  <li>'value' is the hidden string key</li>
                  <li>
                    'label' is used for what is displayed and used for searchability if customLabel
                    is present
                  </li>
                  <li>customLabel is an optional react node for custom rendering</li>
                </ul>
                Note that for accessibility purposes, a selected item will be represented by its
                'label' value in the input once it is selected
              </div>
            ),
            optional: true,
          },
          {
            name: "clearable",
            type: "boolean",
            description: "If the value chosen is allowed to be clearable",
            optional: true,
          },
          {
            name: "creatable",
            type: "boolean",
            description:
              "If new options are allowed to be created (if input text does not match any existing options)",
            optional: true,
          },
          {
            name: "requirement",
            type: '"required", "optional", or "disabled"',
            description: "Indicator to note if the input is required",
            optional: true,
          },
          {
            name: "initialIsInError",
            type: "boolean",
            description: "Initialize the component in an error state",
            optional: true,
          },
          {
            name: "value",
            type: "string",
            description:
              "Set the selected value as a controlled component (also helpful for default states). This must match one of the option's values. Set to null to unselect ",
          },
          {
            name: "onChange",
            type: <code>{"(value: string) => void"}</code>,
            description: "Called when an option is selected",
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
