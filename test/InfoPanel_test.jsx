import assert from "assert";
import React from "react";
import {shallow, render} from "enzyme";
import {InfoPanel} from "../src";


describe("InfoPanel", () => {
  const {cssClass} = InfoPanel;

  it("adds custom className if specified", () => {
    const panel = shallow(<InfoPanel className="custom" title="Panel Title" />);
    assert(panel.hasClass("custom"));
  });

  it("renders title in the Collapsible trigger", () => {
    const panel = render(<InfoPanel title="Panel Title" />);
    assert.equal(panel.find(`.${cssClass.HEADER_OPEN}`).children().text(),
      "Panel Title");
  });

  it("has is-closed class from react-collapsible when defaultOpen is false", () => {
    const content = <div>Panel Content</div>;
    const panel = render(<InfoPanel title="Panel Title" collapsible defaultOpen={false}>{content}</InfoPanel>);
    assert(panel.find(`.${cssClass.HEADER_CLOSED}`).hasClass("is-closed"));
  });

  it("has is-open class from react-collapsible when defaultOpen is false", () => {
    const content = <div>Panel Content</div>;
    const panel = render(<InfoPanel title="Panel Title" collapsible defaultOpen>{content}</InfoPanel>);
    assert(panel.find(`.${cssClass.HEADER_OPEN}`).hasClass("is-open"));
  });

  it("renders content", () => {
    const content = <div>Panel Content</div>;
    const panel = render(<InfoPanel title="Panel Title">{content}</InfoPanel>);
    assert.equal(panel.find(".Collapsible__contentInner").children().length, 1);
    assert.equal(panel.find(".Collapsible__contentInner").children().text(), "Panel Content");
  });
});
