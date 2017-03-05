import _ from "lodash";
import classnames from "classnames";
import loremIpsum from "lorem-ipsum";
import React, {Component} from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {Button, SegmentedControl, Tooltip} from "src";

import "./TooltipView.less";


export default class TooltipView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placement: Tooltip.Placement.RIGHT,
      textAlign: Tooltip.Align.LEFT,
    };
  }

  render() {
    const {cssClass} = TooltipView;
    const {placement, textAlign} = this.state;

    return (
      <View className={cssClass.CONTAINER} title="Tooltip">
        <Example
          code={`
            <div className={cssClass.EXAMPLE}>
              Simple
              {" "}
              <Tooltip
                content="Here is a simple tooltip."
                placement={placement}
                textAlign={textAlign}
              >
                <span className={classnames("fa fa-question-circle", cssClass.TRIGGER)} />
              </Tooltip>
            </div>
            <div className={cssClass.EXAMPLE}>
              HTML + long text
              {" "}
              <Tooltip
                content={
                  <div>
                    Here is a tooltip with long text to demonstrate wrapping and HTML formatting.
                    <br />
                    <br />
                    {loremIpsum({count: 3, units: "sentences"})}
                  </div>
                }
                placement={placement}
                textAlign={textAlign}
              >
                <span className={classnames("fa fa-question-circle", cssClass.TRIGGER)} />
              </Tooltip>
            </div>
            <div className={cssClass.EXAMPLE}>
              With focusable trigger
              {" "}
              <Tooltip
                content="Tooltips can be triggered by focus as well."
                placement={placement}
                textAlign={textAlign}
              >
                <span
                  className={classnames("fa fa-question-circle", cssClass.TRIGGER)}
                  ref="focusableTrigger"
                  tabIndex={0}
                />
              </Tooltip>
            </div>
          `}
        >
          <div className={cssClass.DEMO_CONTAINER}>
            <div className={cssClass.EXAMPLE}>
              Simple
              {" "}
              <Tooltip
                content="Here is a simple tooltip."
                placement={placement}
                textAlign={textAlign}
              >
                <span className={classnames("fa fa-question-circle", cssClass.TRIGGER)} />
              </Tooltip>
            </div>
            <div className={cssClass.EXAMPLE}>
              HTML + long text
              {" "}
              <Tooltip
                content={
                  <div>
                    Here is a tooltip with long text to demonstrate wrapping and HTML formatting.
                    <br />
                    <br />
                    {loremIpsum({count: 3, units: "sentences"})}
                  </div>
                }
                placement={placement}
                textAlign={textAlign}
              >
                <span className={classnames("fa fa-question-circle", cssClass.TRIGGER)} />
              </Tooltip>
            </div>
            <div className={cssClass.EXAMPLE}>
              With focusable trigger
              {" "}
              <Tooltip
                content="Tooltips can be triggered by focus as well."
                placement={placement}
                textAlign={textAlign}
              >
                <span
                  className={classnames("fa fa-question-circle", cssClass.TRIGGER)}
                  ref="focusableTrigger"
                  tabIndex={0}
                />
              </Tooltip>
            </div>
          </div>
          <div className={cssClass.CONFIG}>
            Placement:
            <SegmentedControl
              className={cssClass.CONFIG_OPTIONS}
              defaultValue={placement}
              onSelect={value => this.setState({placement: value})}
              options={_.map(Tooltip.Placement, p => ({content: p, value: p}))}
            />
          </div>
          <div className={cssClass.CONFIG}>
            Text alignment:
            <SegmentedControl
              className={cssClass.CONFIG_OPTIONS}
              defaultValue={textAlign}
              onSelect={value => this.setState({textAlign: value})}
              options={_.map(Tooltip.Align, p => ({content: p, value: p}))}
            />
          </div>
          <div className={cssClass.FOCUS_CONTROL}>
            <Button
              onClick={() => this.refs.focusableTrigger.focus()}
              type="linkPlain"
              value="Click to focus on tooltip trigger"
            />
          </div>
        </Example>
        <PropDocumentation
          availableProps={[
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
  FOCUS_CONTROL: "TooltipView--focusControl",
  PROPS: "TooltipView--props",
  TRIGGER: "TooltipView--tooltipTrigger",
};
