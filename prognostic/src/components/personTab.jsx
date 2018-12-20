import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";


//https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Welcome&selectedStory=react%20bootstrap%20table%202%20&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel

const products = [];

function addProduct(nam, sal, soc, inc) {
  const id = products.length + 1;
  products.push({
    //id: id,
    name: nam,
    salary: sal,
    social: soc,
    increment: inc
  });
}

// Dummy values below. Remove later.
// vvv
function rand() {
  return Math.floor(Math.random() * 10000) + 1;
}
addProduct("Filip", rand(), rand(), rand());
addProduct("Christoffer", rand(), rand(), rand());
addProduct("Erika", rand(), rand(), rand());
addProduct("Sai", rand(), rand(), rand());
addProduct("Zaid", rand(), rand(), rand());
addProduct("Osamah", rand(), rand(), rand());
addProduct("Mohammed", rand(), rand(), rand());
addProduct("Matko", rand(), rand(), rand());
// ^^^
// End of dummy values

const cellEditProp = {
  mode: "click"
};

class personTab extends Component {
  constructor(props) {
    super(props);
    this.options = {
      defaultSortName: "name",
      defaultSortOrder: "desc"
    };
  }

  createCustomInsertButton = openModal => {
    return (
      <button type="button" className="btn btn-dark m-1" onClick={openModal} style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 8, paddingBottom: 8 }}>
        Add
      </button>
    );
  };

  createCustomDeleteButton = onBtnClick => {
    return (
      <button type="button" className="btn btn-dark m-1" onClick={onBtnClick} style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 8, paddingBottom: 8 }}>
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
      <div className="tableDiv">
        <BootstrapTable
          data={products}
          cellEdit={cellEditProp}
          selectRow={selectRow}
          options={options}
          insertRow
          deleteRow
          tableStyle={{
            backgroundColor: "#eeeeee"
          }}
        >
          <TableHeaderColumn dataField="name" isKey={true} dataSort={true}>
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

export default personTab;
