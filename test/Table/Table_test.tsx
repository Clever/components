import * as assert from "assert";
import * as _ from "lodash";
import * as React from "react";
import * as sinon from "sinon";
import { shallow } from "enzyme";

import Cell from "../../src/Table/Cell";
import Column from "../../src/Table/Column";
import Footer from "../../src/Table/Footer";
import Header from "../../src/Table/Header";
import sortDirection from "../../src/Table/sortDirection";
import { Table, cssClass } from "../../src/Table/Table";

const DATA = [
  {
    id: "item_1",
    name: "Item 1",
    description: "The first item.",
  },
  {
    id: "item_2",
    name: "Item 2",
    description: "The second item.",
  },
  {
    id: "item_3",
    name: "Item 3",
    description: "The third item.",
  },
];

describe("Table", () => {
  const nameColumn = (
    <Column
      id="name"
      header={{
        className: "name_header",
        content: "Name",
      }}
      cell={{
        className: "name_cell",
        renderer: (r) => r.name,
      }}
      sortable
      sortValueFn={(r) => r.name}
    />
  );

  const descriptionColumn = (
    <Column
      id="description"
      header={{ content: "Description" }}
      cell={{
        className: (r) => r.id,
        renderer: (r) => r.description,
      }}
    />
  );

  const newTable = (props = {}) =>
    shallow(
      <Table data={DATA} rowIDFn={(r) => r.id} {...props}>
        {nameColumn}
        {descriptionColumn}
      </Table>,
    );

  it("applies custom classname", () => {
    const table = newTable({ className: "custom" });
    assert(table.find(".custom").exists(), "Custom class name not found");
  });

  describe("header", () => {
    it("is rendered", () => assert(newTable().find(Header).exists(), "Header not found."));

    it("sets initial sort state by column ID", () => {
      const table = newTable({
        initialSortState: { columnID: "name", direction: sortDirection.DESCENDING },
      });

      assert.deepEqual(
        table.find(Header).props().sortState,
        {
          columnID: "name",
          direction: sortDirection.DESCENDING,
        },
        "Initial sort state not set",
      );

      const rowIDs = table.find("tr").map((r) => r.key());
      const expectedOrder = DATA.slice()
        .reverse()
        .map((item) => item.id);
      assert.deepEqual(rowIDs, expectedOrder);
    });

    it("has table columns as children", () => {
      assert(
        newTable().find(Header).contains(nameColumn, descriptionColumn),
        "Columns not passed to header.",
      );
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
        assert.equal(
          cells.at(1).childAt(0).text(),
          item.description,
          `Unexpected content in row ${i}`,
        );
      });
    });

    it("assigns custom cell classnames", () => {
      const nameCell = newTable().find(`.${cssClass.ROW}`).first().find(Cell).first();

      assert(
        _.includes(nameCell.props().className, nameColumn.props.cell.className),
        `Expected ${nameCell.props().className} to contain ${nameColumn.props.cell.className}`,
      );
    });

    it("assigns custom cell class name if specified as a function", () => {
      const descriptionCell = newTable().find(`.${cssClass.ROW}`).first().find(Cell).at(1);

      assert(
        descriptionCell.props().className.includes(descriptionColumn.props.cell.className(DATA[0])),
        `Expected ${
          descriptionCell.props().className
        } to contain ${descriptionColumn.props.cell.className(DATA[0])}`,
      );
    });

    it("sorts rows on header sort change", () => {
      const onSortChange = sinon.stub();

      const table = newTable({ onSortChange });
      const header = table.find(Header);

      const columnID = "name";
      header.simulate("sortChange", columnID);

      sinon.assert.calledWith(onSortChange, { columnID, direction: sortDirection.ASCENDING });
      onSortChange.reset();

      header.simulate("sortChange", columnID);
      sinon.assert.calledWith(onSortChange, { columnID, direction: sortDirection.DESCENDING });

      table.update();

      const rows = table.find(`.${cssClass.ROW}`);
      const expectedOrder = DATA.slice().reverse();
      expectedOrder.forEach((item, i) => {
        assert(
          rows.at(i).contains(item.name),
          `Expected\n${rows.debug()}\nto contain "${item.name}" in row ${i}`,
        );
      });
    });

    it("filters out rows with provided filter", () => {
      const item = DATA[0];
      const table = newTable({ filter: (r) => r.name === item.name });

      const rows = table.find(`.${cssClass.ROW}`);
      assert.equal(rows.length, 1, "Incorrect number of filtered rows.");
      assert(
        rows.first().contains(item.name),
        `Expected\n${rows.debug()}\nto contain "${item.name}"`,
      );
    });

    it("shows 'NO DATA' notice if filtered data is empty", () => {
      const table = newTable({ filter: () => false });

      const rows = table.find(`.${cssClass.ROW}`);
      assert.equal(rows.length, 1);
      assert(rows.first().contains("NO DATA"), `Expected\n${rows.debug()}\nto contain "NO DATA"`);
    });

    it("disables sorting if fewer than 2 rows are visible", () => {
      const table = newTable();
      assert(
        !table.find(Header).props().disableSort,
        "Sort should NOT be disabled if table contains > 1 row.",
      );

      table.setProps({ filter: (r) => r.name === DATA[0].name });
      assert(
        table.find(Header).props().disableSort,
        "Sort should be disabled if table contains 1 row.",
      );

      table.setProps({ filter: () => false });
      assert(
        table.find(Header).props().disableSort,
        "Sort should be disabled if table contains 0 rows.",
      );
    });

    it("updates rows on prop change", () => {
      const table = newTable({
        initialSortState: { columnID: "name", direction: sortDirection.ASCENDING },
      });
      const header = table.find(Header);

      const updatedData = DATA.slice();
      updatedData.splice(0, 1);
      header.simulate("sortChange", "name");
      table.setProps({ data: updatedData });

      const rows = table.find(`.${cssClass.ROW}`);
      assert.equal(rows.length, updatedData.length, "Incorrect number of rows after prop change.");

      const expectedOrder = updatedData.slice().reverse();
      expectedOrder.forEach((item, i) => {
        assert(
          rows.at(i).contains(item.name),
          `Expected\n${rows.debug()}\nto contain "${item.name}" in row ${i}`,
        );
      });

      assert.deepEqual(
        table.find(Header).props().sortState,
        {
          columnID: "name",
          direction: sortDirection.DESCENDING,
        },
        "Sort state not preserved after prop change.",
      );
    });

    it("shows only data from the selected page if paginated", () => {
      const table = newTable({ pageSize: 1, initialPage: 2, paginated: true });

      const expectedItem = DATA[1];
      const rows = table.find(`.${cssClass.ROW}`);
      assert.equal(rows.length, 1, "Incorrect number of rows on page.");
      assert(
        rows.first().contains(expectedItem.name),
        `Expected\n${rows.debug()}\nto contain "${expectedItem.name}"`,
      );
    });
  });

  it("doesn't paginate by default", () => {
    const table = newTable({ pageSize: 1, initialPage: 2 });

    const rows = table.find(`.${cssClass.ROW}`);
    assert.equal(rows.length, DATA.length, "Incorrect number of rows on page.");
    DATA.forEach((item, i) => {
      assert(
        rows.at(i).contains(item.name),
        `Expected\n${rows.debug()}\nto contain "${item.name}"`,
      );
    });
    assert(!table.find(Footer).exists(), "Footer should not be rendererd.");
  });

  it("renders footer if paginated", () => {
    const table = newTable({ pageSize: 1, initialPage: 2, paginated: true });
    const footer = table.find(Footer);

    assert.equal(footer.props().currentPage, 2, "Incorrect currrentPage prop value.");
    assert.equal(footer.props().numColumns, 2, "Incorrect numColumns prop value.");
    assert.equal(footer.props().numPages, DATA.length, "Incorrect numPages prop value.");
  });

  it("disables clickable rows if onRowClick is not specified", () => {
    const table = newTable();
    assert.equal(0, table.find(`.${cssClass.CLICKABLE_ROW}`).length);
  });

  it("enables clickable rows if onRowClick is specified", () => {
    const table = newTable({ onRowClick: sinon.stub() });
    assert.equal(DATA.length, table.find(`.${cssClass.CLICKABLE_ROW}`).length);
  });

  it("invokes onRowClick with the selected row id", () => {
    const onRowClick = sinon.stub();

    const table = newTable({ onRowClick });
    const rows = table.find(`.${cssClass.CLICKABLE_ROW}`);

    for (let i = 0; i < rows.length; i++) {
      const event = {};
      rows.at(i).simulate("click", event);
      sinon.assert.calledWith(onRowClick, event, DATA[i].id);
    }
  });

  describe("lazy-loading", () => {
    const newLazyTable = (props) =>
      newTable({
        lazy: true,
        numRows: DATA.length,
        paginated: true,
        pageSize: 1,
        data: null,
        ...props,
      });

    it("doesn't show last page number in footer", () => {
      const getData = sinon.stub().returns(Promise.resolve(DATA.slice(0, 1)));
      const table = newLazyTable({ getData });
      const footer = table.find(Footer);
      assert.equal(footer.props().showLastPage, false);
    });

    it("invokes getData on mount with first page", () => {
      const getData = sinon.stub().returns(Promise.resolve(DATA.slice(0, 1)));
      newLazyTable({ getData });

      sinon.assert.calledOnce(getData);
      sinon.assert.calledWith(getData, { pageSize: 1 });
    });

    it("invokes getData after clicking next", async () => {
      const getData = sinon.stub().returns(Promise.resolve(DATA.slice(0, 1)));
      const table = newLazyTable({ getData });

      // wait for the first page to be resolved
      await new Promise((resolve) => setImmediate(resolve));

      await table.instance().setCurrentPage(2);
      sinon.assert.calledTwice(getData);
      sinon.assert.calledWith(getData, { pageSize: 1, startingAfter: DATA[0].id });
    });

    it("shows the right page after clicking next", async () => {
      const getData = sinon.stub();
      getData.withArgs({ pageSize: 1 }).returns(Promise.resolve(DATA.slice(0, 1)));
      getData
        .withArgs({ pageSize: 1, startingAfter: DATA[0].id })
        .returns(Promise.resolve(DATA.slice(1, 2)));
      const table = newLazyTable({ getData });

      const assertShows = (item) => {
        table.update();
        const rows = table.find(`.${cssClass.ROW}`);
        assert.equal(rows.length, 1);
        const cells = rows.find(Cell);
        assert.equal(cells.length, 2, "Incorrect number of columns rendered");
        assert.equal(cells.at(0).childAt(0).text(), item.name, "Unexpected content");
        assert.equal(cells.at(1).childAt(0).text(), item.description, "Unexpected content");
      };

      // wait for the first page to be resolved
      await new Promise((resolve) => setImmediate(resolve));

      assertShows(DATA[0]);

      await table.instance().setCurrentPage(2);

      assertShows(DATA[1]);
    });

    // This test is a little confusing. At a high level, we're trying to test
    // this flow:
    // 1. The table loads an initial page of data.
    // 2. The underlying data changes (e.g. a search filter is applied) and
    //    table.lazyReset is called, kicking off a fetch for the new first page.
    // 3. The underlying data changes _again_ and table.lazyReset is called,
    //    kicking off another fetch for the new first page.
    // 4. The fetch for (3) finishes.
    // 5. The fetch for (2) finishes.
    //
    // Naïvely, this would result in the data from (2) being displayed. This
    // test asserts that we've added in logic to be resilient to reordering of
    // HTTP responses.
    it("enforces expected ordering of .lazyReset calls", async () => {
      const getData = sinon.stub();

      // return the first entry in DATA for the initial table fetch
      getData.onFirstCall().returns(Promise.resolve([DATA[0]]));

      // hold on to resolvers for the second and third table fetches - we'll call
      // them later
      let firstResolver;
      let secondResolver;
      getData.onSecondCall().returns(
        new Promise((resolve) => {
          firstResolver = resolve;
        }),
      );
      getData.onThirdCall().returns(
        new Promise((resolve) => {
          secondResolver = resolve;
        }),
      );

      const table = newLazyTable({ getData });

      const assertShows = (item) => {
        table.update();
        const rows = table.find(`.${cssClass.ROW}`);
        assert.equal(rows.length, 1);
        const cells = rows.find(Cell);
        assert.equal(cells.length, 2, "Incorrect number of columns rendered");
        assert.equal(cells.at(0).childAt(0).text(), item.name, "Unexpected content");
        assert.equal(cells.at(1).childAt(0).text(), item.description, "Unexpected content");
      };

      // wait for the first page to be resolved, and make sure we're seeing the
      // right element
      await new Promise((resolve) => setImmediate(resolve));
      assertShows(DATA[0]);

      // call lazyReset and then wait for the async fetch call to be made
      table.instance().lazyReset();
      await new Promise((resolve) => setImmediate(resolve));

      // call lazyReset again and then wait for the async fetch call to be made
      table.instance().lazyReset();
      await new Promise((resolve) => setImmediate(resolve));

      // resolve the second fetch before the first one, and then wait for those
      // async calls to complete
      secondResolver([DATA[2]]);
      await new Promise((resolve) => setImmediate(resolve));
      firstResolver([DATA[1]]);
      await new Promise((resolve) => setImmediate(resolve));

      assertShows(DATA[2]);
    });
  });
});
