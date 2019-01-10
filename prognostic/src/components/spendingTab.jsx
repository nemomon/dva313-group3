import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import PHPController from "./PHPController";

const cellEditProp = {
  mode: "click"
};

class spendingTab extends Component {
  constructor(props) {
    super(props);
    this.PHPController = new PHPController();
    this.state = {
      spendings: [],
      hidden: true
    };
    this.options = {
      defaultSortName: "Name",
      defaultSortOrder: "desc"
    };
  }

  componentDidMount() {
    let spendings = this.PHPController.getProjects();
    this.setState({ spendings: spendings });
  }

  render() {
    return (
      <div className="tableDiv">
        <BootstrapTable
          data={this.state.spendings}
          cellEdit={cellEditProp}
          tableStyle={{
            backgroundColor: "#eeeeee"
          }}
        >
          <TableHeaderColumn
            dataField="Id"
            isKey={true}
            dataSort={true}
            hidden={this.state.hidden}
            autoValue={true}
          >
            Id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Name" dataSort={true}>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="SpendingDate" dataSort={true}>
            Spending Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="SpendingExternalSalary" dataSort={true}>
            Ext. Salary
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="SpendingExternalOverhead"
            dataSort={true}
          >
            Ext. Overhead
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="SpendingExternalOtherCost"
            dataSort={true}
          >
            Ext. Other Costs
          </TableHeaderColumn>
          <TableHeaderColumn dataField="SpendingInternalSalary" dataSort={true}>
            Int. Salary
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="SpendingInternalOverhead"
            dataSort={true}
          >
            Int. Overhead
          </TableHeaderColumn>
          <TableHeaderColumn dataField="InternalOtherCost" dataSort={true}>
            Int. Other Costs
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default spendingTab;