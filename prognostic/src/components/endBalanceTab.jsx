import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import PHPController from "./PHPController";

const cellEditProp = {
  mode: "click"
};

class endBalanceTab extends Component {
  constructor(props) {
    super(props);
    this.PHPController = new PHPController();
    this.state = {
      endbalances: [],
      hidden: true
    };
    this.options = {
      defaultSortName: "Name",
      defaultSortOrder: "desc"
    };
  }

  componentDidMount() {
    let endbalances = this.PHPController.getEndBalances();
    this.setState({ endbalances: endbalances });
  }

  render() {
    return (
      <div className="tableDiv">
        <BootstrapTable
          data={this.state.endbalances}
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
          <TableHeaderColumn dataField="ExternalSalary" dataSort={true}>
            Ext. Salary
          </TableHeaderColumn>
          <TableHeaderColumn dataField="InternalSalary" dataSort={true}>
            Int. Salary
          </TableHeaderColumn>
          <TableHeaderColumn dataField="ExternalOverhead" dataSort={true}>
            Ext. Overhead
          </TableHeaderColumn>
          <TableHeaderColumn dataField="InternalOverhead" dataSort={true}>
            Int. Overhead
          </TableHeaderColumn>
          <TableHeaderColumn dataField="ExternalOtherCost" dataSort={true}>
            Ext. Other Costs
          </TableHeaderColumn>
          <TableHeaderColumn dataField="InternalOtherCost" dataSort={true}>
            Int. Other Costs
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default endBalanceTab;