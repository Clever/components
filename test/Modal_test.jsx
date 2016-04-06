/* eslint func-names: "off" */

var assert = require("assert");
var React = require("react");
var sinon = require("sinon");
var TestUtils = require("react-addons-test-utils");

import {Modal} from "../";

describe("Modal", function () {
  var exampleModal = (
    <Modal title="My Title">
      <div>Example Content</div>
    </Modal>
  );

  var shallowRenderer = TestUtils.createRenderer();

  beforeEach(() => {
    this.renderModal = (modal = exampleModal) => {
      shallowRenderer.render(modal);
      this.modal = shallowRenderer.getRenderOutput();
    };
    this.renderModal();
  });

  it("renders the background, modal window, title, and contents", () => {
    var background = this.modal.props.children[0];
    assert.equal(background.type, "div");
    assert.equal(background.props.className, "Modal--background");

    var modalWindow = this.modal.props.children[1];
    assert.equal(modalWindow.type, "div");
    assert.equal(modalWindow.props.className, "Modal--window");
    assert.equal(modalWindow.props.style.width, "400px");

    var title = modalWindow.props.children.props.children[0];
    assert.equal(title.type, "h2");
    assert.equal(title.props.children, "My Title");

    var content = modalWindow.props.children.props.children[1];
    assert.equal(content.type, "div");
    assert.equal(content.props.children, "Example Content");
  });

  it("calls closeModal when the background is clicked", () => {
    var stub = sinon.stub();
    this.renderModal(<Modal title="Title" content={<p>Content</p>} closeModal={stub} />);
    var background = this.modal.props.children[0];
    background.props.onClick();
    this.renderModal();
    assert(stub.calledOnce);
  });
});
