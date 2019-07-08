import * as assert from "assert";
import * as React from "react";
import { shallow, render } from "enzyme";
import { InfoPanel } from "../src";

describe("InfoPanel", () => {
  const { cssClass } = InfoPanel;

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

  it("hides collapsible content when defaultOpen is false", () => {
    const content = <div>Panel Content</div>;
    const panel = render(
      <InfoPanel title="Panel Title" collapsible defaultOpen={false}>
        {content}
      </InfoPanel>,
    );
    assert(panel.find(".accordion__body").hasClass("accordion__body--hidden"));
  });

  it("shows collapsible content when defaultOpen is true", () => {
    const content = <div>Panel Content</div>;
    const panel = render(
      <InfoPanel title="Panel Title" collapsible defaultOpen>
        {content}
      </InfoPanel>,
    );
    assert(!panel.find(".accordion__body").hasClass("accordion__body--hidden"));
  });
});
