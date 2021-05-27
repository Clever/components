import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { MessagingInput, Label, MessagingBubble } from "src";
import {
  MessagingAttachment,
  FileAttachmentIcon,
} from "src/MessagingAttachment/MessagingAttachment";

import "./MessagingInputView.less";

const cssClass = {
  BETA: "MessagingInputView--beta",
  CONFIG_CONTAINER: "MessagingInputView--configContainer",
  CONFIG_OPTIONS: "MessagingInputView--configOptions",
  CONFIG: "MessagingInputView--config",
  CONFIG_TOGGLE: "MessagingInputView--configToggle",
  CONTAINER: "MessagingInputView",
  INTRO: "MessagingInputView--intro",
  PROPS: "MessagingInputView--props",
  EXAMPLE_MESSAGE_REPLY: "MessagingInputView--reply",
};

export default class MessagingInputView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    inputValue: "",
    disableSendButton: false,
    newlineOnEnter: false,
    showReturnKeyInstructions: false,
    showUploadAttachmentButton: false,
    attachments: [],
  };

  render() {
    const {
      inputValue,
      newlineOnEnter,
      disableSendButton,
      enableReplyTo,
      showReturnKeyInstructions,
      showUploadAttachmentButton,
      attachments,
    } = this.state;
    const exampleReplyMessage = (
      <MessagingBubble className={cssClass.EXAMPLE_MESSAGE_REPLY} theme="otherMessage">
        This is an example message that you can try replying to.
      </MessagingBubble>
    );
    const attachmentList = [
      <MessagingAttachment
        key={"1"}
        title={"GoodMorning.mp3"}
        attachmentID={"abcd"}
        icon={<FileAttachmentIcon fileType={"mp3"} />}
        onClickAttachment={(attachmentID) => {
          console.log("Downloaded attachment:", attachmentID);
        }}
        onRemoveAttachment={(attachmentID) => {
          console.log("Removed attachment:", attachmentID);
        }}
        isUpload
        uploadComplete
      />,
      <MessagingAttachment
        key={"2"}
        title={"CoolAttachment.pdf"}
        attachmentID={"defg"}
        icon={<FileAttachmentIcon fileType={"pdf"} />}
        onClickAttachment={(attachmentID) => {
          console.log("Downloaded attachment:", attachmentID);
        }}
        onRemoveAttachment={(attachmentID) => {
          console.log("Remove attachment:", attachmentID);
        }}
        isUpload
        uploadComplete
      />,
      <MessagingAttachment
        key={"3"}
        title={"WeirdAttachment.abc"}
        attachmentID={"hijk"}
        icon={<FileAttachmentIcon fileType={"abc"} />}
        onClickAttachment={(attachmentID) => {
          console.log("Downloaded attachment:", attachmentID);
        }}
        onRemoveAttachment={(attachmentID) => {
          console.log("Remove attachment:", attachmentID);
        }}
        isUpload
        uploadComplete
      />,
    ];
    return (
      <View
        className={cssClass.CONTAINER}
        title="MessagingInput"
        sourcePath="src/MessagingInput/MessagingInput.tsx"
      >
        <header className={cssClass.INTRO}>
          <p className={cssClass.BETA}>
            <Label color="new-feature">Beta</Label> MessagingInput is in Beta and breaking changes
            may still be introduced.
          </p>
          <p>
            MessagingInput is an input to be used for entering and submitting text for messaging.
          </p>
          <CodeSample>
            {`
              import {MessagingInput} from "clever-components";
              // OR
              import MessagingInput from "clever-components/dist/MessagingInput"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <MessagingInput
              value={inputValue}
              newlineOnEnter={newlineOnEnter}
              onChange={(newValue) => this.setState({ inputValue: newValue })}
              onSubmit={(message) => {
                // eslint-disable-next-line no-alert
                alert(message);
                this.setState({ inputValue: "" });
              }}
              disableSendButton={disableSendButton}
              showReturnKeyInstructions={showReturnKeyInstructions}
              replyTo={enableReplyTo ? exampleReplyMessage : null}
              onReplyCancel={() => alert("REPLY CANCELLED")}
              showUploadAttachmentButton={showUploadAttachmentButton}
              store={(file, callbacks) => {
                console.log(file.name.toLowerCase());
                callbacks.success();
              }}
              attachments={attachments}
            />
          </ExampleCode>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={newlineOnEnter}
              onChange={({ target }) => this.setState({ newlineOnEnter: target.checked })}
            />{" "}
            Newline on enter
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={disableSendButton}
              onChange={({ target }) => this.setState({ disableSendButton: target.checked })}
            />{" "}
            Disable send button
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={enableReplyTo}
              onChange={({ target }) => this.setState({ enableReplyTo: target.checked })}
            />{" "}
            Enable reply mode
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={showReturnKeyInstructions}
              onChange={({ target }) =>
                this.setState({ showReturnKeyInstructions: target.checked })
              }
            />{" "}
            Show return key instructions
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={showUploadAttachmentButton}
              onChange={({ target }) =>
                this.setState({ showUploadAttachmentButton: target.checked })
              }
            />{" "}
            Show upload attachment button
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={attachments.length}
              onChange={({ target }) =>
                this.setState({
                  attachments: target.checked && attachmentList,
                })
              }
            />{" "}
            Show uploaded attachments
          </label>
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<MessagingInput /> Props"
        availableProps={[
          {
            name: "value",
            type: "string",
            description: "The text that's been entered in the MessagingInput.",
          },
          {
            name: "onChange",
            type: "(newValue: string) => void",
            description: "Function that's called when the inputted text changes.",
          },
          {
            name: "onSubmit",
            type: "(message: string) => void",
            description: "Function that's called when the text is submitted.",
          },
          {
            name: "onBlur",
            type: "() => void",
            description: "Function that's called when the input is unfocused.",
            optional: true,
          },
          {
            name: "newlineOnEnter",
            type: "boolean",
            description:
              "If true, pressing enter/return will create a newline instead of sending the message.",
            optional: true,
          },
          {
            name: "ref",
            type: "React.Ref<TextArea>",
            description: "Allows getting a ref to the underlying TextArea.",
            optional: true,
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "disableSendButton",
            type: "boolean",
            description: "If true, manually disables the send button",
            optional: true,
          },
          {
            name: "replyTo",
            type: "React.ReactNode",
            description: "Optional prop to use for message reply content",
            optional: true,
          },
          {
            name: "onReplyCancel",
            type: "() => void",
            description: "Optional function that fires when the user cancels the reply",
            optional: true,
          },
          {
            name: "showReturnKeyInstructions",
            type: "boolean",
            description:
              "When true and when text is in the input, below the MessagingInput there will be instructions that return is to send and shift + return is a newline. When false, nothing will show. Not currently customizable, but that could be a future improvement if needed. Currently always hidden on mobile.",
            optional: true,
          },
          {
            name: "showUploadAttachmentButton",
            type: "boolean",
            description:
              "NOTE: This feature is only partially implemented as of now, for testing purposes. Optional boolean to set this as an UploadAttachment button. Pass in a boolean or the relevant feature flag (e.g. teachers-upload-messaging-attachments) here",
            optional: true,
          },
          {
            name: "store",
            type: "(file, callbacks) => void",
            description:
              "Optional store function to be used with the FileInput for attachment uploads. This is only used if showUploadAttachmentButton == true, and should always be defined in that case.",
            optional: true,
          },
          {
            name: "attachments",
            type: "React.ReactNode[]",
            description: "Optional list of ReactNodes to render as uploaded attachments",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
