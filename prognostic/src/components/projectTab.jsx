import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import PHPController from "./PHPController";

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
      afterInsertRow: this.onAfterInsertRow,
      afterDeleteRow: this.onAfterDeleteRow
    };
    const selectRow = {
      mode: "checkbox"
    };
    const cellEditProp = {
      mode: "click",
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    };

    return (
      <div className="tableDiv">
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