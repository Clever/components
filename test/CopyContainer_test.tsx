import * as React from "react";
import { shallow } from "enzyme";

import * as CopyToClipboard from "react-copy-to-clipboard";
import CopyContainer, { cssClass } from "../src/CopyContainer/CopyContainer";
import { Button } from "../src/Button/Button";

describe("CopyContainer", () => {
  it("renders", () => {
    const copyContainer = shallow(
      <CopyContainer copyText="Text to copy">Text to display</CopyContainer>,
    );

    expect(copyContainer.props().className).toMatch(cssClass.CONTAINER);
    expect(copyContainer.html()).toContain("Text to display");

    const button = copyContainer.find(Button);
    expect(button.props().value).toBe("Copy");

    const copyToClipboard = copyContainer.find(CopyToClipboard);
    expect(copyToClipboard.props().text).toBe("Text to copy");
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <CopyContainer className="my--custom--class">Test Content</CopyContainer>,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  it("supports customizing the button label", () => {
    const copyContainer = shallow(
      <CopyContainer copyText="Text to copy" buttonLabel="Custom button label">
        Text to display
      </CopyContainer>,
    );
    const button = copyContainer.find(Button);
    expect(button.props().value).toBe("Custom button label");
  });
});
