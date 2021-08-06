import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {
  AlertBox2,
  AlertBox2Type,
  Button,
  FlexBox,
  Justify,
  ItemAlign,
  SegmentedControl,
  Label,
  TextInput2,
} from "src";

import "./AlertBox2View.less";

const cssClass = {
  BETA: "AlertBox2View--beta",
  CONFIG_CONTAINER: "AlertBox2View--configContainer",
  CONFIG_OPTIONS: "AlertBox2View--configOptions",
  CONFIG: "AlertBox2View--config",
  CONFIG_LABEL_TEXT: "TextInput2View--configLabelText",
  CONFIG_TOGGLE: "AlertBox2View--configToggle",
  CONTAINER: "AlertBox2View",
  INTRO: "AlertBox2View--intro",
  PROPS: "AlertBox2View--props",
};

export default class AlertBox2View extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    type: AlertBox2Type.CAUTION,
    isCloseable: false,
    showButtons: false,
    extraText:
      "text inside child <p> tags will not be bolded. Check with your designer if you want to use this type of non-bolded text description. As a design convention at Clever, Alerts that are more than a single line are discouraged",
  };

  render() {
    return (
      <View
        className={cssClass.CONTAINER}
        title="AlertBox2"
        sourcePath="src/AlertBox2/AlertBox2.tsx"
      >
        <header className={cssClass.INTRO}>
          <p className={cssClass.BETA}>
            <Label color="new-feature">Beta</Label> AlertBox2 is in Beta. Complete functionality
            isn't available yet and breaking changes may still be introduced.
          </p>
          <p>Updated design for AlertBox component</p>
          <p>This is your standard banner alert component.</p>
          <CodeSample>
            {`
              import {AlertBox2} from "clever-components";
              // OR
              import AlertBox2 from "clever-components/dist/AlertBox2"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <AlertBox2
              className="my--custom--class"
              type={this.state.type}
              buttons={
                this.state.showButtons ? (
                  <>
                    <Button
                      style={{ marginRight: "0.5rem" }}
                      type="secondary"
                      size="small"
                      onClick={() => console.log("Clicked No!")}
                    >
                      No
                    </Button>
                    <Button type="primary" size="small" onClick={() => console.log("Clicked Yes!")}>
                      Yes
                    </Button>
                  </>
                ) : null
              }
              isCloseable={this.state.isCloseable}
            >
              <div>
                <div style={{ marginBottom: "0.25rem" }}>
                  This is the box body. It can be any node.{" "}
                  <a href="/#/components/alert-box-2">look a link</a>!
                </div>
                <p>{this.state.extraText}</p>
              </div>
            </AlertBox2>
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { type, isCloseable, showButtons, extraText } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <SegmentedControl
          onSelect={(value) => this.setState({ type: value })}
          options={Object.entries(AlertBox2Type).map(([label, value]) => ({
            content: label,
            value,
          }))}
          value={type}
        />
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={isCloseable}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ isCloseable: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_LABEL_TEXT}>isCloseable</span>
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={showButtons}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ showButtons: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_LABEL_TEXT}>extra buttons</span>
        </label>
        <div className={cssClass.CONFIG}>
          <TextInput2
            className={cssClass.CONFIG_OPTIONS}
            name="TextInput2View--labelTextInput"
            label="Extra text (discouraged)"
            onChange={(e) => this.setState({ extraText: e.target.value })}
            value={extraText}
          />
        </div>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<AlertBox2 /> Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "AlertBox2 content.",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "type",
            type: "string",
            description: "One of: critical, caution, success, info",
            optional: false,
          },
          {
            name: "isClosable",
            type: "bool",
            description: "Whether the AlertBox2 can be dismissed",
            optional: true,
          },
          {
            name: "onClose",
            type: "() => void",
            description: "Fires callback when AlertBox2 is dismissed",
            optional: true,
          },
          {
            name: "iconOverride",
            type: "React.ReactNode",
            description: "If passed, replaces the icon used on the left",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
