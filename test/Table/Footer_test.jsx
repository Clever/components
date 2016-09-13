import assert from "assert";
import React from "react";
import sinon from "sinon";
import {shallow} from "enzyme";

import Cell from "../../src/Table/Cell";
import Footer from "../../src/Table/Footer";


describe("Footer", () => {
  const {cssClass, VISIBLE_PAGE_RANGE_SIZE} = Footer;

  const newFooter = props => shallow(
    <Footer currentPage={1} numColumns={3} numPages={3} {...props} />
  );

  it("is empty for numPages < 2", () => {
    assert(newFooter({numPages: 0}).children().isEmpty(), "Footer should be empty for 0 pages.");
    assert(newFooter({numPages: 1}).children().isEmpty(), "Footer should be empty for 1 page.");
  });

  it("renders single cell spanning all columns", () => {
    const footer = newFooter({numColumns: 3});
    assert.equal(footer.find(Cell).props().colSpan, 3, "Invalid colSpan value");
  });

  describe("scroll buttons", () => {
    it("renders 'Prev' and 'Next' scroll buttons", () => {
      const scrollButtons = newFooter().find(`.${cssClass.BUTTON_SCROLL}`);

      assert.equal(scrollButtons.length, 2, "Incorrect number of scroll buttons.");
      assert.equal(scrollButtons.at(0).props().value, "Prev");
      assert.equal(scrollButtons.at(1).props().value, "Next");
    });

    it("disables 'Prev' button when on first page", () => {
      const scrollButtons = newFooter({currentPage: 1, numPages: 2}).find(`.${cssClass.BUTTON_SCROLL}`);

      assert(scrollButtons.at(0).props().disabled, "Left scroll button should be disabled.");
      assert(!scrollButtons.at(1).props().disabled, "Right scroll button should not be disabled.");
    });

    it("disables 'Next' button when on last page", () => {
      const scrollButtons = newFooter({currentPage: 2, numPages: 2}).find(`.${cssClass.BUTTON_SCROLL}`);

      assert(!scrollButtons.at(0).props().disabled, "Left scroll button should not be disabled.");
      assert(scrollButtons.at(1).props().disabled, "Right scroll button should be disabled.");
    });

    it("increments current page on 'Next' button click", () => {
      const onPageChange = sinon.spy();

      const scrollButtons = newFooter({currentPage: 1, numPages: 2, onPageChange})
        .find(`.${cssClass.BUTTON_SCROLL}`);

      scrollButtons.at(1).simulate("click");
      sinon.assert.calledWith(onPageChange, 2);
      onPageChange.reset();
    });

    it("decrements current page on 'Prev' button click", () => {
      const onPageChange = sinon.spy();

      const scrollButtons = newFooter({currentPage: 2, numPages: 2, onPageChange})
        .find(`.${cssClass.BUTTON_SCROLL}`);

      scrollButtons.at(0).simulate("click");
      sinon.assert.calledWith(onPageChange, 1);
      onPageChange.reset();
    });
  });

  describe("page buttons", () => {
    it("renders all page numbers for numPages <= `VISIBLE_PAGE_RANGE_SIZE` + 2", () => {
      const expectedButtons = ["1"];
      for (let i = 2; i <= VISIBLE_PAGE_RANGE_SIZE + 2; i++) {
        const midPage = Math.ceil(i / 2);

        const footer = newFooter({numPages: i, currentPage: midPage});
        const pageButtons = footer.find(`.${cssClass.BUTTON_PAGE}`);

        expectedButtons.push(`${i}`);
        assert.deepEqual(pageButtons.map(b => b.props().value), expectedButtons);
      }
    });

    it("collapses extra page numbers into ellipsis", () => {
      const numPages = 40;

      const footer = newFooter({numPages, currentPage: 20});

      const pageButtons = footer.find(`.${cssClass.BUTTON_PAGE}`);
      const expectedButtons = ["1", "18", "19", "20", "21", "22", "40"];
      assert.deepEqual(pageButtons.map(b => b.props().value), expectedButtons);

      const pageNumbers = footer.find(`.${cssClass.PAGE_NUMBERS}`).children();
      assert.equal(pageNumbers.length, expectedButtons.length + 2, "Incorrect number of page numbers displayed.");
      assert(pageNumbers.at(1).hasClass(cssClass.ELLIPSIS));
      assert(pageNumbers.at(pageNumbers.length - 2).hasClass(cssClass.ELLIPSIS));
    });

    it("highlights selected page number", () => {
      const currentPage = 3;
      const footer = newFooter({numPages: 5, currentPage});

      const pageButtons = footer.find(`.${cssClass.BUTTON_PAGE}`);
      const selectedButton = footer.find(`.${cssClass.BUTTON_PAGE_SELECTED}`);
      assert.equal(selectedButton.length, 1, "Invalid number of selected page buttons,");
      assert(selectedButton.equals(pageButtons.get(currentPage - 1)), "3rd page button should be selected.");
    });
  });
});
