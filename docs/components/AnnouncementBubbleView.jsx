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
  MessagingAvatar,
  SegmentedControl,
} from "src";
import { FileAttachmentIcon } from "src/MessagingAttachment/MessagingAttachment";

import Colors from "src/utils/Colors";

import "./AnnouncementBubbleView.less";

const cssClass = {
  BETA: "AnnouncementBubbleView--beta",
  BUBBLE: "AnnouncementBubbleView--bubble",
  CONFIG_CONTAINER: "AnnouncementBubbleView--configContainer",
  CONFIG_OPTIONS: "AnnouncementBubbleView--configOptions",
  CONFIG: "AnnouncementBubbleView--config",
  CONFIG_TOGGLE: "AnnouncementBubbleView--configToggle",
  CONTAINER: "AnnouncementBubbleView",
  HEADER: "AnnouncementBubbleView--header",
  PROPS: "AnnouncementBubbleView--props",
};

export default class AnnouncementBubbleView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    colorTheme: "light",
    theme: "default",
  };

  render() {
    const { colorTheme, theme } = this.state;

    const readBy = [
      "Arsalan Sufi",
      "Nikhil Bhatia",
      "Spencer Caton",
      "Ashley Wang",
      "Jonathan Ray",
      "Brian Rhee",
      "Chloe Caelynn",
      "Cory Fauver",
      "Jonah Schwartz",
      "Nick Friebel",
    ];

    const attachmentsArray = [
      {
        key: "1",
        attachmentID: "1",
        icon: <FileAttachmentIcon fileType={"m4a"} />,
        onClickAttachment: () => console.log("clicked!"),
        title: "Morning message.m4a",
        subtitle: "Click to download",
      },
      {
        key: "2",
        attachmentID: "2",
        icon: <FileAttachmentIcon fileType={"doc"} />,
        onClickAttachment: () => console.log("clicked!"),
        title: "Nectarines are yummy.doc",
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
        title="AnnouncementBubble"
        sourcePath="src/AnnouncementBubble/AnnouncementBubble.tsx"
      >
        <header className={cssClass.HEADER}>
          <p className={cssClass.BETA}>
            <Label color="new-feature">Beta</Label> AnnouncementBubble is in Beta and breaking
            changes may still be introduced.
          </p>
          <p>
            AnnouncementBubble is a single bubble that would appear in a messaging thread. There are
            three bubble types of AnnouncementBubble, available via the "bubbleType" prop.
          </p>
          <p>
            The bubble types are the NormalAnnouncementBubble, QuotedAnnouncementBubble, and
            DeletedAnnouncementBubble. The normal and quoted bubble types can contain text or other
            content. By default AnnouncementBubble will turn any valid URLs into clickable links.
          </p>
          <CodeSample>
            {`
              import {AnnouncementBubble} from "clever-components";
              // OR
              import AnnouncementBubble from "clever-components/dist/AnnouncementBubble"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="NormalAnnouncementBubble">
          <ExampleCode>
            <AnnouncementBubble
              bubbleType={"normal"}
              className={cssClass.BUBBLE}
              senderName={"Ms. Stark"}
              senderIcon={
                <MessagingAvatar
                  text={"Kristen Stark"}
                  color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
                />
              }
              numTranslatedLanguages={1}
              onReply={() => console.log("Reply!")}
              sentAtTimestamp={new Date()}
              bubbleType={"normal"}
              theme={theme}
            >
              Hello class! Links like https://clever.com are clickable
            </AnnouncementBubble>

            <AnnouncementBubble
              bubbleType={"normal"}
              className={cssClass.BUBBLE}
              readBy={readBy.slice(0)} // copies readBy so it doesn't change in the next bubble
              recipientType={"guardian"}
              senderName={"Ms. Stark"}
              senderIcon={
                <MessagingAvatar
                  text={"Kristen Stark"}
                  color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
                />
              }
              sentAtTimestamp={new Date()}
              theme={"normal"}
            >
              Read Receipts also show up for teachers as well! A tooltip of these names sorted
              alphabetically by first name will render upon hover.
            </AnnouncementBubble>

            <AnnouncementBubble
              bubbleType={"normal"}
              className={cssClass.BUBBLE}
              attachments={attachmentsArray}
              numTranslatedLanguages={10}
              readBy={readBy.slice(5)} // for variety
              recipientType={"student"}
              senderName={"Ms. Stark"}
              senderIcon={
                <MessagingAvatar
                  text={"Kristen Stark"}
                  color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
                />
              }
              onReply={() => console.log("Reply!")}
              sentAtTimestamp={new Date()}
              theme={theme}
            >
              Announcements like this one can include attachments to open or download
            </AnnouncementBubble>

            {/* attachment-only announcement; one attachment*/}
            <AnnouncementBubble
              bubbleType={"normal"}
              className={cssClass.BUBBLE}
              attachments={attachmentsArray.slice(0, 1)}
              senderName={"Ms. Stark"}
              senderIcon={
                <MessagingAvatar
                  text={"Kristen Stark"}
                  color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
                />
              }
              onReply={() => console.log("Attachments-only announcements work too!")}
              sentAtTimestamp={new Date()}
              theme={theme}
            />

            {/* attachment-only announcement; multiple attachments*/}
            <AnnouncementBubble
              bubbleType={"normal"}
              className={cssClass.BUBBLE}
              attachments={attachmentsArray}
              senderName={"Ms. Stark"}
              senderIcon={
                <MessagingAvatar
                  text={"Kristen Stark"}
                  color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
                />
              }
              onReply={() => console.log("Attachments-only announcements work too!")}
              sentAtTimestamp={new Date()}
              theme={theme}
            />

            {/* in-line error*/}
            <AnnouncementBubble
              bubbleType={"normal"}
              className={cssClass.BUBBLE}
              attachments={attachmentsArray}
              senderName={"Ms. Stark"}
              senderIcon={
                <MessagingAvatar
                  text={"Kristen Stark"}
                  color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
                />
              }
              onReply={() => console.log("Reply!")}
              sentAtTimestamp={new Date()}
              theme={theme}
              inlineErrorMsg={"Something went wrong. We were unable to translate this message."}
            >
              Announcements like this one can include attachments and in-line errors
            </AnnouncementBubble>
          </ExampleCode>
        </Example>
        {this._renderProps("normal")}

        <Example title="QuotedAnnouncementBubble">
          <ExampleCode>
            <AnnouncementBubble
              bubbleType={"quoted"}
              attachments={attachmentsArray}
              colorTheme={colorTheme}
              announcementGroupName={"Math Rocks!"}
              senderName={"Ms. Stark"}
              senderIcon={
                <MessagingAvatar
                  text={"Kristen Stark"}
                  color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
                />
              }
              sentAtTimestamp={new Date()}
              isMessageTruncated
              theme={theme}
            >
              This can go inside of other components, like the MessagingBubble or MessagingInput!
              The content expands and hides when the button is clicked. Links like
              https://clever.com are clickable. Bla bla bla bla bla bla bla bla bla bla bla bla bla
              bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
              bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
              bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
              bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
              bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
              bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
              bla bla bla bla bla bla bla...
            </AnnouncementBubble>

            <br />

            <AnnouncementBubble
              bubbleType={"quoted"}
              attachments={attachmentsArray}
              colorTheme={colorTheme}
              announcementGroupName={"Math Rocks!"}
              senderName={"Ms. Stark"}
              senderIcon={
                <MessagingAvatar
                  text={"Kristen Stark"}
                  color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
                />
              }
              sentAtTimestamp={new Date()}
              theme={theme}
            />

            <br />

            <AnnouncementBubble
              bubbleType={"quoted"}
              attachments={attachmentsArray}
              colorTheme={colorTheme}
              announcementGroupName={"Math Rocks!"}
              senderName={"Ms. Stark"}
              senderIcon={
                <MessagingAvatar
                  text={"Kristen Stark"}
                  color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
                />
              }
              sentAtTimestamp={new Date()}
              inlineErrorMsg={"Something went wrong. We were unable to translate this message."}
              theme={theme}
            >
              This can also have inline errors.
            </AnnouncementBubble>
          </ExampleCode>
          {this._renderConfig()}
        </Example>
        {this._renderProps("quoted")}

        <Example title="DeletedAnnouncementBubble">
          <ExampleCode>
            <AnnouncementBubble
              className={cssClass.BUBBLE}
              bubbleType="deleted"
              theme={theme}
              deletionNoticeText="Ms. Yang deleted this announcement."
            />
          </ExampleCode>
        </Example>
        {this._renderProps("deleted")}
      </View>
    );
  }

  _renderConfig() {
    const { colorTheme } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          colorTheme:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ colorTheme: value })}
            options={[
              { content: "light", value: "light" },
              { content: "dark", value: "dark" },
              { content: "white", value: "white" },
            ]}
            value={colorTheme}
          />
        </div>
      </FlexBox>
    );
  }

  _renderProps(bubbleType) {
    if (bubbleType === "normal") {
      return (
        <PropDocumentation
          title="<AnnouncementBubble />"
          availableProps={[
            {
              name: "bubbleType",
              type: "normal",
              description:
                "Bubble type to determine which version of the component we render, incl. required props.",
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
              description: "ReactNode to render as the content of the NormalAnnouncementBubble.",
            },
            {
              name: "className",
              type: "string",
              description: "Optional additional CSS class name to apply to the container.",
              optional: true,
            },
            {
              name: "inlineErrorMsg",
              type: "string",
              description: "Optional error message to be show inline.",
              optional: true,
            },
            {
              name: "numTranslatedLanguages",
              type: "number",
              description:
                "Optional number of languages that the message has been translated into.",
              optional: true,
            },
            {
              name: "onDelete",
              type: "() => void",
              description: "Optional handler upon trigger of announcement deletion.",
              optional: true,
            },
            {
              name: "onReadReceiptsClick",
              type: "() => void",
              description: "Optional handler upon trigger of read receipts view.",
              optional: true,
            },
            {
              name: "onReadReceiptsHover",
              type: "() => void",
              description: "Optional handler upon hover of read receipts affordance.",
              optional: true,
            },
            {
              name: "onReply",
              type: "() => void",
              description: "Optional handler upon trigger of announcement reply via Reply button.",
              optional: true,
            },
            {
              name: "readBy",
              type: "string[]",
              description: "Optional list of users who have read the given announcement.",
              optional: true,
            },
            {
              name: "recipientType",
              // eslint-disable-next-line quotes
              type: `"student" | "guardian"`,
              description: "Recipient type for this announcement.",
            },
            {
              name: "repliesDisabledMsg",
              type: "string",
              description: "Optional message to show when replies are disabled.",
              optional: true,
            },
            {
              name: "senderIcon",
              type: "React.ReactNode",
              description: "Icon denoting who the announcement sender is.",
            },
            {
              name: "senderName",
              type: "string",
              description: "String denoting who the announcement sender is.",
            },
            {
              name: "sentAtTimestamp",
              type: "string",
              description: "Timestamp, passed in to denote the announcement send time.",
            },
            {
              name: "theme",
              // eslint-disable-next-line quotes
              type: `MessagingTheme = "default" | "familyPortal"`,
              description: "Theme to use for styling the bubble.",
              optional: true,
              defaultValue: "default",
            },
          ]}
          className={cssClass.PROPS}
        />
      );
    }

    if (bubbleType === "quoted") {
      return (
        <PropDocumentation
          title="<AnnouncementBubble />"
          availableProps={[
            {
              name: "bubbleType",
              type: "quoted",
              description:
                "Bubble type to determine which version of the component we render, incl. required props.",
            },
            {
              name: "announcementGroupName",
              type: "string",
              description:
                "String denoting the name of the group which the announcement was sent to.",
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
              description: "ReactNode to render as the content of the NormalAnnouncementBubble.",
            },
            {
              name: "className",
              type: "string",
              description: "Optional additional CSS class name to apply to the container.",
              optional: true,
            },
            {
              name: "colorTheme",
              // eslint-disable-next-line quotes
              type: `"white" | "light" | "dark"`,
              description: "Color theme to use for styling the bubble's color.",
            },
            {
              name: "inlineErrorMsg",
              type: "string",
              description: "Optional error message to be show inline.",
              optional: true,
            },
            {
              name: "isMessageTruncated",
              type: "boolean",
              description: "Optional bool for whether the message has been truncated or not.",
              optional: true,
            },
            {
              name: "onToggleShow",
              type: "() => void",
              description: "Optional handler upon trigger of toggling Show More/Less.",
              optional: true,
            },
            {
              name: "senderIcon",
              type: "React.ReactNode",
              description: "Icon denoting who the announcement sender is.",
            },
            {
              name: "senderName",
              type: "string",
              description: "String denoting who the announcement sender is.",
            },
            {
              name: "sentAtTimestamp",
              type: "string",
              description: "Timestamp, passed in to denote the announcement send time.",
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
              name: "postedInText",
              type: "string",
              description: "Optional text for which group the announcement was posted in.",
              optional: true,
            },
            {
              name: "showLessButtonText",
              type: "string",
              description: "Optional text for the Show Less button.",
              optional: true,
            },
            {
              name: "showMoreButtonText",
              type: "string",
              description: "Optional text for the Show More button.",
              optional: true,
            },
            {
              name: "truncationNoticeText",
              type: "string",
              description: "Optional text for the truncation notice.",
              optional: true,
            },
            {
              name: "truncationTooltipText",
              type: "string",
              description: "Optional text for the truncation tooltip.",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
        />
      );
    }

    if (bubbleType === "deleted") {
      return (
        <PropDocumentation
          title="<AnnouncementBubble />"
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
              description: "Optional additional CSS class name to apply to the container.",
              optional: true,
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
