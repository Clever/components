import React, {Component} from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {ConfirmationButton} from "src";


export default class ConfirmationButtonView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {cssClass} = ConfirmationButtonView;

    return (
      <View className={cssClass.CONTAINER} title="ConfirmationButton">
        <Example
          code={`
            <ConfirmationButton
              type="primary"
              confirmButtonType="destructive"
              modalTitle="Are you sure?"
              onClick={() => console.log("ConfirmationButton: modal opened!")}
              onClose={() => console.log("ConfirmationButton: modal closed!")}
              onConfirm={() => console.log("ConfirmationButton: confirmed!")}
              value="Submit for confirmation"
            >
              <p>This action requires confirmation. Please confirm!</p>
            </ConfirmationButton>
          `}
        >
          <ConfirmationButton
            type="primary"
            confirmButtonType="destructive"
            modalTitle="Are you sure?"
            onClick={() => console.log("ConfirmationButton: modal opened!")}
            onClose={() => console.log("ConfirmationButton: modal closed!")}
            onConfirm={() => console.log("ConfirmationButton: confirmed!")}
            value="Submit for confirmation"
          >
            <p>This action requires confirmation. Please confirm!</p>
          </ConfirmationButton>
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "modalTitle",
              type: "string",
              description: "Header text for the modal",
            },
            {
              name: "confirmButtonValue",
              type: "string",
              description: "The text that appears on the Confirm button",
            },
            {
              name: "confirmButtonType",
              type: "String",
              description: "One of primary, secondary, destructive, link, linkPlain, plain",
              defaultValue: "secondary",
            },
            {
              name: "confirmButtonSize",
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
              name: "onClose",
              type: "Function",
              description: "Called when the user closes the modal",
              optional: true,
            },
            {
              name: "onConfirm",
              type: "Function",
              description: "Called when the user clicks on the Confirm button",
              optional: true,
            },
            {
              name: "confirmButtonHref",
              type: "String",
              description: "If provided, cause the Confirm button to behave as a link",
              optional: true,
            },
            {
              name: "confirmButtonTarget",
              type:"String",
              description: "For links, either _self or _blank",
              defaultValue: "_blank",
              optional: true,
            },
            {
              name: "confirmButtonDisabled",
              type: "Bool",
              description: "User interaction is disabled when true",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "confirmButtonSubmit",
              type: "Bool",
              description: "Behaves as a submit button when true",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "confirmButtonStyle",
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
}

ConfirmationButtonView.cssClass = {
  CONTAINER: "ConfirmationButtonView",
};
