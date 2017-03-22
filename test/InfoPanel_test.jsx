import assert from "assert";
import React from "react";
import {shallow} from "enzyme";
import {InfoPanel} from "../src";


describe("InfoPanel", () => {
  const {cssClass} = InfoPanel;

  it("adds custom className if specified", () => {
    const panel = shallow(<InfoPanel className="custom" title="Panel Title" />);
    assert(panel.hasClass("custom"));
  });

  it("renders title", () => {
    const panel = shallow(<InfoPanel title="Panel Title" />);
    assert.equal(panel.find(`.${cssClass.TITLE}`).text(), "Panel Title");
  });

  it("renders content", () => {
    const content = <div>Panel Content</div>;
    const panel = shallow(<InfoPanel title="Panel Title">{content}</InfoPanel>);
    assert(panel.find(`.${cssClass.CONTENT}`).containsMatchingElement(content));
  });
});
