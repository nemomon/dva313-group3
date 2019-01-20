import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import PHPController from "./PHPController";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  onBeforeSaveCell(row, cellName, cellValue) {
    if (cellValue == "") {
      toast.error(({ closeToast }) => <div>Value can not be empty.</div>);
      return false;
    }

    if (
      cellName == "SpendingExternalSalary" ||
      cellName == "SpendingExternalOverhead" ||
      cellName == "SpendingExternalOtherCost" ||
      cellName == "SpendingInternalSalary" ||
      cellName == "SpendingInternalOtherCost" ||
      cellName == "SpendingInternalOverhead"
    ) {
      if (isNaN(cellValue)) {
        toast.error(({ closeToast }) => <div>Value must be a number.</div>);
        return false;
      }
    }

    if (cellName == "SpendingDate") {
      if (
        cellValue.length != 10 ||
        cellValue.charAt(4) != "-" ||
        cellValue.charAt(7) != "-"
      ) {
        toast.error(({ closeToast }) => (
          <div>Please use the following date format: XXXX-XX-XX.</div>
        ));
        return false;
      }
    }
    return true;
  }

  onAfterSaveCell(row, cellName, cellValue) {
    let PHP = new PHPController();
    let updatedProject = {
      Id: row["Id"],
      Name: row["Name"],
      EndDate: row["EndDate"],
      ExternalSalary: row["ExternalSalary"],
      ExternalOverhead: row["ExternalOverhead"],
      ExternalOtherCost: row["ExternalOtherCost"],
      InternalSalary: row["InternalSalary"],
      InternalOverhead: row["InternalOverhead"],
      InternalOtherCost: row["InternalOtherCost"],
      OverheadConstant: row["OverheadConstant"],
      Stl: row["Stl"],
      SpendingDate: row["SpendingDate"],
      SpendingExternalSalary: row["SpendingExternalSalary"],
      SpendingExternalOverhead: row["SpendingExternalOverhead"],
      SpendingExternalOtherCost: row["SpendingExternalOtherCost"],
      SpendingInternalSalary: row["SpendingInternalSalary"],
      SpendingInternalOverhead: row["SpendingInternalOverhead"],
      SpendingInternalOtherCost: row["SpendingInternalOtherCost"],
      Flag: "U"
    };
    PHP.updateProject(updatedProject);
  }

  render() {
    const cellEditProp = {
      mode: "click",
      blurToSave: true,
      beforeSaveCell: this.onBeforeSaveCell,
      afterSaveCell: this.onAfterSaveCell
    };
    return (
      <div className="tableDiv">
        <ToastContainer />
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