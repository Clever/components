/* eslint func-names: "off" */

import * as assert from "assert";
import * as React from "react";
import * as sinon from "sinon";
import { mount } from "enzyme";
import { ModalButton, ConfirmationButton } from "../src";

describe("ConfirmationButton", () => {
  it("renders a modal with confirm and cancel buttons", () => {
    const confirmationButton = mount(
      <ConfirmationButton value="Confirm pl0x" modalTitle="A title">
        <p>Hello</p>
      </ConfirmationButton>,
    );
    assert.equal(confirmationButton.find(ModalButton).length, 1);

    confirmationButton.find("button").simulate("click"); // render the modal
    const dialog_buttons = confirmationButton.find(".ConfirmationButton--dialog-buttons");
    assert.equal(dialog_buttons.length, 1);
    assert.equal(dialog_buttons.find("button").length, 2);
    assert.equal(dialog_buttons.find("button").first().text(), "Cancel");
    assert.equal(dialog_buttons.find("button").last().text(), "Confirm");
    assert.equal(
      dialog_buttons.find("Button").last().props().type,
      ConfirmationButton.defaultProps.confirmButtonType,
    );
  });

  it("passes button types to the confirm button", () => {
    const confirmButtonType = "destructive";
    const confirmationButton = mount(
      <ConfirmationButton
        value="Confirm pl0x"
        modalTitle="A title"
        confirmButtonType={confirmButtonType}
      >
        <p>Hello</p>
      </ConfirmationButton>,
    );
    assert.equal(confirmationButton.find(ModalButton).length, 1);

    confirmationButton.find("button").simulate("click"); // render the modal
    const dialog_buttons = confirmationButton.find(".ConfirmationButton--dialog-buttons");
    assert.equal(dialog_buttons.length, 1);
    assert.equal(dialog_buttons.find("button").length, 2);
    assert.equal(dialog_buttons.find("button").first().text(), "Cancel");
    assert.equal(dialog_buttons.find("button").last().text(), "Confirm");
    assert.equal(dialog_buttons.find("Button").last().props().type, confirmButtonType);
  });

  it("calls onClose if present when cancel button clicked", () => {
    const onCloseSpy = sinon.spy();
    const confirmationButton = mount(
      <ConfirmationButton value="Confirm pl0x" modalTitle="A title" onClose={onCloseSpy}>
        <p>Hello</p>
      </ConfirmationButton>,
    );
    confirmationButton.find("button").simulate("click"); // render the modal
    const cancelButton = confirmationButton
      .find(".ConfirmationButton--dialog-buttons")
      .find("button")
      .first();
    cancelButton.simulate("click");
    assert(onCloseSpy.calledOnce);
  });

  it("calls onConfirm if present when confirm button clicked", () => {
    const onConfirmSpy = sinon.spy();
    const confirmationButton = mount(
      <ConfirmationButton value="Confirm pl0x" modalTitle="A title" onConfirm={onConfirmSpy}>
        <p>Hello</p>
      </ConfirmationButton>,
    );
    confirmationButton.find("button").simulate("click"); // render the modal
    const confirmButton = confirmationButton
      .find(".ConfirmationButton--dialog-buttons")
      .find("button")
      .last();
    confirmButton.simulate("click");
    assert(onConfirmSpy.calledOnce);
  });
});
