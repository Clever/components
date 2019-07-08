/* eslint func-names: "off" */

import * as assert from "assert";
import * as React from "react";
import * as sinon from "sinon";
import { mount, shallow } from "enzyme";
import { Button, Modal, ModalButton } from "../src";

describe("ModalButton", () => {
  const sizes = ["small", "regular", "large"];
  const types = ["primary", "secondary", "destructive", "link"];

  it("renders a <button> element with [type=button]", () => {
    const modalButton = shallow(
      <ModalButton value="A modal button" modalTitle="A title">
        <p>Hello</p>
      </ModalButton>,
    );
    assert.equal(modalButton.find(Button).length, 1);
    assert.equal(modalButton.find(Button).props().value, "A modal button");
  });

  sizes.forEach(size => {
    types.forEach(type => {
      if (size === "small" && type === "destructive") return;

      it(`renders a ${size}, ${type} button with the correct classes`, () => {
        const modalButton = shallow(
          <ModalButton size={size as any} type={type as any} value="A button" modalTitle="A title">
            <p>Hello</p>
          </ModalButton>,
        );
        assert(modalButton.hasClass("ModalButton"));
        assert.equal(modalButton.find(Button).props().size, size);
        assert.equal(modalButton.find(Button).props().type, type);
      });
    });
  });

  it("shows the modal when clicked", () => {
    const modalButton = shallow(
      <ModalButton value="A modal button" modalTitle="A title">
        <p>Hello</p>
      </ModalButton>,
    );
    assert(!modalButton.state("showingModal"));
    modalButton.find(Button).simulate("click");
    assert(modalButton.state("showingModal"));
  });

  it("shows the modal and, if present, calls the onClick handler when clicked", () => {
    const onClickSpy = sinon.spy();
    const modalButton = shallow(
      <ModalButton value="A modal button" modalTitle="A title" onClick={onClickSpy}>
        <p>Hello</p>
      </ModalButton>,
    );
    assert(!modalButton.state("showingModal"));
    modalButton.find(Button).simulate("click");
    assert(modalButton.state("showingModal"));
    assert(onClickSpy.calledOnce);
  });

  it("hides the modal when X is clicked", () => {
    const modalButton = mount(
      <ModalButton value="A modal button" modalTitle="A title">
        <p>Hello</p>
      </ModalButton>,
    );
    assert(!modalButton.state("showingModal"));
    modalButton.find(Button).simulate("click");
    assert(modalButton.state("showingModal"));
    modalButton
      .find(Modal)
      .find(".Modal--close")
      .simulate("click");
    assert(!modalButton.state("showingModal"));
  });

  it("hides the modal and, if present, calls the onClose handler when X is clicked", () => {
    const onCloseSpy = sinon.spy();
    const modalButton = mount(
      <ModalButton value="A modal button" modalTitle="A title" onClose={onCloseSpy}>
        <p>Hello</p>
      </ModalButton>,
    );
    assert(!modalButton.state("showingModal"));
    modalButton.find(Button).simulate("click");
    assert(modalButton.state("showingModal"));
    modalButton
      .find(Modal)
      .find(".Modal--close")
      .simulate("click");
    assert(!modalButton.state("showingModal"));
    assert(onCloseSpy.calledOnce);
  });
});
