import React, { Component } from "react";

import Example, { ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Number, SegmentedControl } from "src";

import "./NumberView.less";

export default class NumberView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      format: "regular",
    };
  }

  render() {
    const { cssClass } = NumberView;
    const { format } = this.state;

    const shouldShorten = format === "short";
    const arrow = <span className="fa fa-long-arrow-right" />;

    return (
      <View className={cssClass.CONTAINER} title="Number" sourcePath="src/Number/Number.tsx">
        <p>Provides consistent number formatting for long numbers, with optional shortening.</p>

        <Example title="Short numbers are left unchanged:">
          <div className={cssClass.DEMO_CONTAINER}>
            <ExampleCode>
              <div className={cssClass.EXAMPLE}>
                <p>
                  8 {arrow} <Number short={shouldShorten}>{8}</Number>
                </p>
                <p>
                  999 {arrow} <Number short={shouldShorten}>{999}</Number>
                </p>
              </div>
            </ExampleCode>
          </div>
          <div className={cssClass.CONFIG_CONTAINER}>
            <div className={cssClass.CONFIG}>
              Format:
              <SegmentedControl
                className={cssClass.CONFIG_OPTIONS}
                value={format}
                onSelect={(value) => this.setState({ format: value })}
                options={[
                  { content: "Regular", value: "regular" },
                  { content: "Short", value: "short" },
                ]}
              />
            </div>
          </div>
        </Example>

        <Example title="Formatting kicks in starting at 1000:">
          <div className={cssClass.DEMO_CONTAINER}>
            <ExampleCode>
              <div className={cssClass.EXAMPLE}>
                <p>
                  1000 {arrow} <Number short={shouldShorten}>{1000}</Number>
                </p>
                <p>
                  907312456 {arrow} <Number short={shouldShorten}>{907312456}</Number>
                </p>
                <p>
                  7089123456 {arrow} <Number short={shouldShorten}>{7089123456}</Number>
                </p>
              </div>
            </ExampleCode>
          </div>
          <div className={cssClass.CONFIG_CONTAINER}>
            <div className={cssClass.CONFIG}>
              Format:
              <SegmentedControl
                className={cssClass.CONFIG_OPTIONS}
                value={format}
                onSelect={(value) => this.setState({ format: value })}
                options={[
                  { content: "Regular", value: "regular" },
                  { content: "Short", value: "short" },
                ]}
              />
            </div>
          </div>
        </Example>

        <Example title="Numbers can be specified as text, as long as they can be parsed as integers:">
          <div className={cssClass.DEMO_CONTAINER}>
            <ExampleCode>
              <div className={cssClass.EXAMPLE}>
                <p>
                  5678 {arrow} <Number short={shouldShorten}>5678</Number>
                </p>
                <p>
                  1234567 {arrow} <Number short={shouldShorten}>{"1234567"}</Number>
                </p>
              </div>
            </ExampleCode>
          </div>
          <div className={cssClass.CONFIG_CONTAINER}>
            <div className={cssClass.CONFIG}>
              Format:
              <SegmentedControl
                className={cssClass.CONFIG_OPTIONS}
                value={format}
                onSelect={(value) => this.setState({ format: value })}
                options={[
                  { content: "Regular", value: "regular" },
                  { content: "Short", value: "short" },
                ]}
              />
            </div>
          </div>
        </Example>

        <Example title="Formatting can be done directly, without rendering the component:">
          <div className={cssClass.DEMO_CONTAINER}>
            <ExampleCode>
              <div className={cssClass.EXAMPLE}>
                <p>
                  12345 {arrow} {Number.format(12345, shouldShorten)}
                </p>
              </div>
            </ExampleCode>
            This may be useful in cases where a plain string is needed (e.g. when assigning a prop
            that requires a string value).
          </div>
          <div className={cssClass.CONFIG_CONTAINER}>
            <div className={cssClass.CONFIG}>
              Format:
              <SegmentedControl
                className={cssClass.CONFIG_OPTIONS}
                value={format}
                onSelect={(value) => this.setState({ format: value })}
                options={[
                  { content: "Regular", value: "regular" },
                  { content: "Short", value: "short" },
                ]}
              />
            </div>
          </div>
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "children",
              type: "number or string",
              description: "The number (or string representation thereof).",
              defaultValue: "0",
            },
            {
              name: "className",
              type: "string",
              description: "Optional additional classname to apply to the number span.",
            },
            {
              name: "short",
              type: "bool",
              description: "Whether or not long numbers should be shortened.",
              defaultValue: "false",
            },
          ]}
          className={cssClass.PROPS}
        />
      </View>
    );
  }
}

NumberView.cssClass = {
  CONFIG_CONTAINER: "NumberView--configContainer",
  CONFIG_OPTIONS: "NumberView--configOptions",
  CONFIG: "NumberView--config",
  CONTAINER: "NumberView",
  DEMO_CONTAINER: "NumberView--demoContainer",
  EXAMPLE: "NumberView--example",
  FOCUS_CONTROL: "NumberView--focusControl",
  LABEL: "NumberView--number",
  PROPS: "NumberView--props",
};
