import loremIpsum from "lorem-ipsum";
import React, { Component } from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { ModalButton } from "src";

export default class ModalButtonView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { cssClass } = ModalButtonView;

    return (
      <View
        className={cssClass.CONTAINER}
        title="ModalButton"
        sourcePath="src/ModalButton/ModalButton.tsx"
      >
        <p>
          This component is a <code>Button</code> that triggers the appearance of a modal when
          clicked.
        </p>

        <Example>
          <ModalButton
            type="primary"
            modalTitle="Helpful info"
            onClick={() => console.log("ModalButton: modal opened!")}
            onClose={() => console.log("ModalButton: modal closed!")}
            value="More info"
          >
            <p>{loremIpsum({ count: 1, units: "paragraphs" })}</p>
            <p>{loremIpsum({ count: 1, units: "paragraphs" })}</p>
          </ModalButton>
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "modalTitle",
              type: "string",
              description: "Header text for the modal",
            },
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
              name: "submit",
              type: "Bool",
              description: "Behaves as a submit button when true",
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
}

ModalButtonView.cssClass = {
  CONTAINER: "ModalButtonView",
};
