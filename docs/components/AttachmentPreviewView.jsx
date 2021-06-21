import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { AttachmentPreview, FlexBox, ItemAlign, SegmentedControl } from "src";

import "./AttachmentPreviewView.less";
import { Button } from "../../src";

const cssClass = {
  CONFIG_CONTAINER: "AttachmentPreviewView--configContainer",
  CONFIG_OPTIONS: "AttachmentPreviewView--configOptions",
  CONFIG: "AttachmentPreviewView--config",
  CONFIG_LABEL_TEXT: "TextInput2View--configLabelText",
  CONFIG_TOGGLE: "AttachmentPreviewView--configToggle",
  CONTAINER: "AttachmentPreviewView",
  INTRO: "AttachmentPreviewView--intro",
  PROPS: "AttachmentPreviewView--props",
};

export default class AttachmentPreviewView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    multiOption1: "small",
    optionToggle1: false,
    optionToggle2: true,
    showingPreview: false,
  };

  render() {
    const { optionToggle1, showingPreview } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="AttachmentPreview"
        sourcePath="src/AttachmentPreview/AttachmentPreview.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>TODO: Describe your component/state it's purpose</p>
          <p>TODO(optional): Describe scenarios where the component might be useful.</p>
          <CodeSample>
            {`
              import {AttachmentPreview} from "clever-components";
              // OR
              import AttachmentPreview from "clever-components/dist/AttachmentPreview"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <Button onClick={() => this.setState({ showingPreview: true })}>Show preview</Button>
            {showingPreview && (
              <AttachmentPreview closePreview={() => this.setState({ showingPreview: false })}>
                {optionToggle1 ? "Something changed 🤔" : "My custom content."}
              </AttachmentPreview>
            )}
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  // TODO: Update or remove config options.
  _renderConfig() {
    const { multiOption1, optionToggle1, optionToggle2 } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Size:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ multiOption1: value })}
            options={[
              { content: "Small", value: "small" },
              { content: "Medium", value: "medium" },
              { content: "Large", value: "large" },
            ]}
            value={multiOption1}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={optionToggle1}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ optionToggle1: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_LABEL_TEXT}>Option Toggle 1</span>
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={optionToggle2}
            className={cssClass.CONFIG_TOGGLE}
            onChange={(e) => this.setState({ optionToggle2: e.target.checked })}
          />{" "}
          <span className={cssClass.CONFIG_LABEL_TEXT}>Option Toggle 2</span>
        </label>
      </FlexBox>
    );
  }

  // TODO: Update prop documentation.
  _renderProps() {
    return (
      <PropDocumentation
        title="<AttachmentPreview /> Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "AttachmentPreview content.",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "onPerformAction",
            type: "Function",
            description: "Handler function for the performAction event.",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
