import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { MessagingAttachment, FlexBox, ItemAlign, SegmentedControl } from "src";
import {
  FileAttachmentIcon,
  ImageAttachmentIcon,
  AudioAttachmentIcon,
} from "src/MessagingAttachment/MessagingAttachment";

import "./MessagingAttachmentView.less";

const cssClass = {
  CONFIG_CONTAINER: "MessagingAttachmentView--configContainer",
  CONFIG_OPTIONS: "MessagingAttachmentView--configOptions",
  CONFIG: "MessagingAttachmentView--config",
  CONFIG_LABEL_TEXT: "TextInput2View--configLabelText",
  CONFIG_TOGGLE: "MessagingAttachmentView--configToggle",
  CONTAINER: "MessagingAttachmentView",
  INTRO: "MessagingAttachmentView--intro",
  PROPS: "MessagingAttachmentView--props",
  DEMO_ROW: "MessagingAttachmentView-demoRow",
};

// TODO: FINISH THIS DOCUMENT
export default class MessagingAttachmentView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    multiOption1: "small",
    optionToggle1: false,
    optionToggle2: true,
  };

  render() {
    const { optionToggle1 } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="MessagingAttachment"
        sourcePath="src/MessagingAttachment/MessagingAttachment.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>TODO: Describe your component/state it's purpose</p>
          <p>TODO(optional): Describe scenarios where the component might be useful.</p>
          <CodeSample>
            {`
              import {MessagingAttachment} from "clever-components";
              // OR
              import MessagingAttachment from "clever-components/dist/MessagingAttachment"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <p>Sent Attachments:</p>
            <FlexBox className={cssClass.DEMO_ROW}>
              <MessagingAttachment
                attachmentID={"1"}
                icon={<FileAttachmentIcon fileType={"doc"} />}
                onClickAttachment={() => console.log("clicked!")}
                title={"MyCoolDoc.doc"}
                subtitle={"Click to download"}
              />
              <MessagingAttachment
                attachmentID={"1"}
                icon={<FileAttachmentIcon fileType={"image"} />}
                onClickAttachment={() => console.log("clicked!")}
                title={"Flyer.png"}
                subtitle={"Click to view"}
              />
              <MessagingAttachment
                attachmentID={"1"}
                icon={<FileAttachmentIcon fileType={"audio"} />}
                onClickAttachment={() => console.log("clicked!")}
                title={"Morning message.m4a"}
                subtitle={"Click to download"}
              />
            </FlexBox>
            <p>Draft Attachments:</p>
            <FlexBox className={cssClass.DEMO_ROW}>
              <MessagingAttachment
                attachmentID={"1"}
                icon={<FileAttachmentIcon fileType={"doc"} isUpload />}
                onClickAttachment={() => console.log("clicked!")}
                onRemoveAttachment={() => console.log("closed!")}
                title={"MyCoolDoc.doc"}
                subtitle={"1.2 MB"}
                isUpload
              />
              <MessagingAttachment
                attachmentID={"1"}
                icon={<FileAttachmentIcon fileType={"image"} isUpload />}
                onClickAttachment={() => console.log("clicked!")}
                onRemoveAttachment={() => console.log("closed!")}
                title={"Flyer.png"}
                subtitle={"1.2 MB"}
                isUpload
              />
              <MessagingAttachment
                attachmentID={"1"}
                icon={<FileAttachmentIcon fileType={"audio"} isUpload />}
                onClickAttachment={() => console.log("clicked!")}
                onRemoveAttachment={() => console.log("closed!")}
                title={"Morning message.m4a"}
                subtitle={"1.2 MB"}
                isUpload
              />
            </FlexBox>
            {/* <MessagingAttachment className="my--custom--class" onPerformAction={console.log}>
              {optionToggle1 ? "Something changed 🤔" : "My custom content."}
            </MessagingAttachment> */}
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
        title="<MessagingAttachment /> Props"
        availableProps={[
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
