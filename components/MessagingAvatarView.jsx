import * as React from "react";

import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import Colors from "src/utils/Colors";
import { MessagingAvatar, convertNameToInitials } from "src";

import "./MessagingAvatarView.less";

const cssClass = {
  CONFIG_CONTAINER: "MessagingAvatarView--configContainer",
  CONFIG_OPTIONS: "MessagingAvatarView--configOptions",
  CONFIG: "MessagingAvatarView--config",
  CONFIG_TOGGLE: "MessagingAvatarView--configToggle",
  CONTAINER: "MessagingAvatarView",
  INTRO: "MessagingAvatarView--intro",
  PROPS: "MessagingAvatarView--props",
};

export default class MessagingAvatarView extends React.PureComponent {
  static cssClass = cssClass;

  render() {
    return (
      <View
        className={cssClass.CONTAINER}
        title="MessagingAvatar"
        sourcePath="src/MessagingAvatar/MessagingAvatar.tsx"
      >
        <header className={cssClass.INTRO}>
          <p>MessagingAvatar is to be used for displaying a user's avatar.</p>
          <CodeSample>
            {`
              import {MessagingAvatar} from "clever-components";
              // OR
              import MessagingAvatar from "clever-components/dist/MessagingAvatar"; // Avoids importing all of clever-components.
            `}
          </CodeSample>
        </header>

        <Example title="Basic Usage:">
          <ExampleCode>
            <MessagingAvatar
              text={convertNameToInitials("Kristen Stark")}
              color={{ color: Colors.PRIMARY_BLUE_TINT_2 }}
            />
            <br />
            <MessagingAvatar
              text={convertNameToInitials("Kristen Stark")}
              color={{ seed: "52c5e9d0e6ed0694212d69ed" }}
            />
            <br />
            <MessagingAvatar
              text={convertNameToInitials("Dewey the Fox")}
              color={{ seed: "52c5e9d0e6ed0694212d69ed" }}
              imageSrc="./assets/img/avatar-sample.png"
            />
          </ExampleCode>
          {this._renderConfig()}
        </Example>

        {this._renderProps()}
      </View>
    );
  }

  _renderConfig() {}

  // TODO: Update prop documentation.
  _renderProps() {
    return (
      <PropDocumentation
        title="<MessagingAvatar /> Props"
        availableProps={[
          {
            name: "text",
            type: "string",
            description: "Text to display for the avatar's name",
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional CSS class name to apply to the container.",
            optional: true,
          },
          {
            name: "color",
            type: "{color: string} | {seed: string}",
            description:
              "An object containing either the color to use a seed for determining the color. If used, seed should be consistent for a given user.",
          },
          {
            name: "imageSrc",
            type: "string",
            description:
              "Optional image source URL. If provided, the image will be display instead of the text/color.",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    );
  }
}
