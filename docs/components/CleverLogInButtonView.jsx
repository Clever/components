import React from "react";
import {Link} from "react-router";

import Example, {ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {CleverLogInButton} from "src";

let _focusExampleRef;

export default function CleverLogInButtonView() {
  const {cssClass} = CleverLogInButtonView;

  return (
    <View className={cssClass.CONTAINER} title="Clever Log In Button" sourcePath="src/CleverLogInButton/CleverLogInButton.jsx">
      <p>
        This is a log in button for our partners to use in their own applciations.
      </p>
      <Example title="Log in with Clever">
        <CleverLogInButton client_id={"clever"} redirect_uri={"https://clever.com"}/>
      </Example>


      <PropDocumentation
        availableProps={[
          {
            name: "value",
            type: "string",
            description: "The text that appears on the button",
          },
          {
            name: "type",
            type: "String",
            description: "One of primary, secondary, destructive, link, linkPlain, plain",
            defaultValue: "secondary",
          },
          {
            name: "size",
            type: "String",
            description: "One of large, regular, small",
            defaultValue: "regular",
          },
          {
            name: "onClick",
            type: "Function",
            description: "Called when the user clicks on the button",
            optional: true,
          },
          {
            name: "href",
            type: "String",
            description: "If provided, cause the button to behave as a link",
            optional: true,
          },
          {
            name: "target",
            type: "String",
            description: "For links, either _self or _blank",
            defaultValue: "_blank",
            optional: true,
          },
          {
            name: "disabled",
            type: "Bool",
            description: "User interaction is disabled when true",
            defaultValue: "false",
            optional: true,
          },
          {
            name: "style",
            type: "Object",
            description: "Add custom styles (e.g. margin) if you must",
            optional: true,
          },
          {
            name: "className",
            type: "string",
            description: "Optional additional classname to apply to the button",
            optional: true,
          },
        ]}
        className={cssClass.PROPS}
      />
    </View>
  );
}

CleverLogInButtonView.cssClass = {
  CONTAINER: "CleverLogInButtonView",
};
