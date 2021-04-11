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
  HEADER: "AnnouncementBubbleView--header",
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
        <header className={cssClass.HEADER}>
          <p className={cssClass.BETA}>
            <Label color="new-feature">Beta</Label> AnnouncementBubble is in Beta and breaking
            changes may still be introduced.
          </p>
          <p>
            AnnouncementBubble is a single bubble that would appear in a messaging thread. There are
            three themes of AnnouncementBubble, available via the "theme" prop.
          </p>
          <p>
            The themes are the NormalAnnouncementBubble, QuotedAnnouncementBubble, and
            DeletedAnnouncementBubble. The normal and quoted themes can contain text or other
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
          </ExampleCode>
        </Example>
        <Example title="QuotedAnnouncementBubble">
          <ExampleCode>
            <AnnouncementBubble
              theme={"quoted"}
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
            >
              This can go inside of other components, like the MessagingBubble or MessagingInput!
              The content expands and hides when the button is clicked. Links like
              https://clever.com are clickable
            </AnnouncementBubble>
          </ExampleCode>
          {this._renderConfig()}
        </Example>
        <Example title="DeletedAnnouncementBubble">
          <ExampleCode>
            <AnnouncementBubble className={cssClass.BUBBLE} theme={"deleted"} />
          </ExampleCode>
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

  _renderProps() {
    return (
      <PropDocumentation
        title="<AnnouncementBubble /> Props TODO"
        availableProps={[
          {
            name: "theme",
            // eslint-disable-next-line quotes
            type: `"normal" | "quoted" | "deleted"`,
            description: "Theme to use for styling the bubble.",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
