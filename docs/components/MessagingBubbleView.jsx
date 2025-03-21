import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {
  AnnouncementBubble,
  FlexBox,
  ItemAlign,
  Label,
  MessagingAttachment,
  MessagingBubble,
  SegmentedControl,
} from "src";
import { FileAttachmentIcon } from "src/MessagingAttachment/MessagingAttachment";

import "./MessagingBubbleView.less";
import { DeleteMessageModal } from "./DeleteMessageModal/DeleteMessageModal";

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
    isDeletableMessageDeleted: false,
    isDeletionModalOpen: false,
    messageOwnership: "ownMessage",
    theme: "default",
  };

  render() {
    const { isDeletableMessageDeleted, isDeletionModalOpen, messageOwnership, theme } = this.state;

    // Set quoted announcement bubble color theme
    // Fampo ones will always be in own messages, so will always be "light" theme
    let colorTheme = "light";
    if (theme === "default") {
      colorTheme = messageOwnership === "ownMessage" ? "dark" : "light";
    }

    const deleteableMessageBody =
      messageOwnership === "ownMessage" || theme === "default"
        ? "This message can be deleted! Try hovering/focusing on the timestamp."
        : "Messages sent by guardians cannot be deleted.";

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
        {isDeletionModalOpen && (
          <DeleteMessageModal
            messageType="dm"
            onClose={() => this.setState({ isDeletionModalOpen: false })}
            onConfirm={() =>
              this.setState({ isDeletableMessageDeleted: true, isDeletionModalOpen: false })
            }
            recipientUserType={theme === "familyPortal" ? "guardian" : "student"}
          />
        )}
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

        <Example title="NormalMessagingBubble">
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
            {!isDeletableMessageDeleted && (
              <MessagingBubble
                bubbleType="normal"
                messageBody={deleteableMessageBody}
                messageOwnership={messageOwnership}
                className={cssClass.BUBBLE}
                onClickDeleteButton={
                  messageOwnership === "ownMessage" || theme === "default"
                    ? () => this.setState({ isDeletionModalOpen: true })
                    : null
                }
                theme={theme}
              >
                {deleteableMessageBody}
              </MessagingBubble>
            )}
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
                    sentAtTimestamp={new Date()}
                    bubbleType={"quoted"}
                    colorTheme={colorTheme}
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
                    sentAtTimestamp={new Date()}
                    bubbleType={"quoted"}
                    colorTheme={colorTheme}
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
                    } deleted this announcement.`}
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
                    attachments={attachmentsArray.slice(4)}
                    sentAtTimestamp={new Date()}
                    bubbleType={"quoted"}
                    colorTheme={colorTheme}
                    theme={theme}
                  >
                    "This is a quoted announcement with an attachment!"
                  </AnnouncementBubble>
                }
              >
                "This is a reply to the announcement with an attachment"
              </MessagingBubble>
            )}
            {(theme !== "familyPortal" || messageOwnership === "ownMessage") && (
              <MessagingBubble
                bubbleType="normal"
                messageOwnership={messageOwnership}
                className={cssClass.BUBBLE}
                theme={theme}
                replyTo={
                  <AnnouncementBubble
                    bubbleType="unavailable"
                    colorTheme={theme === "familyPortal" ? "white" : colorTheme}
                    unavailableNoticeHeader={"Announcement unavailable."}
                    unavailableNoticeText={"You no longer have access to this announcement."}
                  />
                }
              >
                "This is a reply to an unavailable announcement."
              </MessagingBubble>
            )}
          </ExampleCode>
          {this._renderConfig()}
        </Example>
        {this._renderProps("normal")}

        <Example title="DeletedMessagingBubble">
          <ExampleCode>
            <MessagingBubble
              className={cssClass.BUBBLE}
              bubbleType="deleted"
              theme={theme}
              deletionNoticeText={`${
                messageOwnership === "ownMessage" ? "You" : "Ms. Yang"
              } deleted this message.`}
              messageOwnership={messageOwnership}
            />
          </ExampleCode>
          {this._renderConfig()}
        </Example>
        {this._renderProps("deleted")}
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

  _renderProps(bubbleType) {
    if (bubbleType === "normal") {
      return (
        <PropDocumentation
          title="<NormalMessagingBubble/> Props"
          availableProps={[
            {
              name: "bubbleType",
              type: "normal",
              description:
                "Bubble type to determine which version of the component we render, incl. required props",
            },
            {
              name: "attachments",
              type: "React.ReactNode[]",
              description: "Optional list of ReactNodes to render as sent attachments.",
              optional: true,
            },
            {
              name: "children",
              type: "React.ReactNode",
              description: "ReactNode to render as the content of the NormalMessagingBubble.",
            },
            {
              name: "className",
              type: "string",
              description: "Optional additional CSS class name to apply to the container.",
              optional: true,
            },
            {
              name: "messageBody",
              type: "string",
              description: "Message body, to be used in the Delete button's aria-label.",
              optional: true,
            },
            {
              name: "messageOwnership",
              // eslint-disable-next-line quotes
              type: `"ownMessage" | "otherMessage"`,
              description: "Message ownership designation to use for styling the bubble.",
            },
            {
              name: "replyTo",
              type: "React.ReactNode",
              description: "Optional reply-to announcement, if this DM was an announcement reply.",
              optional: true,
            },
            {
              name: "theme",
              // eslint-disable-next-line quotes
              type: `MessagingTheme = "default" | "familyPortal"`,
              description: "Theme to use for styling the bubble",
              optional: true,
              defaultValue: "default",
            },
            {
              name: "timestamp",
              type: "string",
              description: "Timestamp, passed in to denote the message send time.",
            },
          ]}
          className={cssClass.PROPS}
        />
      );
    }

    if (bubbleType === "deleted") {
      return (
        <PropDocumentation
          title="<DeletedMessagingBubble/> Props"
          availableProps={[
            {
              name: "bubbleType",
              type: "deleted",
              description:
                "Bubble type to determine which version of the component we render, incl. required props.",
            },
            {
              name: "className",
              type: "string",
              description:
                "Optional additional CSS class name to apply to the message inside the container.",
              optional: true,
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
              description: "Theme to use for styling the bubble.",
              optional: true,
              defaultValue: "default",
            },
            {
              name: "deletionNoticeText",
              type: "string",
              description: "The text displayed in the DeletedMessagingBubble.",
            },
          ]}
          className={cssClass.PROPS}
        />
      );
    }

    return null;
  }
}
