import * as React from "react";

import Example, {CodeSample, ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {Heading, FlexBox, ItemAlign, SegmentedControl} from "src";

import "./HeadingView.less";

const cssClass = {
  CONFIG_CONTAINER: "HeadingView--configContainer",
  CONFIG_OPTIONS: "HeadingView--configOptions",
  CONFIG: "HeadingView--config",
  CONFIG_TOGGLE: "HeadingView--configToggle",
  CONTAINER: "HeadingView",
  INTRO: "HeadingView--intro",
  PROPS: "HeadingView--props",
};

export default class HeadingView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    multiOption1: "small",
    optionToggle1: false,
    optionToggle2: true,
  };

  render() {
    const {optionToggle1} = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="Heading"
        sourcePath="src/Heading/Heading.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>TODO: Describe your component/state it's purpose</p>
          <p>TODO(optional): Describe scenarios where the component might be useful.</p>
          <CodeSample>
            {`
              import {Heading} from "clever-components";
              // OR
              import Heading from "clever-components/dist/Heading"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <Heading className="my--custom--class" onPerformAction={console.log}>
              {optionToggle1 ? "Something changed 🤔" : "My custom content."}
            </Heading>
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  // TODO: Update or remove config options.
  _renderConfig() {
    const {multiOption1, optionToggle1, optionToggle2} = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Size:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({multiOption1: value})}
            options={[
              {content: "Small", value: "small"},
              {content: "Medium", value: "medium"},
              {content: "Large", value: "large"},
            ]}
            value={multiOption1}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={optionToggle1}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({optionToggle1: e.target.checked})}
          />{" "}
          Option Toggle 1
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={optionToggle2}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({optionToggle2: e.target.checked})}
          />{" "}
          Option Toggle 2
        </label>
      </FlexBox>
    );
  }

  // TODO: Update prop documentation.
  _renderProps() {
    return (
      <PropDocumentation
        title="<Heading /> Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "Heading content.",
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
