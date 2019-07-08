import * as assert from "assert";
import * as React from "react";
import { shallow } from "enzyme";
import * as lodash from "lodash";
import { Icon } from "../src";

describe("Icon", () => {
  const names = lodash.values(Icon.names);
  const sizes = ["small", "medium", "large"];

  names.forEach(name => {
    sizes.forEach(size => {
      // We're currently missing three icons
      if (
        size === "large" &&
        (name === "microphone" || name === "mobile-apps" || name === "typewriter")
      ) {
        return;
      }

      it(`renders the ${name} icon in size ${size} with correct classes`, () => {
        const icon = shallow(<Icon name={name} size={size} />);
        assert(icon.hasClass("Icon"));
        assert(icon.hasClass(`Icon--${size}`));
        const svg = icon.find("svg");
        assert(svg);
      });
    });
  });
});
