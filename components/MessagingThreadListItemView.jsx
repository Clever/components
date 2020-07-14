import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { MessagingThreadListItem, FlexBox, ItemAlign, SegmentedControl, Icon } from "src";
import { MessagingNewThread } from "src/MessagingNewThread/MessagingNewThread";

import "./MessagingThreadListItemView.less";

const cssClass = {
  CONFIG_CONTAINER: "MessagingThreadListItemView--configContainer",
  CONFIG_OPTIONS: "MessagingThreadListItemView--configOptions",
  CONFIG: "MessagingThreadListItemView--config",
  CONFIG_TOGGLE: "MessagingThreadListItemView--configToggle",
  CONTAINER: "MessagingThreadListItemView",
  INTRO: "MessagingThreadListItemView--intro",
  PROPS: "MessagingThreadListItemView--props",
};

export default class MessagingThreadListItemView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    status: "active",
    hasDraft: false,
    isRead: true,
    selected: true,
  };

  render() {
    const { status, hasDraft, isRead, selected } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="MessagingThreadListItem"
        sourcePath="src/MessagingThreadListItem/MessagingThreadListItem.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>
            MessagingThreadListItem is used for showing a preview of a single thread in a list of
            them.
          </p>
          <CodeSample>
            {`
              import {MessagingThreadListItem} from "clever-components";
              // OR
              import MessagingThreadListItem from "clever-components/dist/MessagingThreadListItem"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <MessagingThreadListItem
              icon={<Icon name="smiley-face" />}
              title="Smiley Dude"
              status={status}
              hasDraft={hasDraft}
              isRead={isRead}
              selected={selected}
              timestamp={new Date()}
            >
              This is some content!
            </MessagingThreadListItem>
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {
    const { status, hasDraft, isRead, selected } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Status:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            onSelect={value => this.setState({ status: value })}
            options={[{ content: "Active", value: "active" }, { content: "Off", value: "off" }]}
            value={status}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={hasDraft}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ hasDraft: e.target.checked })}
          />{" "}
          Has Draft
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={isRead}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ isRead: e.target.checked })}
          />{" "}
          Is Read
        </label>
        <label className={cssClass.CONFIG}>
          <input
            type="checkbox"
            checked={selected}
            className={cssClass.CONFIG_TOGGLE}
            onChange={e => this.setState({ selected: e.target.checked })}
          />{" "}
          Selected
        </label>
      </FlexBox>
    );
  }

  _renderProps() {
    return (
      <PropDocumentation
        title="<MessagingThreadListItem /> Props"
        availableProps={[
          {
            name: "children",
            type: "React.Node",
            description: "MessagingThreadListItem content.",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "hasDraft",
            type: "boolean",
            description: "Whether this thread has a draft in progress.",
          },
          {
            name: "icon",
            type: "React.ReactNode",
            description: "The icon to display associated with this thread.",
          },
          {
            name: "isRead",
            type: "boolean",
            description: "Whether this thread has been read.",
          },
          {
            name: "offStatusText",
            type: "string",
            description: "Text to display if the status of this thread is 'off'.",
            optional: true,
          },
          {
            name: "onClick",
            type: "(event: React.MouseEvent) => void",
            description: "Function to call when clicked.",
            optional: true,
          },
          {
            name: "selected",
            type: "boolean",
            description: "Whether this thread is currently selected.",
          },
          {
            name: "status",
            type: "'active' | 'off'",
            description: "The status of this thread.",
          },
          {
            name: "timestamp",
            type: "Date",
            description: "The time to display for this thread.",
          },
          {
            name: "title",
            type: "string",
            description: "The title of this thread",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
