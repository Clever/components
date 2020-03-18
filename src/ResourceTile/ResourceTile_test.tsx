import * as assert from "assert";
import { shallow } from "enzyme";
import * as React from "react";

import { ResourceTile, Props } from "./ResourceTile";

const SPINNER_CSS_CLASS = "processing--spinner";

describe("Resource Link", () => {
  function renderComponent(icon: Props["icon"]) {
    return shallow(
      <ResourceTile icon={icon} title="Zelda" url="https://zelda.com" openInSameTab />,
    );
  }

  it("displays a title", () => {
    const title = renderComponent({ src: "zelda.png" }).find(".ResourceTile--title");
    assert.equal(title.text(), "Zelda");
  });

  it("displays an icon src", () => {
    const icon = renderComponent({ src: "zelda.png" }).find(".ResourceTile--icon");
    assert.equal(icon.prop("src"), "zelda.png");
  });

  it("displays an icon node", () => {
    const processing = renderComponent({ node: <div className={SPINNER_CSS_CLASS} /> }).find(
      `.${SPINNER_CSS_CLASS}`,
    );
    assert.equal(processing.length, 1);
  });
});
