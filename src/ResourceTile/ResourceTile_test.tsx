import * as assert from "assert";
import { shallow } from "enzyme";
import * as React from "react";

import { ResourceLinkView } from "./ResourceLinkView";

const SPINNER_CSS_CLASS = "processing--spinner";

describe("Resource Link", () => {
  function renderComponent() {
    return shallow(<ResourceLinkView icon="zelda.png" title="Zelda" url="https://zelda.com" />);
  }

  it("displays a title", () => {
    const title = renderComponent().find(".ResourceLink--title");
    assert.equal(title.text(), "Zelda");
  });

  it("displays an icon", () => {
    const icon = renderComponent().find(".ResourceLink--icon");
    assert.equal(icon.prop("src"), "zelda.png");
  });

  it("does not display a processing indicator", () => {
    const processing = renderComponent().find(`.${SPINNER_CSS_CLASS}`);
    assert.equal(processing.length, 0);
  });
});
