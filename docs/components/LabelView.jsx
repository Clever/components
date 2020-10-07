import _ from "lodash";
import loremIpsum from "lorem-ipsum";
import React, { Component } from "react";

import Example, { ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Button, Label, SegmentedControl, Tooltip } from "src";

import "./LabelView.less";

export default class LabelView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: Label.Color.SUCCESS,
      tooltipPlacement: Tooltip.Placement.RIGHT,
      tooltipTextAlign: Tooltip.Align.LEFT,
      size: Label.Size.S,
    };
  }

  render() {
    const { cssClass } = LabelView;
    const { color, size, tooltipPlacement, tooltipTextAlign } = this.state;

    return (
      <View className={cssClass.CONTAINER} title="Label" sourcePath="src/Label/Label.tsx">
        <p>Labels can be used as easily recognizable indicators of a type, state or status.</p>
        <p>
          They can be particularly useful when displaying a list or table of information as a visual
          aid for a user scanning through the information.
        </p>
        <Example>
          <div className={cssClass.DEMO_CONTAINER}>
            <ExampleCode>
              <h4 className={cssClass.EXAMPLE}>
                Labels are inline by default
                <Label className={cssClass.LABEL} color={color} size={size}>
                  Simple Label
                </Label>
              </h4>
              <h4 className={cssClass.EXAMPLE}>
                And can vary in size and color
                <Label className={cssClass.LABEL} color={color} size={size}>
                  With HTML Content <span className={"fa fa-check-circle"} />
                </Label>
              </h4>
              <h4 className={cssClass.EXAMPLE}>
                They can include an optional tooltip with hover state shading
                <Label
                  className={cssClass.LABEL}
                  color={color}
                  ref="focusableLabel"
                  size={size}
                  tooltip={
                    <div>
                      This label has a tooltip. It has a lot to say.
                      <br />
                      <br />
                      {loremIpsum({ count: 3, units: "sentences" })}
                    </div>
                  }
                  tooltipPlacement={tooltipPlacement}
                  tooltipTextAlign={tooltipTextAlign}
                >
                  With Tooltip
                </Label>
              </h4>
            </ExampleCode>
          </div>
          <div className={cssClass.CONFIG_CONTAINER}>
            <div className={cssClass.CONFIG}>
              Size:
              <SegmentedControl
                className={cssClass.CONFIG_OPTIONS}
                defaultValue={size}
                onSelect={value => this.setState({ size: value })}
                options={_.map(_.uniq(Object.values(Label.Size)), s => ({
                  content: s,
                  value: s,
                }))}
              />
            </div>
            <div className={cssClass.CONFIG}>
              Color:
              <SegmentedControl
                className={cssClass.CONFIG_OPTIONS}
                defaultValue={color}
                onSelect={value => this.setState({ color: value })}
                options={_.map(_.uniq(Object.values(Label.Color)), c => ({
                  content: c,
                  value: c,
                }))}
              />
            </div>
            <div className={cssClass.CONFIG}>
              Tooltip Placement:
              <SegmentedControl
                className={cssClass.CONFIG_OPTIONS}
                defaultValue={tooltipPlacement}
                onSelect={value => this.setState({ tooltipPlacement: value })}
                options={_.map(Tooltip.Placement, p => ({ content: p, value: p }))}
              />
            </div>
            <div className={cssClass.CONFIG}>
              Tooltip Text alignment:
              <SegmentedControl
                className={cssClass.CONFIG_OPTIONS}
                defaultValue={tooltipTextAlign}
                onSelect={value => this.setState({ tooltipTextAlign: value })}
                options={_.map(Tooltip.Align, p => ({ content: p, value: p }))}
              />
            </div>
            <div className={cssClass.FOCUS_CONTROL}>
              <Button
                onClick={() => this.refs.focusableLabel.focus()}
                type="linkPlain"
                value="Click to focus on label with tooltip"
              />
            </div>
          </div>
        </Example>
        <PropDocumentation
          availableProps={[
            {
              name: "children",
              type: "Node",
              description: "The text or HTML content for the label.",
              optional: true,
            },
            {
              name: "color",
              type: "Label.Color",
              description: "The background color for the label.",
              defaultValue: "Label.Color.DEFAULT",
              optional: true,
            },
            {
              name: "size",
              type: "Label.Size",
              description: "The label size.",
              defaultValue: "Label.Size.S",
              optional: true,
            },
            {
              name: "tooltip",
              type: "Node",
              description: "The text or HTML tooltip content, if applicable.",
              optional: true,
            },
            {
              name: "tooltipPlacement",
              type: "Tooltip.Placement",
              description: "Placement of the tooltip, relative to the label.",
              defaultValue: "Tooltip.Placement.RIGHT",
              optional: true,
            },
            {
              name: "tooltipTextAlign",
              type: "Tooltip.Align",
              description: "Alignment of the tooltip text content.",
              defaultValue: "Tooltip.Align.LEFT",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
        />
      </View>
    );
  }
}

LabelView.cssClass = {
  CONFIG_CONTAINER: "LabelView--configContainer",
  CONFIG_OPTIONS: "LabelView--configOptions",
  CONFIG: "LabelView--config",
  CONTAINER: "LabelView",
  DEMO_CONTAINER: "LabelView--demoContainer",
  EXAMPLE: "LabelView--example",
  FOCUS_CONTROL: "LabelView--focusControl",
  LABEL: "LabelView--label",
  PROPS: "LabelView--props",
};
