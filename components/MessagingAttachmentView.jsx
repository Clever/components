import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Label, MessagingAttachment, FlexBox } from "src";
import { FileAttachmentIcon } from "src/MessagingAttachment/MessagingAttachment";

import "./MessagingAttachmentView.less";

const cssClass = {
  BETA: "MessagingAttachmentView--beta",
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

export default class MessagingAttachmentView extends React.PureComponent {
  static cssClass = cssClass;

  render() {
    return (
      <View
        className={cssClass.CONTAINER}
        title="MessagingAttachment"
        sourcePath="src/MessagingAttachment/MessagingAttachment.tsx"
      >
        <header className={cssClass.INTRO}>
          <p className={cssClass.BETA}>
            <Label color="new-feature">Beta</Label> MessagingAttachment is in Beta and breaking
            changes may still be introduced.
          </p>
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
              {[
                {
                  key: "1",
                  attachmentID: "1",
                  fileType: "doc",
                  onClickDownload: () => console.log("downloaded!"),
                  onPreviewAttachment: () => console.log("previewed!"),
                  title:
                    "MyCoolDoclajsdjasldjaslkdjasldkjasldjaslkdjasldjasldjalskjdalskjdaslkjasljd.doc",
                  subtitle: "Click to download",
                },
                {
                  key: "2",
                  attachmentID: "2",
                  attachmentURL:
                    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fppcorn.com%2Fus%2Fwp-content%2Fuploads%2Fsites%2F14%2F2016%2F01%2Fcute-raccoon-ppcorn.jpg&f=1&nofb=1",
                  fileType: "png",
                  onClickDownload: () => console.log("downloaded!"),
                  onPreviewAttachment: () => console.log("previewed!"),
                  title: "Flyer.png",
                  subtitle: "Click to view",
                },
                {
                  key: "3",
                  attachmentID: "3",
                  fileType: "m4a",
                  onClickDownload: () => console.log("downloaded!"),
                  onPreviewAttachment: () => console.log("previewed!"),
                  title: "Morning message.m4a",
                  subtitle: "Click to download",
                },
              ].map((attachment) => (
                <MessagingAttachment
                  key={attachment.key}
                  attachmentID={attachment.attachmentID}
                  attachmentURL={attachment.attachmentURL}
                  fileType={attachment.fileType}
                  icon={attachment.icon}
                  onClickDownload={attachment.onClickDownload}
                  onPreviewAttachment={attachment.onPreviewAttachment}
                  title={attachment.title}
                  subtitle={attachment.subtitle}
                />
              ))}
            </FlexBox>
            <p>Draft Attachments:</p>
            <FlexBox className={cssClass.DEMO_ROW}>
              {[
                {
                  key: "4",
                  attachmentID: "4",
                  fileType: "doc",
                  onClickAttachment: () => console.log("clicked!"),
                  onRemoveAttachment: () => console.log("removed!"),
                  title: "MyCoolDoclkasjdlkajsdlkasjdlkasjdlkasjdlsakjd.doc",
                  subtitle: "Uploading 5%",
                  isUpload: true,
                },
                {
                  key: "5",
                  attachmentID: "5",
                  fileType: "png",
                  onClickAttachment: () => console.log("clicked!"),
                  onRemoveAttachment: () => console.log("removed!"),
                  title: "Flyer.png",
                  subtitle: "Processing...",
                  isUpload: true,
                },
                {
                  key: "6",
                  attachmentID: "6",
                  fileType: "m4a",
                  onClickAttachment: () => console.log("clicked!"),
                  onRemoveAttachment: () => console.log("removed!"),
                  title: "Hover over me.m4a",
                  subtitle: "Click to download",
                  isUpload: true,
                  uploadComplete: true,
                },
                {
                  key: "7",
                  attachmentID: "7",
                  fileType: "doc",
                  onClickAttachment: () => console.log("clicked!"),
                  onRemoveAttachment: () => console.log("removed!"),
                  errorMsg: "File cannot exceed 10 MB",
                  isUpload: true,
                },
              ].map((attachment) => (
                <MessagingAttachment
                  key={attachment.key}
                  attachmentID={attachment.attachmentID}
                  icon={attachment.icon}
                  onClickAttachment={attachment.onClickAttachment}
                  onRemoveAttachment={attachment.onRemoveAttachment}
                  title={attachment.title}
                  subtitle={attachment.subtitle}
                  errorMsg={attachment.errorMsg}
                  isUpload={attachment.isUpload}
                  uploadComplete={attachment.uploadComplete}
                />
              ))}
            </FlexBox>
          </ExampleCode>
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderProps() {
    return (
      <>
        <PropDocumentation
          title="<MessagingAttachment /> Props"
          availableProps={[
            {
              name: "attachmentURL",
              type: "string",
              description: "URL for the attachment",
            },
            {
              name: "errorMsg",
              type: "string",
              description: "Optional error message, used when there is an error uploading, etc.",
              optional: true,
            },
            {
              name: "fileType",
              type: "string",
              description: "FileType for the attachment",
            },
            {
              name: "icon",
              type: "React.ReactNode",
              description:
                "An optional ReactNode to use as the icon for the Attachment. Generally will be a call to <FileAttachmentIcon />. By default the icon is set using the fileType",
              optional: true,
            },
            {
              name: "onClickDownload",
              type: "() => void",
              description:
                "Callback to be called upon clicking download on a MessagingAttachment. Passed down to AttachmentPreview",
            },
            {
              name: "onPreviewAttachment",
              type: "() => void",
              description: "Optional callback to be called upon previewing an attachment",
              optional: true,
            },
            {
              name: "onRemoveAttachment",
              type: "() => void",
              description:
                "Optional callback to be called upon clicking the Remove Attachment (X) button",
              optional: true,
            },
            {
              name: "title",
              type: "string",
              description:
                "Title of the file. Note: this prop is optional, but should always be present unless errorMsg is provided",
              optional: true,
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
            {
              name: "uploadComplete",
              type: "boolean",
              description: "Optional boolean for whether this Attachment has finished uploading",
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
            {
              name: "errorMsg",
              type: "string",
              description: "Used to determine whether or not to render the error state",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
        />
      </>
    );
  }
}
