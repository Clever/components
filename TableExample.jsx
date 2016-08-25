/* eslint-disable no-console */
import lodash from "lodash";
import loremIpsum from "lorem-ipsum";
import React, {Component} from "react";

import {Table, TextInput, ModalButton} from "../src/";

const tableData = [];
for (var i = 0; i < 10; i++) {
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


export default class TableExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableFilter: "",
    };
  }

  render() {
    return (
      <div style={{width: "900px", margin: "30px 0"}}>
        <a name="table">
          <h1>Table</h1>
        </a>
        <div style={{width: "300px"}}>
          <TextInput
            label="Filter by name"
            name="tableFilter"
            placeholder="Filter by name"
            onChange={e => this.setState({tableFilter: e.target.value})}
            value={this.state.tableFilter}
          />
        </div>
        <div style={{marginTop: "20px"}}>
          <Table
            data={tableData}
            filter={rowData => !this.state.tableFilter || lodash.includes(
              [rowData.name.first, rowData.name.last].join(" "),
              this.state.tableFilter.trim().toLowerCase()
            )}
            initialSortState={{columnID: "name", direction: Table.sortDirection.ASCENDING}}
            onSortChange={sortState => console.log("Table sort changed:", sortState)}
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
      </div>
    );
  }
}
