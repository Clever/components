import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {
  MessagingAttachment,
  MessagingBubble,
  FlexBox,
  ItemAlign,
  SegmentedControl,
  Label,
} from "src";
import { FileAttachmentIcon } from "src/MessagingAttachment/MessagingAttachment";

import "./MessagingBubbleView.less";

const cssClass = {
  BETA: "MessagingBubbleView--beta",
  BUBBLE: "MessagingBubbleView--bubble",
  CONFIG_CONTAINER: "MessagingBubbleView--configContainer",
  CONFIG_OPTIONS: "MessagingBubbleView--configOptions",
  CONFIG: "MessagingBubbleView--config",
  CONFIG_TOGGLE: "MessagingBubbleView--configToggle",
  CONTAINER: "MessagingBubbleView",
  INTRO: "MessagingBubbleView--intro",
  PROPS: "MessagingBubbleView--props",
};

export default class MessagingBubbleView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    bubbleType: "ownMessage",
    theme: "launchpad",
  };

  render() {
    const { bubbleType, theme } = this.state;

    const attachmentsArray = [
      {
        key: "1",
        attachmentID: "1",
        icon: <FileAttachmentIcon fileType={"doc"} />,
        onClickAttachment: () => console.log("clicked!"),
        title: "MyCoolDoclajsdjasldjaslkdjasldkjasldjaslkdjasldjasldjalskjdalskjdaslkjasljd.doc",
        subtitle: "Click to download",
      },
      {
        key: "2",
        attachmentID: "2",
        icon: <FileAttachmentIcon fileType={"png"} />,
        onClickAttachment: () => console.log("clicked!"),
        title: "Flyer.png",
        subtitle: "Click to view",
      },
      {
        key: "3",
        attachmentID: "3",
        icon: <FileAttachmentIcon fileType={"m4a"} />,
        onClickAttachment: () => console.log("clicked!"),
        title: "Morning message.m4a",
        subtitle: "Click to download",
      },
      {
        key: "4",
        attachmentID: "4",
        icon: <FileAttachmentIcon fileType={"jpg"} />,
        onClickAttachment: () => console.log("clicked attachment-only message!"),
        title: "Ain't no text with this message.jpg",
        subtitle: "Click to view",
      },
      {
        key: "5",
        attachmentID: "5",
        icon: <FileAttachmentIcon fileType={"doc"} />,
        onClickAttachment: () => console.log("clicked attachment-only message!"),
        title: "Attachment_friendz_only_here.doc",
        subtitle: "Click to download",
      },
    ].map((attachment) => (
      <MessagingAttachment
        key={attachment.key}
        attachmentID={attachment.attachmentID}
        icon={attachment.icon}
        onClickAttachment={attachment.onClickAttachment}
        title={attachment.title}
        subtitle={attachment.subtitle}
      />
    ));

    return (
      <View
        className={cssClass.CONTAINER}
        title="MessagingBubble"
        sourcePath="src/MessagingBubble/MessagingBubble.tsx"
      >
        <header className={cssClass.INTRO}>
          <p className={cssClass.BETA}>
            <Label color="new-feature">Beta</Label> MessagingBubble is in Beta and breaking changes
            may still be introduced.
          </p>
          <p>
            MessagingBubble is a single bubble that would appear in a messaging thread. It can
            contain text or other content. By default MessagingBubble will turn any valid URLs into
            clickable links.
          </p>
          <CodeSample>
            {`
              import {MessagingBubble} from "clever-components";
              // OR
              import MessagingBubble from "clever-components/dist/MessagingBubble"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <MessagingBubble bubbleType={bubbleType} className={cssClass.BUBBLE} theme={theme}>
              Hello World!
            </MessagingBubble>
            <MessagingBubble bubbleType={bubbleType} className={cssClass.BUBBLE} theme={theme}>
              Links like https://clever.com are clickable
            </MessagingBubble>
            <MessagingBubble
              bubbleType={bubbleType}
              className={cssClass.BUBBLE}
              theme={theme}
              replyTo={"This is a message!"}
            >
              This is a reply to that message!
            </MessagingBubble>
            <MessagingBubble
              bubbleType={bubbleType}
              className={cssClass.BUBBLE}
              theme={theme}
              attachments={attachmentsArray.slice(0, 3)}
            >
              Check out these attachments!
            </MessagingBubble>
            <MessagingBubble
              bubbleType={bubbleType}
              className={cssClass.BUBBLE}
              theme={theme}
              attachments={attachmentsArray.slice(3)}
            />
            <MessagingBubble
              bubbleType={bubbleType}
              className={cssClass.BUBBLE}
              theme={theme}
              attachments={attachmentsArray.slice(3)}
              replyTo={"This is an announcement with an attachments-only reply!"}
            />
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { theme, bubbleType } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Bubble Type:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ bubbleType: value })}
            options={[
              { content: "Own Message", value: "ownMessage" },
              { content: "Other Message", value: "otherMessage" },
            ]}
            value={bubbleType}
          />
        </div>

        {/* TODO: why isn't the default value being set? */}
        <div className={cssClass.CONFIG}>
          Theme:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ theme: value })}
            options={[
              { content: "Launchpad", value: "launchpad" },
              { content: "Family Portal", value: "familyPortal" },
            ]}
            value={theme}
          />
        </div>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<MessagingBubble /> Props"
        availableProps={[
          {
            name: "bubbleType",
            // eslint-disable-next-line quotes
            type: `"ownMessage" | "otherMessage"`,
            description: "Bubble type to use for styling the bubble.",
          },
          {
            name: "theme",
            // eslint-disable-next-line quotes
            type: `"familyPortal" | "launchpad"`,
            description: "Theme to use for styling the bubble",
            optional: true,
            default: "launchpad",
          },
          {
            name: "content",
            type: "React.ReactNode",
            description: "MessagingBubble content.",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "replyTo",
            type: "React.ReactNode",
            description: "Optional prop to use for message reply content.",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
