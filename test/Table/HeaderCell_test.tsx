import * as assert from "assert";
import * as React from "react";
import * as sinon from "sinon";
import { shallow } from "enzyme";

import HeaderCell, { cssClass } from "../../src/Table/HeaderCell";
import SortIcons from "../../src/Table/SortIcons";
import sortDirection from "../../src/Table/sortDirection";

describe("Table -- HeaderCell", () => {
  const CONTENT = "Header Cell Content";

  const newHeaderCell = (props = {}) => shallow(<HeaderCell {...props}>{CONTENT}</HeaderCell>);

  it("sets custom class name", () => {
    const cell = newHeaderCell({ className: "custom" });
    assert(cell.find(".custom").exists(), `Expected ${cell.debug()} to have "custom" class.`);
  });

  it("sets column width on Cell", () => {
    const cell = newHeaderCell({ width: "20%" });
    assert.equal(cell.props().width, "20%");
  });

  it("renders content", () => {
    const label = newHeaderCell().find(`.${cssClass.LABEL}`);
    assert(label.contains(CONTENT), `Expected ${label.debug()} to contain "${CONTENT}"`);
  });

  it("renders sort control for sortable columns", () => {
    assert(
      !newHeaderCell()
        .find(SortIcons)
        .exists(),
      "SortIcons rendered for unsortable column.",
    );

    const sortControl = newHeaderCell({
      sortable: true,
      activeSortDirection: sortDirection.DESCENDING,
    }).find(SortIcons);
    assert(sortControl.exists(), "SortIcons not found in sortable column.");
    assert.equal(
      sortControl.props().direction,
      sortDirection.DESCENDING,
      "Incorrect SortIcons direction set.",
    );
  });

  it("emits sort change event for sortable cell on click", () => {
    const onSortChange = sinon.stub();

    const cell = newHeaderCell({ onSortChange, sortable: true });
    cell.simulate("click");

    sinon.assert.called(onSortChange);
  });

  it("doesn't emit sort change event for unsortable cell on click", () => {
    const onSortChange = sinon.stub();

    const cell = newHeaderCell({ onSortChange });
    cell.simulate("click");

    sinon.assert.notCalled(onSortChange);
  });
});
