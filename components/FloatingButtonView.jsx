import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Button, FloatingButton, FlexBox, ItemAlign, SegmentedControl } from "src";

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
    positionX: FloatingButton.PositionX.RIGHT,
    positionY: FloatingButton.PositionY.BOTTOM,
    showAdditionalButtons: true,
    showColorGroup: false,
    size: Button.Size.M,
  };

  render() {
    const {
      animate,
      positionX,
      positionY,
      showAdditionalButtons,
      showColorGroup,
      size,
    } = this.state;

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
              ariaLabel="ariaLabel"
              label="label"
              colorGroup={showColorGroup ? FloatingButton.ColorGroup.GREEN : null}
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
                        label: "button 1",
                        onClick: () => console.log("button 1 clicked"),
                        ariaLabel: "button 1 ariaLabel",
                      },
                      {
                        className: "my--custom--class",
                        label: "button 2",
                        onClick: () => console.log("button 2 clicked"),
                        ariaLabel: "button 2 ariaLabel",
                      },
                      {
                        className: "my--custom--class",
                        label: "longer button",
                        onClick: () => console.log("longer button clicked"),
                        ariaLabel: "longer ariaLabel",
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
    const {
      animate,
      positionX,
      positionY,
      showAdditionalButtons,
      showColorGroup,
      size,
    } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={animate}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ animate: e.target.checked })}
          />{" "}
          animate
        </label>
        <div className={cssClass.CONFIG}>
          Horizontal Position:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ positionX: value })}
            options={[
              { content: "Left", value: FloatingButton.PositionX.LEFT },
              { content: "Center", value: FloatingButton.PositionX.CENTER },
              { content: "Right", value: FloatingButton.PositionX.RIGHT },
            ]}
            value={positionX}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Size:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ size: value })}
            options={[
              { content: "Small", value: Button.Size.S },
              { content: "Regular", value: Button.Size.M },
              { content: "Large", value: Button.Size.L },
            ]}
            value={size}
          />
        </div>
        <div className={cssClass.CONFIG}>
          Vertical Position:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ positionY: value })}
            options={[
              { content: "Top", value: FloatingButton.PositionY.TOP },
              { content: "Bottom", value: FloatingButton.PositionY.BOTTOM },
            ]}
            value={positionY}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showAdditionalButtons}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ showAdditionalButtons: e.target.checked })}
          />{" "}
          Show Button Menu
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showColorGroup}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ showColorGroup: e.target.checked })}
          />{" "}
          Show Custom Color Group
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
              name: "ariaLabel",
              type: "string",
              description: "A string value that labels an interactive element.",
              optional: true,
            },
            {
              name: "className",
              type: "string",
              description: "Optional additional CSS class name to apply to the container.",
              optional: true,
            },
            {
              name: "colorGroup",
              type: "string",
              description: (
                <p>
                  Button background color. One of:
                  <br />
                  {Object.keys(FloatingButton.ColorGroup).map((c) => (
                    <span key={c}>
                      <code>FloatingButton.ColorGroup.{c}</code>
                      <br />
                    </span>
                  ))}
                </p>
              ),
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
              description: "x-axis offset from edge of screen. Unused on small screens",
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
              description: (
                <p>
                  One of left, center, right. <code>center</code> forced on small screens
                </p>
              ),
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
              name: "ariaLabel",
              type: "string",
              description: "A string value that labels an interactive element.",
              optional: true,
            },
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
