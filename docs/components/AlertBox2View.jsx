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
              isCloseable={this.state.isCloseable}
            >
              <FlexBox justify={Justify.BETWEEN} alignItems={ItemAlign.CENTER}>
                <p style={{ margin: "0" }}>
                  This is the box body. It can be any node.{" "}
                  <a href="/#/components/alert-box-2">look a link</a>!
                </p>
                <div>
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
                </div>
              </FlexBox>
            </AlertBox2>
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { type, isCloseable } = this.state;

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
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
