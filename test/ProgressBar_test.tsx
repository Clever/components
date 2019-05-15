import { mount } from "enzyme";
import * as React from "react";

import { ProgressBar } from "../src/";

describe("ProgressBar Component", () => {
  describe("Given a label type string", () => {
    it("renders the provided label", () => {
      const component = mount(<ProgressBar labelType="Foo Bar" showLabel="top-left" />);
      expect(component.html()).toMatch("Foo Bar");
    });
  });

  describe("Given a label type percentage and a fill number", () => {
    it("renders the label as a fill percentage", () => {
      const component = mount(
        <ProgressBar labelType="percentage" fill={23} showLabel="top-left" />,
      );
      expect(component.html()).toMatch("23%");
    });
  });

  describe("Given a label type and a label attribute", () => {
    it("prefers the label attribute", () => {
      const component = mount(
        <ProgressBar labelType="Label Type" label="My Label" showLabel="top-left" />,
      );
      expect(component.html()).toMatch("My Label");
    });
  });
});
