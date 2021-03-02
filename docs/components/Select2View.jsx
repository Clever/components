import * as React from "react";
import { Link } from "react-router";
import FontAwesome from "react-fontawesome";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {
  TextInput2,
  TextInput2Requirement,
  Select2,
  FlexBox,
  ItemAlign,
  SegmentedControl,
  Label,
} from "src";
import { FormElementSize } from "../../src/utils/Forms";

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
    size: FormElementSize.MEDIUM,
  };

  render() {
    const { optionToggle1 } = this.state;

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
              clearable={this.state.clearable}
              options={new Array(20).fill(0).map((_, i) => ({
                value: `Option ${i + 1}`,
                content: (
                  <FlexBox>
                    <FontAwesome style={{ marginRight: "8px" }} name="exclamation-triangle" />
                    <span>Option {i + 1}</span>
                  </FlexBox>
                ),
              }))}
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

  // TODO: Update or remove config options.
  _renderConfig() {
    const { label, hideLabel, clearable, size } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          <TextInput2
            className={cssClass.CONFIG_OPTIONS}
            name="TextInput2View--labelTextInput"
            label="Label text"
            requirement={TextInput2Requirement.REQUIRED}
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
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={clearable}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ clearable: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_LABEL_TEXT}>Clearable</span>
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
            type: <code>{"Array<{ value: string, content?: ReactNode }>"}</code>,
            description:
              "List of options to be selected. 'value' is the string key and used for searchability, 'content' is an optional react node for custom rendering",
            optional: true,
          },
          {
            name: "clearable",
            type: "boolean",
            description: "If the value chosen is allowed to be clearable",
            optional: true,
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
