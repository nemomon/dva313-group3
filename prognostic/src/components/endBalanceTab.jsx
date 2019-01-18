import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import PHPController from "./PHPController";

function cellColorFormatter(cell, row) {
  let c = "gray";
  if (parseInt(cell) < 0) c = "red";
  return (
    <span>
      <strong style={{ color: c }}>{parseInt(cell)}</strong>
    </span>
  );
}

function summaryFormatter(cell, row) {
  let value =
    parseInt(row["InternalOverhead"]) +
    parseInt(row["ExternalOverhead"]) +
    parseInt(row["InternalSalary"]) +
    parseInt(row["ExternalSalary"]) +
    parseInt(row["InternalOtherCost"]) +
    parseInt(row["ExternalOtherCost"]);

  let c = "gray";
  if (value < 0) c = "red";
  return (
    <span>
      <strong style={{ color: c }}>{value}</strong>
    </span>
  );
}

function toggleButtonText(state) {
  let text = "Toggle";
  if (state == false) {
    text = "Collapse";
  } else {
    text = "Expand";
  }
  return <span>{text}</span>;
}

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

  handleEvent = event => {
    this.state.hidden = !this.state.hidden;
    let endbalances = this.PHPController.getEndBalances();
    this.setState({ endbalances: endbalances });
  };

  render() {
    return (
      <div className="tableDiv">
        <button
          type="button"
          class="btn btn-dark m-2"
          onClick={this.handleEvent}
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 8,
            paddingBottom: 8,
            width: 100
          }}
        >
          {toggleButtonText(this.state.hidden)}
        </button>
        <BootstrapTable
          data={this.state.endbalances}
          tableStyle={{
            backgroundColor: "#eeeeee"
          }}
        >
          <TableHeaderColumn
            dataField="Id"
            isKey={true}
            dataSort={true}
            hidden={true}
            autoValue={true}
          >
            Id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Name" dataSort={true}>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="EndBalance"
            dataSort={true}
            dataFormat={summaryFormatter}
          >
            End Balance
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="ExternalSalary"
            dataSort={true}
            hidden={this.state.hidden}
            dataFormat={cellColorFormatter}
          >
            Ext. Salary
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="InternalSalary"
            dataSort={true}
            hidden={this.state.hidden}
            dataFormat={cellColorFormatter}
          >
            Int. Salary
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="ExternalOverhead"
            dataSort={true}
            hidden={this.state.hidden}
            dataFormat={cellColorFormatter}
          >
            Ext. Overhead
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="InternalOverhead"
            dataSort={true}
            hidden={this.state.hidden}
            dataFormat={cellColorFormatter}
          >
            Int. Overhead
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="ExternalOtherCost"
            dataSort={true}
            hidden={this.state.hidden}
            dataFormat={cellColorFormatter}
          >
            Ext. Other Costs
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="InternalOtherCost"
            dataSort={true}
            hidden={this.state.hidden}
            dataFormat={cellColorFormatter}
          >
            Int. Other Costs
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default endBalanceTab;
