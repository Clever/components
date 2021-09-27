import loremIpsum from "lorem-ipsum";
import React, { Component } from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Button, Modal } from "src";

export default class ModalView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { cssClass } = ModalView;

    return (
      <View className={cssClass.CONTAINER} title="Modal" sourcePath="src/Modal/Modal.tsx">
        <p>
          This component wraps your content and displays it in a modal and obscures the underlying
          content.
        </p>

        <Example>
          <Button
            type="primary"
            onClick={() => this.setState({ isModalOpen: true })}
            value="Open Modal"
          />
          {this.state.isModalOpen && (
            <Modal
              title={
                <span id="id-for-arialabeledby-on-another-component-for-accessibility">
                  Hello Modal
                </span>
              }
              closeModal={() => this.setState({ isModalOpen: false })}
            >
              <p>{loremIpsum({ count: 1, units: "paragraphs" })}</p>
              <p>{loremIpsum({ count: 1, units: "paragraphs" })}</p>
              <footer>
                <Button
                  value="Never mind"
                  type="link"
                  onClick={() => this.setState({ isModalOpen: false })}
                />
                <Button
                  value="Sounds good"
                  type="primary"
                  onClick={() => this.setState({ isModalOpen: false })}
                />
              </footer>
            </Modal>
          )}
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "children",
              type: "Node",
              description: "The content to render within the modal",
            },
            {
              name: "className",
              type: "String",
              description: "Any additional classes to add to Modal",
              optional: true,
            },
            {
              name: "closeModal",
              type: "Function",
              description: "Called when the user clicks outside the modal",
            },
            {
              name: "title",
              type: "Node",
              description: "The title of the modal",
            },
            {
              name: "width",
              type: "Number",
              description: "The width of the modal",
              defaultValue: "400px",
              optional: true,
            },
            {
              name: "focusLocked",
              type: "Boolean",
              description: "Whether or not focus stays within the modal when tabbing",
              defaultValue: "true",
              optional: true,
            },
            {
              name: "createPortal",
              type: "Boolean",
              description:
                "Whether or not to render the modal into document.body through react portal (if supported)",
              defaultValue: "true",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="Modal"
        />
      </View>
    );
  }
}

ModalView.cssClass = {
  CONTAINER: "ModalView",
};
