import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

//https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Welcome&selectedStory=react%20bootstrap%20table%202%20&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel

const products = [];

function addProduct(nam, eSal, iSal, eOH, iOH, eOC, iOC) {
  const id = products.length + 1;
  products.push({
    //id: id,
    name: nam,
    extSalary: eSal,
    intSalary: iSal,
    extOverhead: eOH,
    intOverhead: iOH,
    extOtherCosts: eOC,
    intOtherCosts: iOC
  });
}
const cellEditProp = {
  mode: "click"
};

class endBalanceTab extends Component {
  constructor(props) {
    super(props);
    this.options = {
      defaultSortName: "name",
      defaultSortOrder: "desc"
    };
  }

  render() {
    return (
      <div>
        <BootstrapTable
          data={products}
          cellEdit={cellEditProp}
          tableStyle={{
            backgroundColor: "#eeeeee"
          }}
        >
          <TableHeaderColumn dataField="name" isKey={true} dataSort={true}>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="extSalary" dataSort={true}>
            Ext. Salary
          </TableHeaderColumn>
          <TableHeaderColumn dataField="intSalary" dataSort={true}>
            Int. Salary
          </TableHeaderColumn>
          <TableHeaderColumn dataField="extOverhead" dataSort={true}>
            Ext. Overhead
          </TableHeaderColumn>
          <TableHeaderColumn dataField="intOverhead" dataSort={true}>
            Int. Overhead
          </TableHeaderColumn>
          <TableHeaderColumn dataField="extOtherCosts" dataSort={true}>
            Ext. Other Costs
          </TableHeaderColumn>
          <TableHeaderColumn dataField="intOtherCosts" dataSort={true}>
            Int. Other Costs
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default endBalanceTab;
