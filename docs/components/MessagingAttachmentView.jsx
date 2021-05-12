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
          <p>
            MessagingAttachment component, to be used in AnnouncementBubble, MessagingBubble,
            MessagingInput, etc
          </p>
          <p>
            {
              "There is a subcomponent <FileAttachmentIcon />  which takes in a fileType prop and renders an icon for for that filetype"
            }
          </p>
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
                title={
                  "MyCoolDoclajsdjasldjaslkdjasldkjasldjaslkdjasldjasldjalskjdalskjdaslkjasljd.doc"
                }
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
                title={"MyCoolDoclkasjdlkajsdlkasjdlkasjdlkasjdlsakjd.doc"}
                subtitle={"Uploading 5%"}
                isUpload
              />
              <MessagingAttachment
                attachmentID={"1"}
                icon={<FileAttachmentIcon fileType={"image"} isUpload />}
                onClickAttachment={() => console.log("clicked!")}
                onRemoveAttachment={() => console.log("closed!")}
                title={"Flyer.png"}
                subtitle={"Processing..."}
                isUpload
              />
              <MessagingAttachment
                attachmentID={"1"}
                icon={<FileAttachmentIcon fileType={"audio"} isUpload />}
                onClickAttachment={() => console.log("clicked!")}
                onRemoveAttachment={() => console.log("closed!")}
                title={"Hover over me.m4a"}
                subtitle={"Click to download"}
                isUpload
                uploadComplete
              />
              <MessagingAttachment
                attachmentID={"1"}
                icon={<FileAttachmentIcon fileType={"audio"} isUpload uploadError />}
                onClickAttachment={() => console.log("clicked!")}
                onRemoveAttachment={() => console.log("closed!")}
                title={"File cannot exceed 10 MB"}
                isUpload
                uploadError
              />
            </FlexBox>
          </ExampleCode>
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  // TODO: Update prop documentation.
  _renderProps() {
    return (
      <>
        <PropDocumentation
          title="<MessagingAttachment /> Props"
          availableProps={[
            {
              name: "attachmentID",
              type: "string",
              description: "Unique ID used to identify this attachment",
              // optional: false,
            },
            {
              name: "errorMsg",
              type: "string",
              description: "Optional error message, used when there is an error uploading, etc.",
              optional: true,
            },
            {
              name: "icon",
              type: "React.ReactNode",
              description:
                "A ReactNode to use as the icon for the Attachment. Generally will be a call to <FileAttachmentIcon /> ",
              // optional: false,
            },
            {
              name: "onClickAttachment",
              type: "(attachmentID: string) => void",
              description: "Callback to be called upon clicking the Attachment",
              // optional: false,
            },
            {
              name: "onRemoveAttachment",
              type: "(attachmentID: string) => void",
              description: "Callback to be called upon clicking the Remove Attachment (X) button",
              optional: true,
            },
            {
              name: "title",
              type: "string",
              description: "Title of the file",
              // optional: false,
            },
            {
              name: "subtitle",
              type: "string",
              description: "Optional subtitle, generally used for upload status, filesize, etc",
              optional: true,
            },
            {
              name: "isUpload",
              type: "boolean",
              description:
                "Optional boolean for whether this Attachment is a draft/upload or it is a sent Attachment",
              defaultValue: "false",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
        />
        <PropDocumentation
          title="<FileAttachmentIcon /> Props"
          availableProps={[
            {
              name: "fileType",
              type: '"audio" | "catchall" | "doc" | "image" | "pdf" | "ppt" | "video" | "xls"',
              description: "Filetype for the given file, used to decide which icon to render",
              defaultValue: "catchall",
              optional: false,
            },
            {
              name: "isUpload",
              type: "boolean",
              description:
                "Whether or not the MessagingAttachment is an upload/draft or a sent attachment",
              defaultValue: "false",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
        />
      </>
    );
  }
}
