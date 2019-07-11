import React, { Component } from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { ConfirmationButton } from "src";

export default class ConfirmationButtonView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { cssClass } = ConfirmationButtonView;

    return (
      <View
        className={cssClass.CONTAINER}
        title="ConfirmationButton"
        sourcePath="src/ConfirmationButton/ConfirmationButton.tsx"
      >
        <p>
          This component is a <code>Button</code> that triggers the appearance of a modal with
          "Confirm" and "Cancel" buttons when clicked.
        </p>

        <Example>
          <ConfirmationButton
            type="primary"
            confirmButtonType="destructive"
            modalTitle="Are you sure?"
            onClick={e => console.log("ConfirmationButton: modal opened with events param!", e)}
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
              name: "value",
              type: "string",
              description: "The text that appears on the modal activation button",
            },
            {
              name: "modalTitle",
              type: "string",
              description: "Header text for the modal",
            },
            {
              name: "confirmButtonValue",
              type: "string",
              description: "The text that appears on the Confirm button",
              defaultValue: "Confirm",
              optional: true,
            },
            {
              name: "confirmButtonType",
              type: "String",
              description: (
                <div>
                  One of <code>primary</code>, <code>secondary</code>, <code>destructive</code>,{" "}
                  <code>link</code>, <code>linkPlain</code>, <code>plain</code>
                </div>
              ),
              defaultValue: "primary",
              optional: true,
            },
            {
              name: "confirmButtonSize",
              type: "String",
              description: (
                <div>
                  One of <code>large</code>, <code>regular</code>, <code>small</code>
                </div>
              ),
              defaultValue: "regular",
              optional: true,
            },
            {
              name: "modalWidth",
              type: "Number",
              description: "Width of the modal",
              defaultValue: "400px",
              optional: true,
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
              type: "String",
              description: (
                <div>
                  For links, either <code>_self</code> or <code>_blank</code>
                </div>
              ),
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
