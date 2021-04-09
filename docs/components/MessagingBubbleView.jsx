import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { MessagingBubble, FlexBox, ItemAlign, SegmentedControl, Label } from "src";

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
    hasError: false,
    theme: "ownMessage",
  };

  render() {
    const { hasError, theme } = this.state;

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
              errorMsg={hasError && "Message failed to send"}
              className={cssClass.BUBBLE}
              theme={theme}
            >
              Hello World!
            </MessagingBubble>
            <MessagingBubble
              errorMsg={hasError && "Message failed to send"}
              className={cssClass.BUBBLE}
              theme={theme}
            >
              Links like https://clever.com are clickable
            </MessagingBubble>
            <MessagingBubble
              errorMsg={hasError && "Message failed to send"}
              theme={theme}
              replyTo={"This is a message!"}
            >
              This is a reply to that message!
            </MessagingBubble>
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { hasError, theme } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Theme:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={(value) => this.setState({ theme: value })}
            options={[
              { content: "Own Message", value: "ownMessage" },
              { content: "Other Message", value: "otherMessage" },
            ]}
            value={theme}
          />
          <label className={cssClass.CONFIG_OPTIONS}>
            <input
              type="checkbox"
              checked={hasError}
              onChange={({ target }) => this.setState({ hasError: target.checked })}
            />
            {"   "}
            Show error message
          </label>
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
            name: "theme",
            // eslint-disable-next-line quotes
            type: `"ownMessage" | "otherMessage"`,
            description: "Theme to use for styling the bubble.",
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
          {
            name: "errorMsg",
            type: "React.ReactNode",
            description: "Optional prop to show an error message under a bubble.",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
