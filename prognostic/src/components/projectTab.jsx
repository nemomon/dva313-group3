import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import PHPController from "./PHPController";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class projectTab extends Component {
  constructor(props) {
    super(props);
    this.PHPController = new PHPController();
    this.state = {
      projects: [],
      hidden: true
    };
    this.options = {
      defaultSortName: "Name",
      defaultSortOrder: "desc"
    };
  }

  componentDidMount() {
    let projects = this.PHPController.getProjects();
    this.setState({ projects: projects });
  }

  createCustomInsertButton = openModal => {
    return (
      <button
        type="button"
        className="btn btn-dark m-1"
        onClick={openModal}
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 8,
          paddingBottom: 8
        }}
      >
        Add
      </button>
    );
  };

  createCustomDeleteButton = onBtnClick => {
    return (
      <button
        type="button"
        className="btn btn-dark m-1"
        onClick={onBtnClick}
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 8,
          paddingBottom: 8
        }}
      >
        Delete
      </button>
    );
  };

  onAddRow = (row, colInfo, errorCallback) => {
    if (
      row.EndDate.length != 10 ||
      row.EndDate.charAt(4) != "-" ||
      row.EndDate.charAt(7) != "-"
    )
      return "Please use the following date format: XXXX-XX-XX.";
    if (row.OverheadConstant < 0 || row.OverheadConstant > 9.99)
      return "Overhead Constant must be in the range of 0 - 9.99.";
    if (row.Stl != 0 && row.Stl != 1)
      return "STL must be 1 (true) or 0 (false).";
    errorCallback();
  };

  onAfterInsertRow(row) {
    row.Id = "T" + row.Id;
    this.PHPController = new PHPController();
    let newProject = {
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
      SpendingDate: "",
      SpendingExternalSalary: "0",
      SpendingExternalOverhead: "0",
      SpendingExternalOtherCost: "0",
      SpendingInternalSalary: "0",
      SpendingInternalOverhead: "0",
      SpendingInternalOtherCost: "0",
      Flag: "I"
    };
    this.PHPController.insertProject(newProject);
  }

  onAfterDeleteRow(rowKeys, rows) {
    let PHP = new PHPController();
    for (let i = 0; i < rows.length; i++) {
      let id = rowKeys[i];
      id = rowKeys[i];

      let removeProject = {
        Id: id,
        Flag: "D"
      };
      PHP.deleteProject(removeProject);
    }
  }

  onBeforeSaveCell(row, cellName, cellValue) {
    if (cellName == "EndDate") {
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
    if (cellName == "OverheadConstant") {
      if (cellValue < 0 || cellValue > 9.99) {
        toast.error(({ closeToast }) => (
          <div>Overhead Constant must be in the range of 0 - 9.99.</div>
        ));
        return false;
      }
    }
    if (cellName == "Stl") {
      if (cellValue != 0 && cellValue != 1) {
        toast.error(({ closeToast }) => (
          <div>STL must be 1 (true) or 0 (false).</div>
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
    const options = {
      insertBtn: this.createCustomInsertButton,
      deleteBtn: this.createCustomDeleteButton,
      onAddRow: this.onAddRow,
      afterInsertRow: this.onAfterInsertRow,
      afterDeleteRow: this.onAfterDeleteRow
    };
    const selectRow = {
      mode: "checkbox"
    };
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
          data={this.state.projects}
          cellEdit={cellEditProp}
          selectRow={selectRow}
          options={options}
          insertRow
          deleteRow
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
          <TableHeaderColumn dataField="EndDate" dataSort={true}>
            End Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="ExternalSalary" dataSort={true}>
            Ext. Salary
          </TableHeaderColumn>
          <TableHeaderColumn dataField="ExternalOverhead" dataSort={true}>
            Ext. Overhead
          </TableHeaderColumn>
          <TableHeaderColumn dataField="ExternalOtherCost" dataSort={true}>
            Ext. Other Costs
          </TableHeaderColumn>
          <TableHeaderColumn dataField="InternalSalary" dataSort={true}>
            Int. Salary
          </TableHeaderColumn>
          <TableHeaderColumn dataField="InternalOverhead" dataSort={true}>
            Int. Overhead
          </TableHeaderColumn>
          <TableHeaderColumn dataField="InternalOtherCost" dataSort={true}>
            Int. Other Costs
          </TableHeaderColumn>
          <TableHeaderColumn dataField="OverheadConstant" dataSort={true}>
            Overhead Const.
          </TableHeaderColumn>
          <TableHeaderColumn dataField="Stl" dataSort={true}>
            STL
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default projectTab;
