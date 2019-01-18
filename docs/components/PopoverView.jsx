import _ from "lodash";
import React, {Component} from "react";

import Example, {CodeSample, ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {Button, SegmentedControl, Popover} from "src";

import "./PopoverView.less";


export default class PopoverView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placement: Popover.Placement.RIGHT,
      title: false,
    };
  }

  render() {
    const {cssClass} = PopoverView;
    const {placement, title} = this.state;

    const sampleContent = (
      <div>
        <div>Here is a popover with a lot of informational content. </div>
        <ul>
          <li> Snorkel Star</li>
          <li> Rock Star </li>
          <li> Explorer Star </li>
          </ul>
      </div>
    );
    return (
      <View className={cssClass.CONTAINER} title="Popover">
        <header className={cssClass.INTRO}>
          <p>
          If you want to add any additional content, interactions, or content more than about a line, use a popover.

          If you want to give a small few word hint on how or what an element on the page does use a <a href="/#/components/tooltip">
              <code>Tooltip</code>
            </a>.
          </p>
          <CodeSample>
            {`
              import {Popover} from "clever-components";
              // OR
              import Popover from "clever-components/dist/Popover"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>
        <Example title="Basic Usage:">
          <div className={cssClass.DEMO_CONTAINER}>
            <ExampleCode>
              <div className={cssClass.EXAMPLE}>
                <Popover
                  content={sampleContent}
                  placement={placement}
                  title={title && "My popover title"}
                >
                 <Button value ="Hover Over Me" />
                </Popover>
              </div>
            </ExampleCode>

          </div>
          <div className={cssClass.CONFIG}>
            Placement:
            <SegmentedControl
              className={cssClass.CONFIG_OPTIONS}
              defaultValue={placement}
              onSelect={value => this.setState({placement: value})}
              options={_.map(Popover.Placement, p => ({content: p, value: p}))}
            />


          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.title}
              onChange={({target}) => this.setState({title: target.checked})}
            />
            {" "}
            Include title
          </label>
          </div>
        </Example>
        <PropDocumentation
          availableProps={[
            {
              name: "children",
              type: "Node",
              description:
                "A single element to serve as a trigger for the Popover. Must support " +
                "passthrough props to work properly.",
            },
            {
              name: "content",
              type: "Node",
              description: "The string or HTML Popover content.",
            },
            {
              name: "placement",
              type: "Popover.Placement",
              description: "Placement of the Popover, relative to the trigger element.",
              defaultValue: "Popover.Placement.RIGHT",
            },
            {
              name: "delayMs",
              type: "number",
              description: "Number of ms to wait before showing the Popover",
              defaultValue: 0,
            },
            {
              name: "delayHideMs",
              type: "number",
              description: "Number of ms to wait before hiding the Popover",
              defaultValue: 0,
            },
            {
              name: "title",
              type: "Node",
              description: "Include title in popover",
            },
          ]}
          className={cssClass.PROPS}
        />
      </View>
    );
  }
}

PopoverView.cssClass = {
  CONFIG_OPTIONS: "PopoverView--configOptions",
  CONFIG: "PopoverView--config",
  CONTAINER: "PopoverView",
  DEMO_CONTAINER: "PopoverView--demoContainer",
  EXAMPLE: "PopoverView--example",
  FOCUS_CONTROL: "PopoverView--focusControl",
  PROPS: "PopoverView--props",
  TRIGGER: "PopoverView--PopoverTrigger",
};
