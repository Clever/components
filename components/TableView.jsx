/* eslint-disable no-console */
import _ from "lodash";
import loremIpsum from "lorem-ipsum";
import React, {PureComponent} from "react";

import Example from "./Example";
import View from "./View";
import {Button, ModalButton, Table, TextInput} from "src";

import "./TableView.less";


export default class TableView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enableRowClick: true,
      tableFilter: "",
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
          first: loremIpsum({count: 1, units: "words"}),
          last: loremIpsum({count: 2, units: "words"}),
        },
        age: Math.round(Math.random() * 100),
        status: loremIpsum({count: 1, units: "words"}),
        notes: loremIpsum({count: 2, units: "sentences"}),
      });
    }
    this.setState({tableData});
  }

  render() {
    const {cssClass} = TableView;
    const {enableRowClick, tableData} = this.state;

    const getDataLazily = async ({startingAfter, pageSize}) => {
      let start = 0;
      if (startingAfter != null) {
        start = _.findIndex(tableData, r => r.id === startingAfter);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      return tableData.slice(start + 1, start + pageSize + 1);
    };

    return (
      <View className={cssClass.CONTAINER} title="Table">
        <Example
          code={`
            <Table
              data={tableData}
              filter={rowData => !this.state.tableFilter || _.includes(
                [rowData.name.first, rowData.name.last].join(" "),
                this.state.tableFilter.trim().toLowerCase()
              )}
              initialPage={24}
              initialSortState={{columnID: "name", direction: Table.sortDirection.ASCENDING}}
              ref="table"
              onPageChange={page => console.log("Table page changed:", page)}
              onSortChange={sortState => console.log("Table sort changed:", sortState)}
              onRowClick={enableRowClick
                ? (e, row) => console.log("Table row clicked:", row)
                : undefined
              }
              onViewChange={data => console.log("New rows:", data.map(d => d.id))}
              paginated
              pageSize={9}
              rowIDFn={r => r.id}
            >
              <Table.Column
                id="details"
                cell={{renderer: r => (
                  <ModalButton
                    type="link"
                    size="small"
                    value={"\u2630 Details"}
                    modalTitle="Details"
                  >
                    <p style={{whiteSpace: "normal"}}>{r.notes}</p>
                  </ModalButton>
                )}}
                noWrap
              />

              <Table.Column
                id="name"
                header={{content: "Name"}}
                cell={{
                  className: "capitalize",
                  renderer: r => [r.name.first, r.name.last].join(" "),
                }}
                sortable
                sortValueFn={r => [r.name.first, r.name.last].join(" ")}
                width="25%"
              />

              <Table.Column
                id="age"
                header={{content: "Age"}}
                cell={{renderer: r => r.age}}
                sortable
                sortValueFn={r => r.age}
              />

              <Table.Column
                id="status"
                header={{content: "Status"}}
                cell={{renderer: r => r.status}}
                sortable
                sortValueFn={r => r.status}
              />

              <Table.Column
                id="notes"
                header={{content: "Notes"}}
                cell={{renderer: r => r.notes}}
                width="100%"
              />
            </Table>
          `}
        >
          <Button
            onClick={() => {
              this._reload(Math.random() * 5000);
              this.refs.table.setCurrentPage(1);
            }}
            type="secondary"
            value="Reload random data"
          />
          <div style={{width: "300px", marginTop: "20px"}}>
            <TextInput
              label="Filter by name"
              name="tableFilter"
              placeholder="Filter by name"
              onChange={e => {
                this.setState({tableFilter: e.target.value});
                this.refs.table.setCurrentPage(1);
              }}
              value={this.state.tableFilter}
            />
          </div>
          <div style={{marginTop: "20px"}}>
            <Table
              data={tableData}
              filter={rowData => !this.state.tableFilter || _.includes(
                [rowData.name.first, rowData.name.last].join(" "),
                this.state.tableFilter.trim().toLowerCase()
              )}
              initialPage={24}
              initialSortState={{columnID: "name", direction: Table.sortDirection.ASCENDING}}
              ref="table"
              onPageChange={page => console.log("Table page changed:", page)}
              onSortChange={sortState => console.log("Table sort changed:", sortState)}
              onRowClick={enableRowClick
                ? (e, row) => console.log("Table row clicked:", row)
                : undefined
              }
              onViewChange={data => console.log("Table view changed:", data.map(d => d.id))}
              paginated
              pageSize={9}
              rowIDFn={r => r.id}
            >
              <Table.Column
                id="details"
                cell={{renderer: r => (
                  <ModalButton
                    type="link"
                    size="small"
                    value={"\u2630 Details"}
                    modalTitle="Details"
                  >
                    <p style={{whiteSpace: "normal"}}>{r.notes}</p>
                  </ModalButton>
                )}}
                noWrap
              />

              <Table.Column
                id="name"
                header={{content: "Name"}}
                cell={{
                  className: "capitalize",
                  renderer: r => [r.name.first, r.name.last].join(" "),
                }}
                sortable
                sortValueFn={r => [r.name.first, r.name.last].join(" ")}
                width="25%"
              />

              <Table.Column
                id="age"
                header={{content: "Age"}}
                cell={{renderer: r => r.age}}
                sortable
                sortValueFn={r => r.age}
              />

              <Table.Column
                id="status"
                header={{content: "Status"}}
                cell={{renderer: r => r.status}}
                sortable
                sortValueFn={r => r.status}
              />

              <Table.Column
                id="notes"
                header={{content: "Notes"}}
                cell={{renderer: r => r.notes}}
                width="100%"
              />
            </Table>
          </div>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={enableRowClick}
              onChange={({target}) => this.setState({enableRowClick: target.checked})}
            />
            {" "}
            Clickable rows (see console)
          </label>
        </Example>

        <Example
          code={`
            <Table
              lazy
              getData={
                async ({startingAfter, pageSize}) => {
                  let start = 0;
                  if (startingAfter != null) {
                    start = _.findIndex(tableData, r => r.id === startingAfter);
                  }
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  return tableData.slice(start + 1, start + pageSize + 1);
                }
              }
              numRows={tableData.length}
              onPageChange={page => console.log("Table page changed:", page)}
              onSortChange={sortState => console.log("Table sort changed:", sortState)}
              onViewChange={data => console.log("Table view changed:", data.map(d => d.id))}
              paginated
              pageSize={9}
              rowIDFn={r => r.id}
            >
              <Table.Column
                id="details"
                cell={{renderer: r => (
                  <ModalButton
                    type="link"
                    size="small"
                    value={"\u2630 Details"}
                    modalTitle="Details"
                  >
                    <p style={{whiteSpace: "normal"}}>{r.notes}</p>
                  </ModalButton>
                )}}
                noWrap
              />

              <Table.Column
                id="name"
                header={{content: "Name"}}
                cell={{
                  className: "capitalize",
                  renderer: r => [r.name.first, r.name.last].join(" "),
                }}
                width="25%"
              />

              <Table.Column
                id="age"
                header={{content: "Age"}}
                cell={{renderer: r => r.age}}
              />

              <Table.Column
                id="status"
                header={{content: "Status"}}
                cell={{renderer: r => r.status}}
              />

              <Table.Column
                id="notes"
                header={{content: "Notes"}}
                cell={{renderer: r => r.notes}}
                width="100%"
              />
            </Table>
          `}
        >
          <h2>Lazy Table</h2>
          <div style={{marginTop: "20px"}}>
            <Table
              lazy
              getData={getDataLazily}
              numRows={tableData.length}
              onPageChange={page => console.log("Table page changed:", page)}
              onSortChange={sortState => console.log("Table sort changed:", sortState)}
              onViewChange={data => console.log("Table view changed:", data.map(d => d.id))}
              paginated
              pageSize={9}
              rowIDFn={r => r.id}
            >
              <Table.Column
                id="details"
                cell={{renderer: r => (
                  <ModalButton
                    type="link"
                    size="small"
                    value={"\u2630 Details"}
                    modalTitle="Details"
                  >
                    <p style={{whiteSpace: "normal"}}>{r.notes}</p>
                  </ModalButton>
                )}}
                noWrap
              />

              <Table.Column
                id="name"
                header={{content: "Name"}}
                cell={{
                  className: "capitalize",
                  renderer: r => [r.name.first, r.name.last].join(" "),
                }}
                width="25%"
              />

              <Table.Column
                id="age"
                header={{content: "Age"}}
                cell={{renderer: r => r.age}}
              />

              <Table.Column
                id="status"
                header={{content: "Status"}}
                cell={{renderer: r => r.status}}
              />

              <Table.Column
                id="notes"
                header={{content: "Notes"}}
                cell={{renderer: r => r.notes}}
                width="100%"
              />
            </Table>
          </div>
        </Example>
      </View>
    );
  }
}

TableView.cssClass = {
  CONFIG: "TableView--config",
  CONTAINER: "TableView",
};
