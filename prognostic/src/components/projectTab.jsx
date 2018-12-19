import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

//https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Welcome&selectedStory=react%20bootstrap%20table%202%20&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel

const products = [];

function addProduct(nam, eDate, eSal, eOH, eOC, iSal, iOH, iOC, OHc, s) {
  const id = products.length + 1;
  products.push({
    //id: id,
    name: nam,
    endDate: eDate,
    extSalary: eSal,
    extOverhead: eOH,
    extOtherCosts: eOC,
    intSalary: iSal,
    intOverhead: iOH,
    intOtherCosts: iOC,
    OHconst: OHc,
    stl: s
  });
}

const cellEditProp = {
  mode: "click"
};

class projectTab extends Component {
  constructor(props) {
    super(props);
    this.options = {
      defaultSortName: "name",
      defaultSortOrder: "desc"
    };
  }

  createCustomInsertButton = openModal => {
    return (
      <button type="button" class="btn btn-dark m-1" onClick={openModal} style={{paddingLeft:15, paddingRight:15, paddingTop:8, paddingBottom:8}}>
        Add
      </button>
    );
  };

  createCustomDeleteButton = onBtnClick => {
    return (
      <button type="button" class="btn btn-dark m-1" onClick={onBtnClick} style = {{paddingLeft:15, paddingRight:15, paddingTop:8, paddingBottom:8}}>
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
      <div className ="tableDiv">
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
          <TableHeaderColumn dataField="endDate" dataSort={true}>
            End Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="extSalary" dataSort={true}>
            Ext. Salary
          </TableHeaderColumn>
          <TableHeaderColumn dataField="extOverhead" dataSort={true}>
            Ext. Overhead
          </TableHeaderColumn>
          <TableHeaderColumn dataField="extOtherCosts" dataSort={true}>
            Ext. Other Costs
          </TableHeaderColumn>
          <TableHeaderColumn dataField="intSalary" dataSort={true}>
            Int. Salary
          </TableHeaderColumn>
          <TableHeaderColumn dataField="intOverhead" dataSort={true}>
            Int. Overhead
          </TableHeaderColumn>
          <TableHeaderColumn dataField="intOtherCosts" dataSort={true}>
            Int. Other Costs
          </TableHeaderColumn>
          <TableHeaderColumn dataField="OHconst" dataSort={true}>
            Overhead Const.
          </TableHeaderColumn>
          <TableHeaderColumn dataField="stl" dataSort={true}>
            STL
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default projectTab;
