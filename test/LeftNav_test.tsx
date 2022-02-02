import * as assert from "assert";
import * as React from "react";
import * as sinon from "sinon";
import { shallow } from "enzyme";
import { LeftNav, cssClass as navCss } from "../src/LeftNav/LeftNav";
import { NavLink, cssClass as linkCss } from "../src/LeftNav/NavLink";

describe("LeftNav", function LeftNavTest() {
  const { NavGroup } = LeftNav;

  const fakeIcon = <img className="fakeIcon" src="iconSrc" />;

  const topNavLinkSpy = sinon.spy();
  const subNavLinkSpy = sinon.spy();
  const mockEvent = {};

  const renderLeftNav = (props = {}) =>
    shallow(
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
    const nav = renderLeftNav();

    it("renders nav", () => {
      assert(nav.find("nav").exists());
    });

    it("renders top nav with NavLinks and NavGroups", () => {
      const topnav = nav.find(`.${navCss.TOPNAV}`);
      assert(topnav.exists());
      assert.equal(topnav.type(), "div");
      assert.equal(topnav.children().length, 4);
    });

    it("doesn't render the subnav drawer initially", () => {
      assert(!nav.find(`.${navCss.SUBNAV_CONTENT}`).exists());
    });

    it("renders topnav NavLink with label and icon", () => {
      const link = nav.find(NavLink).first().dive();
      assert.equal(link.type(), "button");

      const label = link.find(`.${linkCss.LABEL}`);
      assert(label.exists());
      assert.equal(label.text(), "topLink1");

      const icon = link.find(`.${fakeIcon.props.className}`);
      assert(icon.exists());
      assert.equal(icon.props().src, fakeIcon.props.src);
    });

    it("renders topnav NavGroup as a NavLink, without rendering its subnav children", () => {
      const group = nav.find(NavGroup).first().dive();
      const link = group.get(0);
      assert.equal(group.type(), NavLink);
      assert.equal(link.props.label, "group1");
      assert.equal(link.props.icon, fakeIcon);
      assert(!group.children().find(NavLink).exists());
    });

    it("calls the onClick handler when a topnav NavLink is clicked", () => {
      const link = nav.find(NavLink).first().dive();
      link.simulate("click", mockEvent);
      assert(topNavLinkSpy.calledOnce);
    });

    it("opens the subnav drawer and renders the children NavLinks when a NavGroup is clicked", () => {
      const group = nav.find(NavGroup).first().dive();
      group.simulate("click", mockEvent);
      // Manually trigger update since enzyme doesn't detect LeftNav state change for some reason
      nav.update();
      const subnav = nav.find(`.${navCss.SUBNAV_CONTENT}`);
      assert(subnav.exists());
      assert.equal(subnav.children().length, 2);
      assert.equal(subnav.childAt(0).childAt(0).prop("label"), "subLink11");
      assert.equal(subnav.childAt(1).childAt(0).prop("label"), "subLink12");
    });
  });

  describe("when the subnav drawer is open", () => {
    beforeEach(() => {
      this.nav = renderLeftNav();
      const group = this.nav.find(NavGroup).first().dive();
      group.simulate("click", mockEvent);
      // Manually trigger update since enzyme doesn't detect LeftNav state change for some reason
      this.nav.update();
    });

    it("calls the onClick handler when a subnav NavLink is clicked", () => {
      const link = this.nav.find(NavGroup).find(NavLink).first().dive();
      link.simulate("click", mockEvent);
      assert(subNavLinkSpy.calledOnce);
      // And the drawer stays open
      this.nav.update();
      const subnav = this.nav.find(`.${navCss.SUBNAV_CONTENT}`);
      assert(subnav.exists());
    });

    it("closes the subnav drawer when the open NavGroup is clicked", () => {
      const group = this.nav.find(NavGroup).first().dive();
      group.simulate("click", mockEvent);
      this.nav.update();
      const subnav = this.nav.find(`.${navCss.SUBNAV_CONTENT}`);
      assert(!subnav.exists());
    });

    it("closes the subnav drawer when a topnav NavLink is clicked", () => {
      const link = this.nav.find(NavLink).first().dive();
      link.simulate("click", mockEvent);
      this.nav.update();
      const subnav = this.nav.find(`.${navCss.SUBNAV_CONTENT}`);
      assert(!subnav.exists());
    });

    it("rerenders the subnav drawer when a different NavGroup is clicked", () => {
      const otherGroup = this.nav.find(NavGroup).last().dive();
      otherGroup.simulate("click", mockEvent);
      this.nav.update();
      const subnav = this.nav.find(`.${navCss.SUBNAV_CONTENT}`);
      assert(subnav.exists());
      assert.equal(subnav.children().length, 2);
      assert.equal(subnav.childAt(0).childAt(0).prop("label"), "subLink21");
      assert.equal(subnav.childAt(1).childAt(0).prop("label"), "subLink22");
    });
  });

  describe("when a topnav NavLink is selected", () => {
    const nav = shallow(
      <LeftNav>
        <NavLink selected label="topLink1" icon={fakeIcon} />
      </LeftNav>,
    );

    it("renders the NavLink with the 'selected' class", () => {
      const link = nav.find(NavLink).first().dive();
      assert(link.hasClass(linkCss.SELECTED));
    });
  });

  describe("when a subnav NavLink is selected", () => {
    beforeEach(() => {
      this.nav = shallow(
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
      const subnav = this.nav.find(`.${navCss.SUBNAV_CONTENT}`);
      assert(subnav.exists());
      assert.equal(subnav.children().length, 1);
      assert.equal(subnav.childAt(0).childAt(0).prop("label"), "subLink11");
    });

    it("renders the NavLink with the 'selected' class", () => {
      const subnav = this.nav.find(`.${navCss.SUBNAV_CONTENT}`);
      const link = subnav.find(NavLink).first().dive();
      assert(link.hasClass(linkCss.SELECTED));
    });

    it("rerenders the subnav drawer when a different NavGroup is clicked", () => {
      const otherGroup = this.nav.find(NavGroup).last().dive();
      otherGroup.simulate("click", mockEvent);
      this.nav.update();
      const subnav = this.nav.find(`.${navCss.SUBNAV_CONTENT}`);
      assert(subnav.exists());
      assert.equal(subnav.children().length, 1);
      assert.equal(subnav.childAt(0).childAt(0).prop("label"), "subLink21");
    });
  });

  describe("when collapsed", () => {
    let nav;

    beforeEach(() => {
      nav = renderLeftNav({ collapsed: true });
    });

    it("renders all nav items with the '_collapsed' prop", () => {
      const topNavItems = nav.find(`.${navCss.TOPNAV}`).children();
      topNavItems.forEach((item) => assert(item.props()._collapsed));
    });
  });
});
