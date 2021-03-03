import * as React from "react";
import { Link } from "react-router";
import FontAwesome from "react-fontawesome";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { TextInput2, MultiSelect, FlexBox, ItemAlign, SegmentedControl, Label } from "src";
import { FormElementSize, FormElementRequirement } from "../../src/utils/Forms";

import "./MultiSelectView.less";

const cssClass = {
  CONFIG_CONTAINER: "MultiSelectView--configContainer",
  CONFIG_OPTIONS: "MultiSelectView--configOptions",
  CONFIG: "MultiSelectView--config",
  CONFIG_LABEL_TEXT: "MultiSelectView--configLabelText",
  CONFIG_TOGGLE: "MultiSelectView--configToggle",
  CONTAINER: "MultiSelectView",
  INTRO: "MultiSelectView--intro",
  PROPS: "MultiSelectView--props",
};

export default class MultiSelectView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    label: "Choose an option",
    hideLabel: false,
    placeholder: "Select or create options",
    creatable: false,
    allowDuplicates: false,
    size: FormElementSize.MEDIUM,
  };

  render() {
    return (
      <View
        className={cssClass.CONTAINER}
        title="MultiSelect"
        sourcePath="src/MultiSelect/MultiSelect.tsx"
      >
        <header className={cssClass.INTRO}>
          <p className={cssClass.BETA}>
            <Label color="new-feature">Beta</Label> MultiSelect is in Beta. Complete functionality
            isn't available yet and breaking changes may still be introduced.
          </p>
          <p>Updated design for Select component with multi-select option</p>
          <p>
            The updated single-item select component is{" "}
            <Link to="/components/select-2">&lt;Select2&gt;</Link>{" "}
          </p>
          <CodeSample>
            {`
              import {MultiSelect} from "clever-components";
              // OR
              import MultiSelect from "clever-components/dist/MultiSelect"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <MultiSelect
              className="my--custom--class"
              name="MultiSelectView--MultiSelect"
              label={this.state.label}
              hideLabel={this.state.hideLabel}
              placeholder={this.state.placeholder}
              options={new Array(20).fill(0).map((_, i) => ({
                value: `Option ${i + 1}`,
                content: (
                  <FlexBox>
                    <FontAwesome style={{ marginRight: "8px" }} name="exclamation-triangle" />
                    <span>Option {i + 1}</span>
                  </FlexBox>
                ),
              }))}
              creatable={this.state.creatable}
              allowDuplicates={this.state.allowDuplicates}
              onChange={console.log}
              size={this.state.size}
            />
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  // TODO:Update or remove config options.
  _renderConfig() {
    const { label, hideLabel, placeholder, creatable, allowDuplicates, size } = this.state;

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
          <TextInput2
            className={cssClass.CONFIG_OPTIONS}
            name="TextInput2View--placeholderTextInput"
            label="Placeholder text"
            requirement={FormElementRequirement.OPTIONAL}
            onChange={(e) => this.setState({ placeholder: e.target.value })}
            value={placeholder}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            className={cssClass.CONFIG_TOGGLE}
            checked={creatable}
            onChange={(e) => this.setState({ creatable: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_LABEL_TEXT}>creatable</span>
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            className={cssClass.CONFIG_TOGGLE}
            checked={allowDuplicates}
            onChange={(e) => this.setState({ allowDuplicates: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_LABEL_TEXT}>allow duplicates</span>
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
            onSelect={(value) => this.setState({ size: value })}
          />
        </div>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<MultiSelect /> Props"
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
            name: "placeholder",
            type: "String",
            description: "Placeholder text",
            optional: true,
          },
          {
            name: "options",
            type: <code>{"Array<{ value: string, content?: ReactNode }>"}</code>,
            description:
              "List of options to be selected. 'value' is the string key and used for searchability, 'content' is an optional react node for custom rendering",
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
            name: "onChange",
            type: (
              <code>{"(selectedItems: { value: string, content?: ReactNode }[]) => void"}</code>
            ),
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
