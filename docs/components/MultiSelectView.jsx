import * as React from "react";
import FontAwesome from "react-fontawesome";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { MultiSelect, FlexBox, ItemAlign, Label, SegmentedControl } from "src";
import { FormElementSize } from "../../src/utils/Forms";

import "./MultiSelectView.less";

const cssClass = {
  CONFIG_CONTAINER: "MultiSelectView--configContainer",
  CONFIG_OPTIONS: "MultiSelectView--configOptions",
  CONFIG: "MultiSelectView--config",
  CONFIG_TOGGLE: "MultiSelectView--configToggle",
  CONTAINER: "MultiSelectView",
  INTRO: "MultiSelectView--intro",
  PROPS: "MultiSelectView--props",
};

export default class MultiSelectView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    creatable: false,
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
          <p>TODO: Describe your component/state it's purpose</p>
          <p>TODO(optional): Describe scenarios where the component might be useful.</p>
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
              label="Example label"
              placeholder="Select multiple items"
              items={new Array(20).fill(0).map((_, i) => ({
                key: `${i + 1}`,
                stringValue: `Option ${i + 1}`,
                value: (
                  <FlexBox>
                    <FontAwesome name="exclamation-triangle" />
                    <span>Option {i + 1}</span>
                  </FlexBox>
                ),
              }))}
              creatable={this.state.creatable}
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
    const { creatable, size } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            className={cssClass.CONFIG_TOGGLE}
            checked={creatable}
            onChange={(e) => this.setState({ creatable: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_TEXT}>creatable</span>
        </label>
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

  // TODO: Update prop documentation.
  _renderProps() {
    return (
      <PropDocumentation
        title="<MultiSelect /> Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "MultiSelect content.",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "onPerformAction",
            type: "Function",
            description: "Handler function for the performAction event.",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
