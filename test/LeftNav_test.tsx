import * as React from "react";
import { render, screen } from "@testing-library/react";
import { LeftNav } from "../src/LeftNav/LeftNav";
import { NavLink } from "../src/LeftNav/NavLink";

describe("LeftNav", function LeftNavTest() {
  const { NavGroup } = LeftNav;

  const fakeIcon = <img className="fakeIcon" src="iconSrc" />;

  const topNavLinkSpy = jest.fn();
  const subNavLinkSpy = jest.fn();

  const renderLeftNav = (props = {}) =>
    render(
      <LeftNav {...props}>
        <NavLink label="topLink1" icon={fakeIcon} onClick={topNavLinkSpy} />
        <NavGroup label="group1" id="group1" icon={fakeIcon}>
          <NavLink label="subLink11" onClick={subNavLinkSpy} />
          <NavLink label="subLink12" />
        </NavGroup>
        <NavLink label="topLink2" icon={fakeIcon} />
        <NavGroup label="group2" id="group2" icon={fakeIcon}>
          <NavLink label="subLink21" />
          <NavLink label="subLink22" />
        </NavGroup>
      </LeftNav>,
    );

  describe("initially", () => {
    beforeEach(() => {
      renderLeftNav();
    });

    it("renders nav", () => {
      screen.getByRole("navigation");
    });

    it("renders top nav with NavLinks and NavGroups", () => {
      expect(screen.getAllByRole("group")).toHaveLength(2);
      expect(screen.getAllByRole("menuitem")).toHaveLength(2);
    });

    it("doesn't render the subnav drawer initially", () => {
      expect(screen.queryAllByRole("menu")).toHaveLength(1);
    });

    it("calls the onClick handler when a topnav NavLink is clicked", () => {
      screen.getAllByRole("menuitem")[0].click();
      expect(topNavLinkSpy).toHaveBeenCalledTimes(1);
    });

    it("opens the subnav drawer and renders the children NavLinks when a NavGroup is clicked", () => {
      screen.getAllByRole("group")[0].click();
      expect(screen.getAllByRole("menu")).toHaveLength(2);
    });
  });

  describe("when the subnav drawer is open", () => {
    beforeEach(() => {
      renderLeftNav();
      screen.getByText("group1").click();
    });

    it("calls the onClick handler when a subnav NavLink is clicked", () => {
      screen.getByText("subLink11").click();
      expect(subNavLinkSpy).toHaveBeenCalledTimes(1);
      // And the drawer stays open
      expect(screen.getAllByRole("menu")).toHaveLength(2);
    });

    it("closes the subnav drawer when the open NavGroup is clicked", () => {
      screen.getByText("group1").click();
      expect(screen.queryAllByRole("menu")).toHaveLength(1);
    });

    it("closes the subnav drawer when a topnav NavLink is clicked", () => {
      screen.getByText("topLink1").click();
      expect(screen.queryAllByRole("menu")).toHaveLength(1);
    });

    it("rerenders the subnav drawer when a different NavGroup is clicked", () => {
      screen.getByText("group2").click();
      expect(screen.getAllByRole("menu")).toHaveLength(2);
      screen.getByText("subLink21");
    });
  });

  describe("when a topnav NavLink is selected", () => {
    it("renders the NavLink with the 'selected' class", () => {
      render(
        <LeftNav>
          <NavLink selected label="topLink1" icon={fakeIcon} />
        </LeftNav>,
      );
      screen.getByRole("menuitem", { current: "page", name: "topLink1" });
    });
  });

  describe("when a subnav NavLink is selected", () => {
    beforeEach(() => {
      render(
        <LeftNav>
          <NavLink label="topLink1" icon={fakeIcon} />
          <NavGroup label="group1" id="group1" icon={fakeIcon}>
            <NavLink selected label="subLink11" />
          </NavGroup>
          <NavGroup label="group2" id="group2" icon={fakeIcon}>
            <NavLink label="subLink21" />
          </NavGroup>
        </LeftNav>,
      );
    });

    it("renders the subnav drawer corresponding to the link's parent NavGroup", () => {
      expect(screen.getAllByRole("menu")).toHaveLength(2);
      expect(screen.getByText("subLink11"));
    });

    it("renders the NavLink with the 'selected' class", () => {
      screen.getByRole("menuitem", { current: "page", name: "subLink11" });
    });
  });

  describe("when collapsed", () => {
    it("renders all nav items collapsed", () => {
      renderLeftNav({ collapsed: true });
      expect(screen.getAllByRole("menuitem")).toHaveLength(2);
      expect(screen.getAllByRole("group")).toHaveLength(2);
      expect(screen.queryAllByRole("menuitem", { name: /Link/ })).toHaveLength(0);
    });
  });
});
