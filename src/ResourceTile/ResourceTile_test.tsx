import * as assert from "assert";
import { shallow } from "enzyme";
import * as React from "react";

import { ResourceTile } from "./ResourceTile";

const SPINNER_CSS_CLASS = "processing--spinner";

describe("Resource Link", () => {
  function renderComponent(icon: string) {
    return shallow(
      <ResourceTile
        icon={icon}
        title="Zelda"
        url="https://zelda.com"
        openInSameTab
        loadingSpinner={<div className={SPINNER_CSS_CLASS} />}
      />,
    );
  }

  it("displays a title", () => {
    const title = renderComponent("zelda.png").find(".ResourceTile--title");
    assert.equal(title.text(), "Zelda");
  });

  it("displays an icon", () => {
    const icon = renderComponent("zelda.png").find(".ResourceTile--icon");
    assert.equal(icon.prop("src"), "zelda.png");
  });

  it("displays a processing indicator when there's no icon", () => {
    const processing = renderComponent("").find(`.${SPINNER_CSS_CLASS}`);
    assert.equal(processing.length, 1);
  });

  it("does not display a processing indicator", () => {
    const processing = renderComponent("zelda.png").find(`.${SPINNER_CSS_CLASS}`);
    assert.equal(processing.length, 0);
  });
});
