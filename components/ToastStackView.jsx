import * as React from "react";

import {Button, FlexBox, ItemAlign, SegmentedControl, ToastStack, ToastType} from "src";
import Example, {CodeSample, ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";

import "./ToastStackView.less";

const cssClass = {
  CONFIG_CONTAINER: "ToastStackView--configContainer",
  CONFIG_OPTIONS: "ToastStackView--configOptions",
  CONFIG: "ToastStackView--config",
  CONFIG_TOGGLE: "ToastStackView--configToggle",
  CONTAINER: "ToastStackView",
  INTRO: "ToastStackView--intro",
  PROPS: "ToastStackView--props",
  TOAST_STACK: "ToastStackView--toastStack",
};

const messageMap = {
  [ToastType.ERROR]: "burnt",
  [ToastType.INFO]: "high in fiber",
  [ToastType.PROCESSING]: "toasting...",
  [ToastType.SUCCESS]: "ready!",
  [ToastType.WARNING]: "slightly burnt",
};

const actionType = `{
  text: string,
  href?: string,
  onClick?: Function,
}`;

export default class ToastStackView extends React.PureComponent {
  static cssClass = cssClass;

  state = {
    durationOverride: "No override",
    id: 0,
    includeAction: false,
    notifications: [],
    showCloseButton: true,
    toastType: ToastType.SUCCESS,
  };

  _clearNotification = (id) => {
    const {notifications} = this.state;

    this.setState({notifications: notifications.filter(n => n.id !== id)});
  }

  render() {
    const {
      durationOverride,
      id,
      includeAction,
      notifications,
      showCloseButton,
      toastType,
    } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="ToastStack"
        sourcePath="src/ToastStack/ToastStack.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>
            Toast notifications can be used to provide feedback in response to user interactions.
            The <code>ToastStack</code> renders toast notifications and handles their enter/leave
            animations.
          </p>
          <CodeSample>{`
            import {ToastStack, ToastType} from "clever-components";
          `}</CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <ToastStack
              className={cssClass.TOAST_STACK}
              notifications={notifications}
              clearNotification={
                // Internally, `this._clearNotification` performs:
                // this.setState({notifications: notifications.filter(n => n.id !== id)});
                this._clearNotification}
              defaultNotificationDurationMS={5000}
            />
            <Button
              value="Create notification"
              onClick={() => this.setState({
                id: id + 1,
                notifications: [...notifications, {
                  id,
                  type: toastType,
                  content: <span>Your toast is {messageMap[toastType]}</span>,
                  action: includeAction ? {
                    text: "Butter it",
                    onClick: () => console.log("Buttering"),
                  } : undefined,
                  showCloseButton,
                  durationMS: durationOverride === "No override" ? undefined : durationOverride,
                }],
              })}
            />
            {" "}
            <Button
              value="Clear all notifications"
              onClick={() => this.setState({notifications: []})}
            />
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderToastStackProps()}
        {this._renderNotificationDefinition()}
      </View>
    );
  }

  _renderConfig() {
    const {
      durationOverride,
      includeAction,
      showCloseButton,
      toastType,
    } = this.state;

    return (
      <FlexBox alignItems={ItemAlign.CENTER} className={cssClass.CONFIG_CONTAINER} wrap>
        <div className={cssClass.CONFIG}>
          Toast type:
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            options={[
              {content: "error", value: ToastType.ERROR},
              {content: "info", value: ToastType.INFO},
              {content: "processing", value: ToastType.PROCESSING},
              {content: "success", value: ToastType.SUCCESS},
              {content: "warning", value: ToastType.WARNING},
            ]}
            value={toastType}
            onSelect={value => this.setState({toastType: value})}
          />
        </div>
        <label className={cssClass.CONFIG}>
          <input
            className={cssClass.CONFIG_TOGGLE}
            type="checkbox"
            checked={includeAction}
            onChange={e => this.setState({includeAction: e.target.checked})}
          />{" "}Include action
        </label>
        <label className={cssClass.CONFIG}>
          <input
            className={cssClass.CONFIG_TOGGLE}
            type="checkbox"
            checked={showCloseButton}
            onChange={e => this.setState({showCloseButton: e.target.checked})}
          />{" "}Show close button
        </label>
        <div>
        <div className={cssClass.CONFIG}>
          Toast duration override (milliseconds):
          <SegmentedControl
            className={cssClass.CONFIG_OPTIONS}
            options={[
              {content: "500", value: 500},
              {content: "5000", value: 5000},
              {content: "Infinity", value: Infinity},
              {content: "No override", value: "No override"},
            ]}
            value={durationOverride}
            onSelect={value => this.setState({durationOverride: value})}
          />
        </div>
        </div>
      </FlexBox>
    );
  }

  _renderToastStackProps() {
    return (
      <PropDocumentation
        title="<ToastStack /> Props"
        availableProps={[
          {
            name: "className",
            type: "string",
            description: "An additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "clearNotification",
            type: "(id: number) => void",
            description: "A function that clears the specified notification. Important gotcha: " +
              "This function may be run with a timer, so make sure that the function doesn't " +
              "use references that could go stale.",
          },
          {
            name: "defaultNotificationDurationMS",
            type: "number",
            description: "The default duration for notifications in milliseconds. Can be set to " +
              "`Infinity`.",
            optional: true,
            defaultValue: "5000",
          },
          {
            name: "notificationClassName",
            type: "string",
            description: "An additional CSS class name to apply to notifications.",
            optional: true,
          },
          {
            name: "notifications",
            type: "Array<Notification>",
            description: "The notifications to be rendered. See the table below for the fields " +
              "in a `Notification` object.",
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }

  _renderNotificationDefinition() {
    return (
      <PropDocumentation
        title="Notification Definition"
        availableProps={[
          {
            name: "action",
            type: <code><pre>{actionType}</pre></code>,
            description: "If present, the notification will include an action button.",
            optional: true,
          },
          {
            name: "content",
            type: "Node",
            description: "The notification content.",
          },
          {
            name: "durationMS",
            type: "number",
            description: "An override of the <ToastStack>'s `defaultNotificationDurationMS`. " +
              "Can be set to `Infinity`.",
            optional: true,
          },
          {
            name: "id",
            type: "number",
            description: "A unique identifier to track the notification.",
          },
          {
            name: "showCloseButton",
            type: "boolean",
            description: "If true, the notification will include a close button.",
            optional: true,
            defaultValue: "true",
          },
          {
            name: "type",
            type: "string",
            description: <p>
              The type of the notification. One of:<br />
              {Object.keys(ToastType).map(type =>
                <span key={type}><code>ToastType.{type}</code><br /></span>)}
            </p>,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
