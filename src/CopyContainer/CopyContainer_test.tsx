import * as React from "react";
import {shallow} from "enzyme";

import * as CopyToClipboard from "react-copy-to-clipboard";
import CopyContainer from "./CopyContainer";
import {Button} from "../Button/Button";

describe("CopyContainer", () => {
  const {cssClass} = CopyContainer;

  it("renders", () => {
    const copyContainer = shallow(
      <CopyContainer copyText="Text to copy">Text to display</CopyContainer>,
    );

    expect(copyContainer.props().className).toMatch(cssClass.CONTAINER);
    expect(copyContainer.find(CopyToClipboard).length).toBe(1);
    expect(copyContainer.find(Button).length).toBe(1);
    expect(copyContainer.html()).toContain("Text to display")

    const copyToClipboard = copyContainer.find(CopyToClipboard);
    expect(copyToClipboard.props().text).toBe("Text to copy");
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <CopyContainer className="my--custom--class">
        Test Content
      </CopyContainer>,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });
});
