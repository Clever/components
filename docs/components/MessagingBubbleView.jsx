import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {
  AnnouncementBubble,
  MessagingAttachment,
  MessagingBubble,
  MessagingAvatar,
  FlexBox,
  ItemAlign,
  SegmentedControl,
  Label,
} from "src";
import { FileAttachmentIcon } from "src/MessagingAttachment/MessagingAttachment";

import Colors from "src/utils/Colors";

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
    messageOwnership: "ownMessage",
    theme: "default",
  };

  render() {
    const { messageOwnership, theme } = this.state;

    const attachmentsArray = [
      {
        key: "1",
        attachmentID: "1",
        icon: <FileAttachmentIcon fileType={"doc"} />,
        onClickAttachment: () => console.log("clicked!"),
        title: "MyCoolDoclajsdjasldjaslkdjasldkjasldjaslkdjasldjasldjalskjdalskjdaslkjasljd.doc",
        subtitle: "Click to download",
        theme,
      },
      {
        key: "2",
        attachmentID: "2",
        icon: <FileAttachmentIcon fileType={"png"} />,
        onClickAttachment: () => console.log("clicked!"),
        title: "Flyer.png",
        subtitle: "Click to view",
        theme,
      },
      {
        key: "3",
        attachmentID: "3",
        icon: <FileAttachmentIcon fileType={"m4a"} />,
        onClickAttachment: () => console.log("clicked!"),
        title: "Morning message.m4a",
        subtitle: "Click to download",
        theme,
      },
      {
        key: "4",
        attachmentID: "4",
        icon: <FileAttachmentIcon fileType={"jpg"} />,
        onClickAttachment: () => console.log("clicked attachment-only message!"),
        title: "Ain't no text with this message.jpg",
        subtitle: "Click to view",
        theme,
      },
      {
        key: "5",
        attachmentID: "5",
        icon: <FileAttachmentIcon fileType={"doc"} />,
        onClickAttachment: () => console.log("clicked attachment-only message!"),
        title: "Attachment_friendz_only_here.doc",
        subtitle: "Click to download",
        theme,
      },
    ].map((attachment) => (
      <MessagingAttachment
        key={attachment.key}
        attachmentID={attachment.attachmentID}
        icon={attachment.icon}
        onClickAttachment={attachment.onClickAttachment}
        title={attachment.title}
        subtitle={attachment.subtitle}
        theme={attachment.theme}
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
            <MessagingBubble
              bubbleType="normal"
              messageOwnership={messageOwnership}
              className={cssClass.BUBBLE}
              theme={theme}
            >
              Hello World!
            </MessagingBubble>
            <MessagingBubble
              bubbleType="normal"
              messageOwnership={messageOwnership}
              className={cssClass.BUBBLE}
              theme={theme}
            >
              Links like https://clever.com are clickable
            </MessagingBubble>
            {/* hide quoted annoucement replies from the teacher, as this does not exist in familyPortal */}
            {(theme !== "familyPortal" || messageOwnership !== "otherMessage") && (
              <MessagingBubble
                bubbleType="normal"
                messageOwnership={messageOwnership}
                className={cssClass.BUBBLE}
                theme={theme}
                replyTo={
                  <AnnouncementBubble
                    senderName={"Joni Roni"}
                    senderIcon={
                      <MessagingAvatar
                        text={"Joni Roni"}
                        color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
                      />
                    }
                    sentAtTimestamp={new Date()}
                    bubbleType={"quoted"}
                    theme={theme}
                  >
                    "This is an announcement with a message reply!"
                  </AnnouncementBubble>
                }
              >
                Here is the reply!
              </MessagingBubble>
            )}
            <MessagingBubble
              bubbleType="normal"
              messageOwnership={messageOwnership}
              className={cssClass.BUBBLE}
              theme={theme}
              attachments={attachmentsArray.slice(0, 3)}
            >
              Check out these attachments!
            </MessagingBubble>
            <MessagingBubble
              bubbleType="normal"
              messageOwnership={messageOwnership}
              className={cssClass.BUBBLE}
              theme={theme}
              attachments={attachmentsArray.slice(3)}
            />
            <MessagingBubble
              bubbleType="normal"
              messageOwnership={messageOwnership}
              className={cssClass.BUBBLE}
              theme={theme}
              attachments={attachmentsArray.slice(4)}
            />
            {/* hide quoted annoucement replies from the teacher, as this does not exist in familyPortal */}
            {(theme !== "familyPortal" || messageOwnership !== "otherMessage") && (
              <MessagingBubble
                bubbleType="normal"
                messageOwnership={messageOwnership}
                className={cssClass.BUBBLE}
                theme={theme}
                attachments={attachmentsArray.slice(3)}
                replyTo={
                  <AnnouncementBubble
                    senderName={"Joni Roni"}
                    senderIcon={
                      <MessagingAvatar
                        text={"Joni Roni"}
                        color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
                      />
                    }
                    sentAtTimestamp={new Date()}
                    bubbleType={"quoted"}
                    theme={theme}
                  >
                    "This is an announcement with an attachments-only reply!"
                  </AnnouncementBubble>
                }
              />
            )}
            {(theme !== "familyPortal" || messageOwnership !== "otherMessage") && (
              <MessagingBubble
                bubbleType="normal"
                messageOwnership={messageOwnership}
                className={cssClass.BUBBLE}
                theme={theme}
                replyTo={
                  <AnnouncementBubble
                    bubbleType={"deleted"}
                    theme={theme}
                    deletionNoticeText={`${
                      messageOwnership === "ownMessage" ? "You" : "Ms. Yang"
                    } deleted this announcement`}
                  />
                }
              >
                This is a reply to a deleted announcement. This state doesn't currently exist in the
                product
              </MessagingBubble>
            )}
            {(theme !== "familyPortal" || messageOwnership !== "otherMessage") && (
              <MessagingBubble
                bubbleType="normal"
                messageOwnership={messageOwnership}
                className={cssClass.BUBBLE}
                theme={theme}
                replyTo={
                  <AnnouncementBubble
                    senderName={"Joni Roni"}
                    senderIcon={
                      <MessagingAvatar
                        text={"Joni Roni"}
                        color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
                      />
                    }
                    attachments={attachmentsArray.slice(4)}
                    sentAtTimestamp={new Date()}
                    bubbleType={"quoted"}
                    theme={theme}
                  >
                    "This is a quoted announcement with an attachment!"
                  </AnnouncementBubble>
                }
              >
                "This is a reply to the announcement with an attachment"
              </MessagingBubble>
            )}
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { theme, messageOwnership } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Bubble Type:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ messageOwnership: value })}
            options={[
              { content: "Own Message", value: "ownMessage" },
              { content: "Other Message", value: "otherMessage" },
            ]}
            value={messageOwnership}
          />
        </div>

        <div className={cssClass.CONFIG}>
          Theme:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ theme: value })}
            options={[
              { content: "Default", value: "default" },
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
            type: `"normal" | "deleted"`,
            description: "Bubble type to use for styling the bubble.",
          },
          {
            name: "messageOwnership",
            // eslint-disable-next-line quotes
            type: `"ownMessage" | "otherMessage"`,
            description: "Message ownership designation to use for styling the bubble.",
          },
          {
            name: "theme",
            // eslint-disable-next-line quotes
            type: `MessagingTheme = "default" | "familyPortal"`,
            description: "Theme to use for styling the bubble",
            optional: true,
            default: "default",
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
