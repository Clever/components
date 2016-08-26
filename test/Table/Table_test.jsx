import assert from "assert";
import lodash from "lodash";
import React from "react";
import sinon from "sinon";
import {shallow} from "enzyme";

import Cell from "../../src/Table/Cell";
import Column from "../../src/Table/Column";
import Header from "../../src/Table/Header";
import sortDirection from "../../src/Table/sortDirection";
import {Table} from "../../src/Table/Table";

const DATA = [{
  id: "item_1",
  name: "Item 1",
  description: "The first item.",
}, {
  id: "item_2",
  name: "Item 2",
  description: "The second item.",
}, {
  id: "item_3",
  name: "Item 3",
  description: "The third item.",
}];


describe("Table", () => {
  const {cssClass} = Table;

  const nameColumn = (
    <Column
      id="name"
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
    />
  );

  const descriptionColumn = (
    <Column
      id="description"
      header={{content: "Description"}}
      cell={{renderer: r => r.description}}
    />
  );

  const newTable = props => shallow(
    <Table data={DATA} rowIDFn={r => r.id} {...props}>
      {nameColumn}
      {descriptionColumn}
    </Table>
  );

  it("applies custom classname", () => {
    const table = newTable({className: "custom"});
    assert(!table.find(".custom").isEmpty(), "Custom class name not found");
  });

  describe("header", () => {
    it("is rendered", () => assert(!newTable().find(Header).isEmpty(), "Header not found."));

    it("sets initial sort state by column index", () => {
      const table = newTable({initialSortState: {columnIndex: 0, direction: sortDirection.DESCENDING}});

      assert.deepEqual(table.find(Header).props().sortState, {
        columnIndex: 0,
        columnID: "name",
        direction: sortDirection.DESCENDING,
      }, "Initial sort state not set");

      const rowIDs = table.find("tr").map(r => r.key());
      const expectedOrder = DATA.slice().reverse().map(item => item.id);
      assert.deepEqual(rowIDs, expectedOrder);
    });

    it("sets initial sort state by column ID", () => {
      const table = newTable({initialSortState: {columnID: "name", direction: sortDirection.DESCENDING}});

      assert.deepEqual(table.find(Header).props().sortState, {
        columnID: "name",
        columnIndex: 0,
        direction: sortDirection.DESCENDING,
      }, "Initial sort state not set");

      const rowIDs = table.find("tr").map(r => r.key());
      const expectedOrder = DATA.slice().reverse().map(item => item.id);
      assert.deepEqual(rowIDs, expectedOrder);
    });

    it("has table columns as children", () => {
      assert(newTable().find(Header).contains(nameColumn, descriptionColumn), "Columns not passed to header.");
    });
  });

  describe("body", () => {
    it("renders a row for each data item", () => {
      const rows = newTable().find(`.${cssClass.ROW}`);

      assert.equal(rows.length, DATA.length, "Incorrect number of rows rendered.");
      DATA.forEach((item, i) => {
        const cells = rows.at(i).find(Cell);

        assert.equal(cells.length, 2, `Incorrect number of columns rendered at row ${i}`);
        assert.equal(cells.at(0).childAt(0).text(), item.name, `Unexpected content in row ${i}`);
        assert.equal(cells.at(1).childAt(0).text(), item.description, `Unexpected content in row ${i}`);
      });
    });

    it("assigns custom cell classnames", () => {
      const nameCell = newTable()
        .find(`.${cssClass.ROW}`).first()
        .find(Cell).first();

      assert(
        lodash.includes(nameCell.props().className, nameColumn.props.cell.className),
        `Expected ${nameCell.props().className} to contain ${nameColumn.props.cell.className}`
      );
    });

    it("sorts rows on header sort change", () => {
      const onSortChange = sinon.stub();

      const table = newTable({onSortChange});
      const header = table.find(Header);

      const columnID = "name";
      const columnIndex = 0;
      header.simulate("sortChange", columnIndex);

      sinon.assert.calledWith(onSortChange, {columnID, columnIndex, direction: sortDirection.ASCENDING});
      onSortChange.reset();

      header.simulate("sortChange", columnIndex);
      sinon.assert.calledWith(onSortChange, {columnID, columnIndex, direction: sortDirection.DESCENDING});

      table.update();

      const rows = table.find(`.${cssClass.ROW}`);
      const expectedOrder = DATA.slice().reverse();
      expectedOrder.forEach((item, i) => {
        assert(rows.at(i).contains(item.name), `Expected\n${rows.debug()}\nto contain "${item.name}" in row ${i}`);
      });
    });

    it("filters out rows with provided filter", () => {
      const item = DATA[0];
      const table = newTable({filter: r => r.name === item.name});

      const rows = table.find(`.${cssClass.ROW}`);
      assert.equal(rows.length, 1, "Incorrect number of filtered rows.");
      assert(rows.first().contains(item.name), `Expected\n${rows.debug()}\nto contain "${item.name}"`);
    });

    it("updates rows on prop change", () => {
      const table = newTable({initialSortState: {columnID: "name", direction: sortDirection.ASCENDING}});
      const header = table.find(Header);

      const updatedData = DATA.slice();
      updatedData.splice(0, 1);
      header.simulate("sortChange", 0);
      table.setProps({data: updatedData});

      const rows = table.find(`.${cssClass.ROW}`);
      assert.equal(rows.length, updatedData.length, "Incorrect number of rows after prop change.");

      const expectedOrder = updatedData.slice().reverse();
      expectedOrder.forEach((item, i) => {
        assert(rows.at(i).contains(item.name), `Expected\n${rows.debug()}\nto contain "${item.name}" in row ${i}`);
      });

      assert.deepEqual(table.find(Header).props().sortState, {
        columnID: "name",
        columnIndex: 0,
        direction: sortDirection.DESCENDING,
      }, "Sort state not preserved after prop change.");
    });
  });
});
