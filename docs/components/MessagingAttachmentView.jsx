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
                  attachmentPreviewProps: { attachmentURL: "google.com" },
                  fileType: "doc",
                  onClickDownload: () => console.log("downloaded!"),
                  onPreviewAttachment: () => console.log("previewed!"),
                  title:
                    "MyCoolDoclajsdjasldjaslkdjasldkjasldjaslkdjasldjasldjalskjdalskjdaslkjasljd.doc",
                  subtitle: "Click to download",
                },
                {
                  key: "2",
                  attachmentPreviewProps: {
                    attachmentURL: "https://s3.amazonaws.com/assets.clever.com/Raccooooooon.jpg",
                    className: "anotherGoodClassName",
                  },
                  fileType: "png",
                  onClickDownload: () => console.log("downloaded!"),
                  onPreviewAttachment: () => console.log("previewed!"),
                  title: "Flyer.png",
                  subtitle: "Click to view",
                },
                {
                  key: "3",
                  attachmentPreviewProps: {
                    attachmentURL: "https://s3.amazonaws.com/assets.clever.com/nigel.mp3",
                  },
                  fileType: "mp3",
                  onClickDownload: () => console.log("downloaded!"),
                  onPreviewAttachment: () => console.log("previewed!"),
                  title: "nigel.mp3",
                  subtitle: "Click to view",
                },
                {
                  key: "4",
                  attachmentPreviewProps: {
                    attachmentURL:
                      "https://s3.amazonaws.com/assets.clever.com/Raccooooooonadsdasdd.jpg",
                  },
                  fileType: "png",
                  onClickDownload: () => console.log("downloaded!"),
                  onPreviewAttachment: () => console.log("previewed!"),
                  title: "ErrorImage.png",
                  subtitle: "Click to view",
                },
              ].map((attachment) => (
                <MessagingAttachment
                  key={attachment.key}
                  attachmentPreviewProps={attachment.attachmentPreviewProps}
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
                  attachmentPreviewProps: { attachmentURL: "abc.com" },
                  fileType: "doc",
                  onClickAttachment: () => console.log("clicked!"),
                  onRemoveAttachment: () => console.log("removed!"),
                  title: "MyCoolDoclkasjdlkajsdlkasjdlkasjdlkasjdlsakjd.doc",
                  subtitle: "Uploading 5%",
                  isUpload: true,
                },
                {
                  key: "5",
                  attachmentPreviewProps: {
                    attachmentURL: "https://s3.amazonaws.com/assets.clever.com/Raccooooooon.jpg",
                  },
                  fileType: "png",
                  onClickAttachment: () => console.log("clicked!"),
                  onRemoveAttachment: () => console.log("removed!"),
                  title: "Flyer.png",
                  subtitle: "Processing...",
                  isUpload: true,
                },
                {
                  key: "6",
                  attachmentPreviewProps: { attachmentURL: "cnn.com" },
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
                  attachmentPreviewProps: {
                    attachmentURL: "bbc.com",
                  },
                  className: "aNiceClassName",
                  fileType: "doc",
                  onClickAttachment: () => console.log("clicked!"),
                  onRemoveAttachment: () => console.log("removed!"),
                  errorMsg: "File cannot exceed 10 MB",
                  isUpload: true,
                },
              ].map((attachment) => (
                <MessagingAttachment
                  key={attachment.key}
                  attachmentPreviewProps={attachment.attachmentPreviewProps}
                  className={attachment.className}
                  fileType={attachment.fileType}
                  onClickDownload={attachment.onClickAttachment}
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
              name: "attachmentPreviewProps",
              type: "AttachmentPreviewProps (defined below)",
              description: "Passthrough props for the AttachmentPreview",
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
        <PropDocumentation
          title="AttachmentPreviewProps type"
          availableProps={[
            {
              name: "attachmentURL",
              type: "string",
              description: "URL for the attachment",
            },
            {
              name: "className",
              type: "string",
              description: "Optional ClassName for the AttachmentPreview",
              optional: true,
            },
            {
              name: "closeButtonAriaLabel",
              type: "string",
              description: "Optional ARIA label for close button",
              defaultValue: "close attachment preview",
              optional: true,
            },
            {
              name: "closeButtonText",
              type: "string",
              description: "Optional text for close button",
              defaultValue: "Close",
              optional: true,
            },
            {
              name: "downloadButtonTextDesktop",
              type: "string",
              description: "Optional text for download button on desktop",
              defaultValue: "Download",
              optional: true,
            },
            {
              name: "downloadButtonTextMobile",
              type: "string",
              description: "Optional text for download button on mobile",
              defaultValue: "Save",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
        />
      </>
    );
  }
}
