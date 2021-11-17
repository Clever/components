import _ from "lodash";
import classnames from "classnames";
import loremIpsum from "lorem-ipsum";
import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

import Example, { ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { SegmentedControl, Tooltip } from "src";

import "./TooltipView.less";

export default class TooltipView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placement: Tooltip.Placement.RIGHT,
      textAlign: Tooltip.Align.LEFT,
      disabled: false,
    };
  }

  render() {
    const { cssClass } = TooltipView;
    const { placement, textAlign, disabled } = this.state;

    return (
      <View className={cssClass.CONTAINER} title="Tooltip" sourcePath="src/Tooltip/Tooltip.tsx">
        <Example>
          <div className={cssClass.DEMO_CONTAINER}>
            <ExampleCode>
              <div className={cssClass.EXAMPLE}>
                Simple{" "}
                <Tooltip
                  content="Here is a simple tooltip."
                  placement={placement}
                  textAlign={textAlign}
                  hide={disabled}
                >
                  <FontAwesome className={cssClass.TRIGGER} name="question-circle" />
                </Tooltip>
              </div>
              <div className={cssClass.EXAMPLE}>
                HTML + long text{" "}
                <Tooltip
                  content={
                    <div>
                      Here is a tooltip with long text to demonstrate wrapping and HTML formatting.
                      <br />
                      <br />
                      {loremIpsum({ count: 3, units: "sentences" })}
                    </div>
                  }
                  placement={placement}
                  textAlign={textAlign}
                  hide={disabled}
                >
                  <FontAwesome className={cssClass.TRIGGER} name="question-circle" />
                </Tooltip>
              </div>
              <div className={cssClass.EXAMPLE}>
                With clickable trigger{" "}
                <Tooltip
                  content="Tooltips triggered by clicks stay open."
                  placement={placement}
                  textAlign={textAlign}
                  hide={disabled}
                  clickTrigger
                >
                  <FontAwesome className={cssClass.TRIGGER} name="question-circle" />
                </Tooltip>
              </div>
            </ExampleCode>
          </div>
          <div className={cssClass.CONFIG}>
            Placement:
            <SegmentedControl
              className={cssClass.CONFIG_OPTIONS}
              defaultValue={placement}
              onSelect={(value) => this.setState({ placement: value })}
              options={_.map(Tooltip.Placement, (p) => ({ content: p, value: p }))}
            />
          </div>
          <div className={cssClass.CONFIG}>
            Text alignment:
            <SegmentedControl
              className={cssClass.CONFIG_OPTIONS}
              defaultValue={textAlign}
              onSelect={(value) => this.setState({ textAlign: value })}
              options={_.map(Tooltip.Align, (p) => ({ content: p, value: p }))}
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
          <div className={cssClass.ACCESSIBILITY_NOTICE}>
            For accessibility reasons, all tooltips are also triggered by focus. Press the tab key
            to move focus throughout the page.
          </div>
        </Example>
        <PropDocumentation
          availableProps={[
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the InfoPanel",
              optional: true,
            },
            {
              name: "tooltipClassName",
              type: "String",
              description: "Additional classname to apply to the tooltip",
              optional: true,
            },
            {
              name: "children",
              type: "Node",
              description:
                "A single element to serve as a trigger for the tooltip. Must support " +
                "passthrough props to work properly.",
            },
            {
              name: "content",
              type: "Node",
              description: "The string or HTML tooltip content.",
            },
            {
              name: "placement",
              type: "Tooltip.Placement",
              description: "Placement of the tooltip, relative to the trigger element.",
              defaultValue: "Tooltip.Placement.RIGHT",
            },
            {
              name: "textAlign",
              type: "Tooltip.Align",
              description: "Alignment of the tooltip text content.",
              defaultValue: "Tooltip.Align.LEFT",
            },
            {
              name: "delayMs",
              type: "number",
              description: "Number of ms to wait before showing the tooltip",
              defaultValue: 0,
            },
            {
              name: "delayHideMs",
              type: "number",
              description: "Number of ms to wait before hiding the tooltip",
              defaultValue: 0,
            },
            {
              name: "hide",
              type: "boolean",
              description: "Disable the tooltip",
              defaultValue: false,
            },
            {
              name: "clickTrigger",
              type: "boolean",
              description: "Click to open the tooltip",
              defaultValue: false,
            },
          ]}
          className={cssClass.PROPS}
        />
      </View>
    );
  }
}

TooltipView.cssClass = {
  CONFIG_OPTIONS: "TooltipView--configOptions",
  CONFIG: "TooltipView--config",
  CONTAINER: "TooltipView",
  DEMO_CONTAINER: "TooltipView--demoContainer",
  EXAMPLE: "TooltipView--example",
  ACCESSIBILITY_NOTICE: "TooltipView--accessibilityNotice",
  PROPS: "TooltipView--props",
  TRIGGER: "TooltipView--tooltipTrigger",
};
