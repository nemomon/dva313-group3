import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

//https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Welcome&selectedStory=react%20bootstrap%20table%202%20&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: "Item name " + id,
      salary: 2100 + i,
      social: 10 * id,
      increment: 1 + id / 100
    });
  }
}

addProducts(5);

const cellEditProp = {
  mode: "click"
};

class testTable extends Component {
  constructor(props) {
    super(props);
    //this.products = getProducts();
    //this.state = { data: this.products };
    this.options = {
      defaultSortName: "name", // default sort column name
      defaultSortOrder: "desc" // default sort order
    };
  }

  createCustomInsertButton = openModal => {
    return (
      <button type="button" class="btn btn-dark m-1" onClick={openModal}>
        Add
      </button>
    );
  };

  createCustomDeleteButton = onBtnClick => {
    return (
      <button type="button" class="btn btn-dark m-1" onClick={onBtnClick}>
        Delete
      </button>
    );
  };

  render() {
    const options = {
      insertBtn: this.createCustomInsertButton,
      deleteBtn: this.createCustomDeleteButton
    };
    const selectRow = {
      mode: "checkbox"
    };

    return (
      <div>
        <BootstrapTable
          data={products}
          cellEdit={cellEditProp}
          selectRow={selectRow}
          options={options}
          insertRow
          deleteRow
          tableStyle={{
            backgroundColor: "#eeeeee"
            //border: "#0000FF 2.5px solid"
          }}
          //containerStyle={{ border: "#FFBB73 2.5px solid" }}
          //headerStyle={{ border: "red 1px solid" }}
          //bodyStyle={{ border: "green 1px solid" }}
        >
          <TableHeaderColumn dataField="id" isKey={true} dataSort={true}>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataSort={true}>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="salary" dataSort={true}>
            Salary
          </TableHeaderColumn>
          <TableHeaderColumn dataField="social" dataSort={true}>
            Social Factor
          </TableHeaderColumn>
          <TableHeaderColumn dataField="increment" dataSort={true}>
            Increment Factor
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default testTable;
