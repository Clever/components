/* eslint-disable no-console */
import _ from "lodash";
import classnames from "classnames";
import * as React from "react";
import Example, { CodeSample, ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import loremIpsum from "lorem-ipsum";
import { Button, ModalButton, TextInput, Table2Beta, SegmentedControl, Label } from "src";

import "./Table2BetaView.less";
import FontAwesome from "react-fontawesome";

const sampleActionInputs = [
  {
    callback: (selectedRows) => {
      console.log(selectedRows);
    },
    title: { singular: "Launch an app" },
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Approve_icon.svg",
    hoverIcon: "https://www.freeiconspng.com/uploads/troll-face-png-1.png",
  },
  {
    callback: () => console.log("sampleAction 2"),
    title: { singular: "Log out student", plural: "Log out students" },
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Approve_icon.svg",
  },
  {
    callback: () => console.log("sampleAction 1"),
    title: { singular: "Download badge", plural: "Download badges" },
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Approve_icon.svg",
  },
  {
    callback: () => console.log("sampleAction 1"),
    title: {
      singular: (
        <div>
          <FontAwesome name="question-circle" /> Using FontAwesome
        </div>
      ),
      plural: (
        <div>
          <FontAwesome name="question-circle" /> Using FontAwesome
        </div>
      ),
    },
  },
  {
    callback: () => console.log("sampleAction 2"),
    title: { singular: "Download username", plural: "Download usernames" },
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Approve_icon.svg",
  },
  {
    callback: () => console.log("sampleAction 2"),
    title: {
      singular: "Download something that is not a username",
      plural: "Download something that is not usernames",
    },
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Approve_icon.svg",
  },
];

export default class Table2BetaView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enableDynamicCellClass: false,
      enableRowClick: true,
      enableRowMouseOver: false,
      tableFilter: "",
      enableSelectable: true,
      enableActionsOnHover: false,
      firstSortDirection: Table2Beta.sortDirection.ASCENDING,
      mobileWidth: false,
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
    const { cssClass } = Table2BetaView;
    const {
      enableDynamicCellClass,
      enableRowClick,
      enableRowMouseOver,
      tableData,
      enableSelectable,
      enableActionsOnHover,
      firstSortDirection,
      mobileWidth,
    } = this.state;

    return (
      <View
        className={cssClass.CONTAINER}
        title="Table 2 Beta"
        sourcePath="src/Table2Beta/Table2Beta.tsx"
      >
        <p className={cssClass.BETA}>
          <Label color="new-feature">Beta</Label> Table 2 Beta is in Beta and breaking changes may
          still be introduced.
        </p>
        <p>
          This table component extends the original Table component, but now supports selection,
          among other things.
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
              <div className={mobileWidth ? cssClass.MOBILE_WIDTH : ""}>
                <Table2Beta
                  className={cssClass.TABLE}
                  data={tableData}
                  filter={(rowData) =>
                    !this.state.tableFilter ||
                    _.includes(
                      [rowData.name.first, rowData.name.last].join(" "),
                      this.state.tableFilter.trim().toLowerCase(),
                    )
                  }
                  initialPage={24}
                  initialSortState={{
                    columnID: "name",
                    direction: Table2Beta.sortDirection.ASCENDING,
                  }}
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
                  selectable={enableSelectable}
                  singleActions={sampleActionInputs}
                  showSingleActionsOnHover={enableActionsOnHover}
                  selectedRowsHeaderContentType={{
                    singular: this.state.tableFilter || "",
                    plural: !!this.state.tableFilter ? `${this.state.tableFilter}s` : "",
                  }}
                  selectedRowsHeaderActions={sampleActionInputs}
                  selectedRowsColumnName="Select all"
                >
                  <Table2Beta.Column
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

                  <Table2Beta.Column
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

                  <Table2Beta.Column
                    id="age"
                    header={{ content: "Age" }}
                    cell={{ renderer: (r) => r.age }}
                    sortable
                    sortValueFn={(r) => r.age}
                  />

                  <Table2Beta.Column
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

                  <Table2Beta.Column
                    id="notes"
                    header={{ content: "Notes" }}
                    cell={{ renderer: (r) => r.notes }}
                    width="100%"
                  />
                </Table2Beta>
              </div>
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
            <input
              type="checkbox"
              checked={enableSelectable}
              onChange={({ target }) => this.setState({ enableSelectable: target.checked })}
            />{" "}
            Selectable rows
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={enableActionsOnHover}
              onChange={({ target }) => this.setState({ enableActionsOnHover: target.checked })}
            />{" "}
            Show actions on hover
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={mobileWidth}
              onChange={({ target }) => this.setState({ mobileWidth: target.checked })}
            />{" "}
            Simulate width for mobile view
          </label>
          <label className={cssClass.CONFIG}>
            First Sort Direction:
            <SegmentedControl
              className={cssClass.CONFIG_OPTIONS}
              defaultValue={firstSortDirection}
              onSelect={(value) => this.setState({ firstSortDirection: value })}
              options={[
                { content: "ASCENDING", value: Table2Beta.sortDirection.ASCENDING },
                { content: "DESCENDING", value: Table2Beta.sortDirection.DESCENDING },
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
                'Puts the table in "lazy" mode - data is fetched from the getData function rather than needing the whole "data" array up front. NOTE: with lazy data loading, "Select All" checkbox only selects the current page.',
              defaultValue: "false",
              optional: true,
            },
            {
              name: "getData",
              type: "({startingAfter?: string, pageSize: number}) => Object[]",
              description:
                "If `lazy`, this function is called to retrieve new data. Cannot be provided if not `lazy`.",
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
            {
              name: "selectable",
              type: "boolean",
              description:
                "Adds selectable checkboxes to the table. NOTE: with lazy data loading, 'Select All' checkbox only selects the current page. With data passed in in the 'data' prop, 'Select All' selects all rows.",
              optional: true,
            },
            {
              name: "checkboxClassName",
              type: "String",
              description: "Additional classname to apply to the checkbox cells",
              optional: true,
            },
            {
              name: "singleActions",
              type: "Array<ActionInput>",
              description: "An array of ActionInputs, to be present for every row",
              optional: true,
              defaultValue: "None",
            },
            {
              name: "singleActionsClassName",
              type: "String",
              description: "Additional classname to apply to the singleActions cells",
              optional: true,
            },
            {
              name: "showSingleActionsOnHover",
              type: "boolean",
              description:
                "If false, single actions will always be present. If true, they will only appear on row hover",
              optional: true,
            },
            {
              name: "selectedRowsHeaderContentType",
              type: "{ singular: string; plural?: string }",
              description:
                'Description of the content displayed in the rows of the table. I.e. "student", "student in grade", etc. This is used in the SelectedRowsHeader: "Select a <selectedRowsHeaderContentType>"',
              optional: true,
              defaultValue: '{ singular: "row", plural: "rows" }',
            },
            {
              name: "selectedRowsHeaderContentTypeNoSelection",
              type: "string",
              description:
                "Description of the content displayed when no rows are selected. Useful if you have filters that change the row types (ex: filter from all students to inactive students)",
              optional: true,
              defaultValue: "rows",
            },
            {
              name: "selectedRowsHeaderActions",
              type: "Array<ActionInput>",
              description:
                "An array of ActionInputs. These are the actions shown in SelectedRowsHeader. Each ActionInput contains a callback which takes props `(selectedRows: Set<any>)`, a title object `{ singular: React.ReactNode; plural?: React.ReactNode }`, and an optional icon url. Title.singular and plural can be a string, or a React element if you want to include FontAwesome, etc",
              optional: true,
              defaultValue: "None",
            },
            {
              name: "disableSelectedRowsHeader",
              type: "boolean",
              description:
                "Allows for disabling the selected row action header",
              optional: true,
              defaultValue: "false",
            },
            {
              name: "selectedRowsColumnName",
              type: "string",
              description:
                "Allows for a custom column name for the selection column",
              optional: true,
              defaultValue: "",
            },
            {
              name: "numDisplayedActions",
              type: "number",
              description:
                "Number of actions to show in SelectedRowsHeader. If there are greater than this number of actions in selectedRowsHeaderActions, they will appear in an'Ellipse' dropdown menu at the right of the actions",
              optional: true,
              defaultValue: "4",
            },
          ]}
          title="Table 2 Beta"
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
          <Table2Beta
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
            firstSortDirection={Table2Beta.sortDirection.DESCENDING}
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
            <Table2Beta.Column
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

            <Table2Beta.Column
              id="name"
              header={{ content: "Name" }}
              cell={{
                className: "capitalize",
                renderer: (r) => [r.name.first, r.name.last].join(" "),
              }}
              width="25%"
            />

            <Table2Beta.Column
              id="age"
              header={{ content: "Age" }}
              cell={{ renderer: (r) => r.age }}
            />

            <Table2Beta.Column
              id="status"
              header={{ content: "Status" }}
              cell={{ renderer: (r) => r.status }}
            />

            <Table2Beta.Column
              id="notes"
              header={{ content: "Notes" }}
              cell={{ renderer: (r) => r.notes }}
              width="100%"
            />
          </Table2Beta>
        </Example>
      </View>
    );
  }
}

Table2BetaView.cssClass = {
  BETA: "Table2BetaView--beta",
  CONFIG: "Table2BetaView--config",
  CONFIG_OPTIONS: "Table2BetaView--configOptions",
  CONTAINER: "Table2BetaView",
  TABLE: "Table2BetaView--table",
  MOBILE_WIDTH: "Table2BetaView--mobileWidth",
};
