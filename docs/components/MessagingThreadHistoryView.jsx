import * as React from "react";
import moment from "moment";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { MessagingThreadHistory, FlexBox, ItemAlign, Button, MessagingBubble, Label } from "src";

import "./MessagingThreadHistoryView.less";

const cssClass = {
  BETA: "MessagingThreadHistoryView--beta",
  CONFIG_CONTAINER: "MessagingThreadHistoryView--configContainer",
  CONFIG_OPTIONS: "MessagingThreadHistoryView--configOptions",
  CONFIG: "MessagingThreadHistoryView--config",
  CONFIG_TOGGLE: "MessagingThreadHistoryView--configToggle",
  CONTAINER: "MessagingThreadHistoryView",
  INTRO: "MessagingThreadHistoryView--intro",
  PROPS: "MessagingThreadHistoryView--props",
};

// Start with an older time so we can better display the day separators.
// We display any dates in the future as "today".
const newestTime = moment().subtract(1, "week");
let currentMessageIndex = -1;

function randomElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function newMessage(displayAlertMessageAfter = false) {
  const message = randomElement(["Hello!", "Hi!", "How are you doing?"]);
  const placement = randomElement(["left", "right"]);
  const errorMsg = randomElement(["Message failed to send", ""]);
  newestTime.add(6, "hours");
  currentMessageIndex++;
  return {
    content: (
      <MessagingBubble theme={placement === "left" ? "otherMessage" : "ownMessage"}>
        {message}
      </MessagingBubble>
    ),
    placement,
    timestamp: new Date(newestTime),
    index: currentMessageIndex,
    readStatusText: errorMsg ? "" : "Read",
    errorMsg,
    displayAlertMessageAfter: displayAlertMessageAfter && {
      icon: "check",
      messageText: "Invite accepted! This guardian can now reply to your messages!",
    },
  };
}

export default class MessagingThreadHistoryView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    messages: [
      {
        content: <b>This is a system message</b>,
        placement: "center",
      },
      newMessage(),
      newMessage(),
    ],
  };

  render() {
    const { messages } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="MessagingThreadHistory"
        sourcePath="src/MessagingThreadHistory/MessagingThreadHistory.tsx"
      >
        <header className={cssClass.INTRO}>
          <p className={cssClass.BETA}>
            <Label color="new-feature">Beta</Label> MessagingThreadHistory is in Beta and breaking
            changes may still be introduced.
          </p>
          <p>
            MessagingThreadHistory is a container for messages between users, in the form of
            MessagingBubble or other data.
          </p>
          <CodeSample>
            {`
              import {MessagingThreadHistory} from "clever-components";
              // OR
              import MessagingThreadHistory from "clever-components/dist/MessagingThreadHistory"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <MessagingThreadHistory threadID="abc" messages={messages} />
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  addMessage = () => {
    this.setState({ messages: [...this.state.messages, newMessage()] });
  };

  addMessageWithAlert = () => {
    this.setState({ messages: [...this.state.messages, newMessage(true)] });
  };

  _renderConfig() {
    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <Button type="primary" value="Add message" onClick={this.addMessage} />
        <Button type="primary" value="Add message with alert" onClick={this.addMessageWithAlert} />
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<MessagingThreadHistory /> Props"
        availableProps={[
          {
            name: "threadID",
            type: "string",
            description:
              "A unique identifier for this thread. Used to update scrolling when the thread changes.",
          },
          {
            name: "messages",
            type: "MessageData[]",
            description: "The data for messages to display in the history.",
          },
          {
            name: "ref",
            type: "React.Ref<HTMLDivElement>",
            description:
              "Allows getting a ref to the underlying div container. Required for auto scrolling on new messages.",
            optional: true,
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "onScroll",
            type: "() => void",
            description:
              "Optional callback that triggers on user scroll. Does not provide event information.",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
