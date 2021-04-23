import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { CopyContainer, FlexBox, ItemAlign, SegmentedControl } from "src";

import "./CopyContainerView.less";

const cssClass = {
  CONFIG_CONTAINER: "CopyContainerView--configContainer",
  CONFIG_OPTIONS: "CopyContainerView--configOptions",
  CONFIG: "CopyContainerView--config",
  CONFIG_TOGGLE: "CopyContainerView--configToggle",
  CONTAINER: "CopyContainerView",
  INTRO: "CopyContainerView--intro",
  PROPS: "CopyContainerView--props",
};

export default class CopyContainerView extends React.PureComponent {
  static cssClass = cssClass;
  state = {
    buttonType: "linkPlain",
  };

  render() {
    const { buttonType } = this.state;
    return (
      <View
        className={cssClass.CONTAINER}
        title="CopyContainer"
        sourcePath="src/CopyContainer/CopyContainer.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>
            This component is useful when you want to make some text copyable with a "copy" button.
          </p>
          <CodeSample>
            {`
              import {CopyContainer} from "clever-components";
              // OR
              import CopyContainer from "clever-components/dist/CopyContainer"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <CopyContainer className="my--custom--class" onCopyClick={() => console.log("copied")}>
              Click the button to copy me.
            </CopyContainer>
          </ExampleCode>
        </Example>
        <Example title="Specify the text to copy:">
          <ExampleCode>
            <CopyContainer className="my--custom--class" copyText="text to copy">
              This button will copy "text to copy" to the clipboard.
            </CopyContainer>
          </ExampleCode>
        </Example>
        <Example title="Customize the button label:">
          <ExampleCode>
            <CopyContainer className="my--custom--class" buttonLabel="I'm a custom button!">
              Click the button to copy me.
            </CopyContainer>
          </ExampleCode>
        </Example>
        <Example title="With button type:">
          <ExampleCode>
            <CopyContainer className="my--custom--class" buttonType={buttonType}>
              Click the button to copy me.
            </CopyContainer>
          </ExampleCode>
          <FlexBox className={cssClass.CONFIG_CONTAINER} alignItems={ItemAlign.CENTER}>
            <h4>Button type:</h4>
            <SegmentedControl
              className={cssClass.CONFIG_OPTIONS}
              onSelect={(s) => this.setState({ buttonType: s })}
              options={[
                { content: "linkPlain [default]", value: "linkPlain" },
                { content: "primary", value: "primary" },
                { content: "secondary", value: "secondary" },
              ]}
              value={buttonType}
            />
          </FlexBox>
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<CopyContainer /> Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "CopyContainer content.",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "copyText",
            type: "string",
            description: "The text that should be copied to the clipboard.",
            optional: true,
          },
          {
            name: "buttonLabel",
            type: "string",
            description: "The text that appears on the copy button.",
            optional: true,
          },
          {
            name: "onCopyClick",
            type: "Function",
            description: "Callback when the copy button is clicked",
            optional: true,
          },
          {
            name: "buttonType",
            type: "linkPlain | primary | secondary",
            description: "Button type for the copy button",
            defaultValue: "linkPlain",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
