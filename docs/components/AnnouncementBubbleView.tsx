import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";

import View from "./View";
import {
  AnnouncementBubble,
  FlexBox,
  ItemAlign,
  Label,
  MessagingAvatar,
  SegmentedControl,
} from "src";
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
  INTRO: "AnnouncementBubbleView--intro",
  PROPS: "AnnouncementBubbleView--props",
};

export default class AnnouncementBubbleView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    colorTheme: "light",
  };

  render() {
    const { colorTheme } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="AnnouncementBubble"
        sourcePath="src/AnnouncementBubble/AnnouncementBubble.tsx"
      >
        <header className={cssClass.INTRO}>
          <p className={cssClass.BETA}>
            <Label color="new-feature">Beta</Label> AnnouncementBubble is in Beta and breaking
            changes may still be introduced.
          </p>
          <p>
            AnnouncementBubble is a single bubble that would appear in a messaging thread. It can
            contain text or other content. By default AnnouncementBubble will turn any valid URLs
            into clickable links.
          </p>
          <CodeSample>
            {`
              import {AnnouncementBubble} from "clever-components";
              // OR
              import AnnouncementBubble from "clever-components/dist/AnnouncementBubble"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            Normal announcement bubble
            <AnnouncementBubble
              className={cssClass.BUBBLE}
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
              Hello class! Links like https://clever.com are clickable
            </AnnouncementBubble>
            Deleted announcement bubble
            <AnnouncementBubble className={cssClass.BUBBLE} theme={"deleted"} />
            Quoted announcement bubble
            <AnnouncementBubble
              theme={"quoted"}
              colorTheme={colorTheme as "light" | "dark" | "white"}
              announcementGroupName={"Math Rocks!"}
              senderName={"Ms. Stark"}
              senderIcon={
                <MessagingAvatar
                  text={"Kristen Stark"}
                  color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
                />
              }
              sentAtTimestamp={new Date()}
            >
              This can go inside of other components! Links like https://clever.com are clickable
            </AnnouncementBubble>
          </ExampleCode>
          {this._renderConfig()}
        </Example>
        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { colorTheme } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          QuotedAnnouncementBubble colorTheme:
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

  _renderProps() {
    return (
      <PropDocumentation
        title="<AnnouncementBubble /> Props TODO"
        availableProps={[
          {
            name: "theme",
            // eslint-disable-next-line quotes
            type: `"light" | "dark" | "white"`,
            description: "Theme to use for styling the bubble.",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
