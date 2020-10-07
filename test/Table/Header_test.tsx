import * as assert from "assert";
import * as React from "react";
import * as sinon from "sinon";
import { shallow } from "enzyme";

import Column from "../../src/Table/Column";
import Header from "../../src/Table/Header";
import HeaderCell from "../../src/Table/HeaderCell";
import sortDirection from "../../src/Table/sortDirection";

describe("Table -- Header", () => {
  const nameColumn = (
    <Column
      id="name_column"
      header={{
        className: "name_header",
        content: "Name",
      }}
      cell={{
        className: "name_cell",
        renderer: r => r.name,
      }}
      sortable
      sortValueFn={r => r.name}
      width="50%"
    />
  );

  const descriptionColumn = (
    <Column
      id="description_column"
      header={{ content: "Description" }}
      cell={{ renderer: r => r.description }}
    />
  );

  const emptyHeaderColumn = <Column id="no_header_column" cell={{ renderer: () => "dud" }} />;

  const newHeader = (props = {}) =>
    shallow(
      <Header {...props}>
        {nameColumn}
        {descriptionColumn}
        {emptyHeaderColumn}
      </Header>,
    );

  it("renders HeaderCell for each column", () => {
    const cells = newHeader().find(HeaderCell);

    assert.equal(cells.length, 3, "Incorrect number of header cells.");
    [nameColumn, descriptionColumn, emptyHeaderColumn].forEach((column, i) => {
      assert.equal(cells.at(i).key(), column.props.id);
    });
  });

  it("handles columns with no header conent", () => {
    const emptyCell = newHeader()
      .find(HeaderCell)
      .at(2);
    assert(
      !emptyCell.children().exists(),
      `Expected header cell '${emptyCell.debug()}' to be empty.`,
    );
  });

  it("sets custom HeaderCell class name", () => {
    const nameCell = newHeader()
      .find(HeaderCell)
      .at(0);
    assert.equal(nameCell.props().className, nameColumn.props.header.className);
  });

  it("sets active sort state", () => {
    const sortState = { columnID: "name_column", direction: sortDirection.DESCENDING };

    const nameCell = newHeader({ sortState })
      .find(HeaderCell)
      .at(0);

    assert(nameCell.props().sortable, `Expected ${nameCell.debug()} to be sortable.`);
    assert.equal(
      nameCell.props().activeSortDirection,
      sortDirection.DESCENDING,
      "Incorrect sort direction",
    );
  });

  it("disables sorting is `disableSort` prop is specified", () => {
    const nameCell = newHeader({ disableSort: true })
      .find(HeaderCell)
      .at(0);
    assert(
      !nameCell.props().sortable,
      `${nameCell.debug()} should not be sortable when 'disableSort' is true.`,
    );
  });

  it("sets custom column width", () => {
    const nameCell = newHeader()
      .find(HeaderCell)
      .at(0);
    assert.equal(nameCell.props().width, nameColumn.props.width);
  });

  it("propagates sort change events", () => {
    const onSortChange = sinon.stub();
    const descriptionColumnIndex = 1;

    const cell = newHeader({ onSortChange })
      .find(HeaderCell)
      .at(descriptionColumnIndex);
    cell.simulate("sortChange");

    sinon.assert.calledWith(onSortChange, descriptionColumn.props.id);
  });
});
