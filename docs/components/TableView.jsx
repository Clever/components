/* eslint-disable no-console */
import _ from "lodash";
import classnames from "classnames";
import loremIpsum from "lorem-ipsum";
import React, { PureComponent } from "react";

import Example, { ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { Button, ModalButton, Table, TextInput, SegmentedControl } from "src";

import "./TableView.less";

export default class TableView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enableDynamicCellClass: false,
      enableRowClick: true,
      enableRowMouseOver: false,
      tableFilter: "",
      firstSortDirection: Table.sortDirection.ASCENDING,
    };
  }

  componentWillMount() {
    this._reload(5000);
  }

  _reload(numItems) {
    const tableData = [];
    for (var i = 0; i < numItems; i++) {
      tableData.push({
        id: i,
        name: {
          first: loremIpsum({ count: 1, units: "words" }),
          last: loremIpsum({ count: 2, units: "words" }),
        },
        age: Math.round(Math.random() * 100),
        status: loremIpsum({ count: 1, units: "words" }),
        notes: loremIpsum({ count: 2, units: "sentences" }),
      });
    }
    this.setState({ tableData });
    if (this._lazyTable) {
      this._lazyTable.lazyReset();
    }
  }

  render() {
    const { cssClass } = TableView;
    const {
      enableDynamicCellClass,
      enableRowClick,
      enableRowMouseOver,
      tableData,
      firstSortDirection,
    } = this.state;

    return (
      <View className={cssClass.CONTAINER} title="Table" sourcePath="src/Table/Table.tsx">
        <p>
          This table component supports sorting, filtering, and pagination. There is also a lazy
          loading table available for very large sets of data.
        </p>
        <Example>
          <Button
            onClick={() => {
              this._reload(Math.random() * 5000);
              this.refs.table.setCurrentPage(1);
            }}
            type="secondary"
            value="Reload random data"
          />
          <div style={{ width: "300px", marginTop: "20px" }}>
            <TextInput
              label="Filter by name"
              name="tableFilter"
              placeholder="Filter by name"
              onChange={(e) => {
                this.setState({ tableFilter: e.target.value });
                this.refs.table.setCurrentPage(1);
              }}
              value={this.state.tableFilter}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <ExampleCode>
              <Table
                data={tableData}
                filter={(rowData) =>
                  !this.state.tableFilter ||
                  _.includes(
                    [rowData.name.first, rowData.name.last].join(" "),
                    this.state.tableFilter.trim().toLowerCase(),
                  )
                }
                initialPage={24}
                initialSortState={{ columnID: "name", direction: Table.sortDirection.ASCENDING }}
                firstSortDirection={firstSortDirection}
                ref="table"
                onPageChange={(page) => console.log("Table page changed:", page)}
                onSortChange={(sortState) => console.log("Table sort changed:", sortState)}
                onRowClick={
                  enableRowClick
                    ? (e, rowID, rowData) => console.log("Table row clicked:", { rowID, rowData })
                    : undefined
                }
                onRowMouseOver={
                  enableRowMouseOver
                    ? (e, rowID, rowData) =>
                        console.log("Table row moused over:", { rowID, rowData })
                    : undefined
                }
                onViewChange={(data) =>
                  console.log(
                    "Table view changed:",
                    data.map((d) => d.id),
                  )
                }
                paginated
                pageSize={9}
                visiblePageRangeSize={5}
                rowIDFn={(r) => r.id}
                rowClassNameFn={(r) => (r.age < 10 ? "additionalClass" : null)}
              >
                <Table.Column
                  id="details"
                  cell={{
                    renderer: (r) => (
                      <ModalButton
                        type="link"
                        size="small"
                        value={"\u2630 Details"}
                        modalTitle="Details"
                      >
                        <p style={{ whiteSpace: "normal" }}>{r.notes}</p>
                      </ModalButton>
                    ),
                  }}
                  noWrap
                />

                <Table.Column
                  id="name"
                  header={{ content: "Name" }}
                  cell={{
                    className: "capitalize",
                    renderer: (r) => [r.name.first, r.name.last].join(" "),
                  }}
                  sortable
                  sortValueFn={(r) => [r.name.first, r.name.last].join(" ")}
                  width="25%"
                />

                <Table.Column
                  id="age"
                  header={{ content: "Age" }}
                  cell={{ renderer: (r) => r.age }}
                  sortable
                  sortValueFn={(r) => r.age}
                />

                <Table.Column
                  id="status"
                  header={{ content: "Status" }}
                  cell={{
                    className: (r) =>
                      classnames(
                        "TableView--status",
                        enableDynamicCellClass &&
                          r.status.includes("e") &&
                          "TableView--status--red",
                      ),
                    renderer: (r) => r.status,
                  }}
                  sortable
                  sortValueFn={(r) => r.status}
                />

                <Table.Column
                  id="notes"
                  header={{ content: "Notes" }}
                  cell={{ renderer: (r) => r.notes }}
                  width="100%"
                />
              </Table>
            </ExampleCode>
          </div>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={enableRowClick}
              onChange={({ target }) => this.setState({ enableRowClick: target.checked })}
            />{" "}
            Clickable rows (see console)
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={enableRowMouseOver}
              onChange={({ target }) => this.setState({ enableRowMouseOver: target.checked })}
            />{" "}
            mouseover rows (see console)
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={enableDynamicCellClass}
              onChange={({ target }) => this.setState({ enableDynamicCellClass: target.checked })}
            />{" "}
            Dynamic cell class names
          </label>
          <label className={cssClass.CONFIG}>
            First Sort Direction:
            <SegmentedControl
              className={cssClass.CONFIG_OPTIONS}
              defaultValue={firstSortDirection}
              onSelect={(value) => this.setState({ firstSortDirection: value })}
              options={[
                { content: "ASCENDING", value: Table.sortDirection.ASCENDING },
                { content: "DESCENDING", value: Table.sortDirection.DESCENDING },
              ]}
            />
          </label>
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "data",
              type: "Array",
              description:
                "The array of data items, each corresponding to a single potential table row",
            },
            {
              name: "rowIDFn",
              type: "Function",
              description:
                "Called with data for a single row. Should return the unique ID for that row",
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the table",
              optional: true,
            },
            {
              name: "filter",
              type: "Function",
              description:
                "Called with data for a single row. Should return false if the row should be filtered out" +
                " or true otherwise.",
              optional: true,
            },
            {
              name: "fixed",
              type: "Boolean",
              description: "Whether or not table column widths should be fixed vs. fluid",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "initialPage",
              type: "Number",
              description: "The 1-based index of the initial page to be displayed initially",
              optional: true,
            },
            {
              name: "initialSortState",
              type: "{columnID: String, direction: Table.sortDirection}",
              description: "The initial sort state of the table",
              optional: true,
            },
            {
              name: "firstSortDirection",
              type: "Table.sortDirection",
              description: "Direction to sort table on initial click",
              optional: true,
            },
            {
              name: "onPageChange",
              type: "Function",
              description: "Callback function for the 1-based index displayed page change event",
              optional: true,
            },
            {
              name: "onRowClick",
              type: "Function",
              description: "Callback function for when a table row is clicked",
              optional: true,
            },
            {
              name: "onRowMouseOver",
              type: "Function",
              description: "Callback function for when a table row is moused over",
              optional: true,
            },
            {
              name: "onSortChange",
              type: "Function",
              description: "Callback function for the sort state change event",
              optional: true,
            },
            {
              name: "pageSize",
              type: "Number",
              description: "The number of data rows to display on each page",
              defaultValue: "10",
              optional: true,
            },
            {
              name: "paginated",
              type: "Boolean",
              description: "Whether or not to enable pagination, see pageSize",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "visiblePageRangeSize",
              type: "1 | 3 | 5 | 7 | 9",
              description:
                "Range of page numbers to show in footer, centered on the current page number",
              defaultValue: "5",
              optional: true,
            },
            {
              name: "rowClassNameFn",
              type: "Function",
              description:
                "Called with data with a single row. Returns an additional className for the row",
              optional: true,
            },
            {
              name: "lazy",
              type: "boolean",
              description:
                'Puts the table in "lazy" mode - data is fetched ' +
                'from the getData function rather than needing the whole "data" ' +
                "array up front.",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "getData",
              type: "({startingAfter?: string, pageSize: number}) => Object[]",
              description:
                "If `lazy`, this function is called to retrieve new " +
                "data. Cannot be provided if not `lazy`.",
            },
            {
              name: "numRows",
              type: "number",
              description:
                "If `lazy`, this gives the total count of rows so that " +
                "the number of pages is known up front. Cannot be provided if not " +
                "`lazy`.",
              optional: true,
            },
            {
              name: "noDataContent",
              type: "React Node",
              description:
                "If `data` is empty then we render noDataContent in a row spanning all columns. " +
                'If noDataContent is not passed we add a row spanning all columns that says "NO DATA"',
              optional: true,
            },
          ]}
          title="Table"
        />

        <p>
          <strong>API</strong>
        </p>
        <p>
          <code>setCurrentPage(page:Number)</code> – Explicitly sets the displayed page on the Table
          with the specified 1-based page. Useful for reacting to data or filter changes that
          warrant resetting the current page. <strong>Note:</strong> The current page is
          automatically reset to the first page on every sort state change.
        </p>

        <PropDocumentation
          availableProps={[
            {
              name: "cell",
              type: "{className: String or Function (optional), renderer: Function}",
              description: (
                <div>
                  <p>Configuration for the table body cell for this column.</p>
                  <p>
                    <code>renderer</code> will be called with data for a single row and should
                    return content that can be rendered by the React DOM renderer.
                  </p>
                  <p>
                    If <code>className</code> is a function, it will also be called with row data
                    and should return a render-compatible value.
                  </p>
                </div>
              ),
            },
            {
              name: "id",
              type: "String",
              description:
                "Unique identifier for the column. Can be used in referencing columns for sorting",
            },
            {
              name: "header",
              type: "{className: String (optional), content: Any (optional)}",
              description: "Configuration for the header cell of this column",
              optional: true,
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the table column",
              optional: true,
            },
            {
              name: "noWrap",
              type: "Boolean",
              description:
                "Prevents the column conten from wrapping. In the non-fixed mode, the table column will " +
                "automatically expand to fit all content in the column on a single line.",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "sortable",
              type: "Boolean",
              description: "Enables sorting for the column",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "sortValueFn",
              type: "Function",
              description:
                "Called with data for a single row. Should return a sortable value for row",
              optional: true,
            },
          ]}
          title="Table.Column"
        />

        <Example title="Lazy Table">
          <Table
            ref={(t) => {
              this._lazyTable = t;
            }}
            lazy
            getData={({ startingAfter, pageSize }) => {
              let start = 0;
              if (startingAfter != null) {
                start = _.findIndex(tableData, (r) => r.id === startingAfter) + 1;
              }
              return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
                tableData.slice(start, start + pageSize),
              );
            }}
            firstSortDirection={Table.sortDirection.DESCENDING}
            numRows={tableData.length}
            onPageChange={(page) => console.log("Table page changed:", page)}
            onSortChange={(sortState) => console.log("Table sort changed:", sortState)}
            onViewChange={(data) =>
              console.log(
                "Table view changed:",
                data.map((d) => d.id),
              )
            }
            paginated
            pageSize={9}
            visiblePageRangeSize={5}
            rowIDFn={(r) => r.id}
            rowClassNameFn={(r) => (r.age < 10 ? "additionalClass" : null)}
          >
            <Table.Column
              id="details"
              cell={{
                renderer: (r) => (
                  <ModalButton
                    type="link"
                    size="small"
                    value={"\u2630 Details"}
                    modalTitle="Details"
                  >
                    <p style={{ whiteSpace: "normal" }}>{r.notes}</p>
                  </ModalButton>
                ),
              }}
              noWrap
            />

            <Table.Column
              id="name"
              header={{ content: "Name" }}
              cell={{
                className: "capitalize",
                renderer: (r) => [r.name.first, r.name.last].join(" "),
              }}
              width="25%"
            />

            <Table.Column id="age" header={{ content: "Age" }} cell={{ renderer: (r) => r.age }} />

            <Table.Column
              id="status"
              header={{ content: "Status" }}
              cell={{ renderer: (r) => r.status }}
            />

            <Table.Column
              id="notes"
              header={{ content: "Notes" }}
              cell={{ renderer: (r) => r.notes }}
              width="100%"
            />
          </Table>
        </Example>
      </View>
    );
  }
}

TableView.cssClass = {
  CONFIG: "TableView--config",
  CONFIG_OPTIONS: "TableView--configOptions",
  CONTAINER: "TableView",
};
