import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { FloatingButton, FlexBox, ItemAlign, SegmentedControl } from "src";

import "./FloatingButtonView.less";

const cssClass = {
  CONFIG_CONTAINER: "FloatingButtonView--configContainer",
  CONFIG_OPTIONS: "FloatingButtonView--configOptions",
  CONFIG: "FloatingButtonView--config",
  CONFIG_TOGGLE: "FloatingButtonView--configToggle",
  CONTAINER: "FloatingButtonView",
  INTRO: "FloatingButtonView--intro",
  PROPS: "FloatingButtonView--props",
};

export default class FloatingButtonView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    animate: true,
    positionX: "right",
    positionY: "bottom",
    showAdditionalButtons: true,
    showBGColor: false,
    size: "regular",
  };

  render() {
    const { animate, positionX, positionY, showAdditionalButtons, showBGColor, size } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="FloatingButton"
        sourcePath="src/FloatingButton/FloatingButton.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>
            Implements button with fixed placement at edge of screen with optional pop up button
            menu.
          </p>
          <CodeSample>
            {`
              import {FloatingButton} from "clever-components";
              // OR
              import FloatingButton from "clever-components/dist/FloatingButton"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Example usage:">
          <ExampleCode>
            <FloatingButton
              className="my--custom--class"
              label={<div style={showBGColor ? { color: "white" } : {}}>label</div>}
              bgColor={showBGColor ? "green" : null}
              animate={animate}
              positionX={positionX}
              size={size}
              positionY={positionY}
              onClick={() => console.log("main button clicked")}
              additionalButtons={
                showAdditionalButtons
                  ? [
                      {
                        className: "my--custom--class",
                        label: <div>button 1</div>,
                        onClick: () => console.log("button 1 clicked"),
                      },
                      {
                        className: "my--custom--class",
                        label: <div>button 2</div>,
                        onClick: () => console.log("button 2 clicked"),
                      },
                      {
                        className: "my--custom--class",
                        label: <div>longer button</div>,
                        onClick: () => console.log("longer button clicked"),
                      },
                    ]
                  : null
              }
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
    const { animate, positionX, positionY, showAdditionalButtons, showBGColor, size } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={animate}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ animate: e.target.checked })}
          />{" "}
          animate
        </label>
        <div className={cssClass.CONFIG}>
          Horizontal Position:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({ positionX: value })}
            options={[
              { content: "Left", value: "left" },
              { content: "Center", value: "center" },
              { content: "Right", value: "right" },
            ]}
            value={positionX}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Size:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({ size: value })}
            options={[
              { content: "Small", value: "small" },
              { content: "Regular", value: "regular" },
              { content: "Large", value: "large" },
            ]}
            value={size}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Vertical Position:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({ positionY: value })}
            options={[{ content: "Top", value: "top" }, { content: "Bottom", value: "bottom" }]}
            value={positionY}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showAdditionalButtons}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ showAdditionalButtons: e.target.checked })}
          />{" "}
          Show Button Menu
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showBGColor}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ showBGColor: e.target.checked })}
          />{" "}
          Show Custom Background
        </label>
      </FlexBox>
    );
  }

  // TODO: Update prop documentation.
  _renderProps() {
    return (
      <div>
        <PropDocumentation
          title="<FloatingButton /> Props"
          availableProps={[
            {
              name: "animate",
              type: "bool",
              description: "FloatingButton content.",
              optional: true,
              defaultValue: "true",
            },
            {
              name: "additionalButtons",
              type: "Array of objects",
              description: "An array of menu buttons. Object information is included below.",
              optional: true,
            },
            {
              name: "className",
              type: "string",
              description: "Optional additional CSS class name to apply to the container.",
              optional: true,
            },
            {
              name: "bgColor",
              type: "string",
              description: "Button background color. Supported values: 'green'",
              optional: true,
            },
            {
              name: "closeLabel",
              type: "React.Node",
              description: "Main button label when menu buttons active",
              optional: true,
            },
            {
              name: "label",
              type: "React.Node",
              description: "Main button label",
              optional: true,
              defaultValue: "+",
            },
            {
              name: "onClick",
              type: "Function",
              description: "Called when the user clicks on the button",
              optional: true,
            },
            {
              name: "offsetX",
              type: "number",
              description: "x-axis offset from edge of screen",
              optional: true,
              defaultValue: 30,
            },
            {
              name: "offsetY",
              type: "number",
              description: "y-axis offset from edge of screen",
              optional: true,
              defaultValue: 30,
            },
            {
              name: "positionX",
              type: "String",
              description: "One of left, center, right",
              optional: true,
              defaultValue: "right",
            },
            {
              name: "positionY",
              type: "String",
              description: "One of top, bottom",
              optional: true,
              defaultValue: "bottom",
            },
            {
              name: "size",
              type: "String",
              description: "One of large, regular, small",
              optional: true,
              defaultValue: "regular",
            },
          ]}
          className={cssClass.PROPS}
        />
        <PropDocumentation
          title="Object in the additionalButtons"
          availableProps={[
            {
              name: "className",
              type: "string",
              description: "Optional additional CSS class name to apply to the container.",
              optional: true,
            },
            {
              name: "label",
              type: "React.Node",
              description: "Button label",
              optional: true,
            },
            {
              name: "onClick",
              type: "Function",
              description: "Called when the user clicks on the button",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
        />
      </div>
    );
  }
}
