import assert from "assert";
import React from "react";
import sinon from "sinon";
import {shallow} from "enzyme";
import {Modal} from "../src";

describe("Modal", () => {
  it("renders the background, modal window, title, and contents", () => {
    const modal = shallow(
      <Modal title="My Title" closeModal={() => {}} >
        <div>Example Content</div>
      </Modal>
    );
    const background = modal.find("div.Modal--background");
    const windoe = modal.find("div.Modal--window");
    const header = modal.find("header.Modal--header");
    const content = modal.find("div.Modal--window--content");
    assert.equal(background.length, 1);
    assert.equal(windoe.length, 1);
    assert.deepEqual(windoe.prop("style"), {marginLeft: "-200px", width: "400px"});
    assert.equal(header.length, 1);
    assert.equal(header.find("h2").length, 1);
    assert.equal(header.find("h2").text(), "My Title");
    assert.equal(content.length, 1);
    assert.equal(content.text(), "Example Content");
  });

  it("calls closeModal when the background is clicked", () => {
    const stub = sinon.stub();
    const modal = shallow(<Modal title="Title" content={<p>Content</p>} closeModal={stub}>
      <p>Hi</p>
    </Modal>);
    const background = modal.find(".Modal--background");
    background.simulate("click");
    assert(stub.calledOnce);
  });
});
