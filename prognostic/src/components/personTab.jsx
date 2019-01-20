import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import PHPController from "./PHPController";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class personTab extends Component {
  constructor(props) {
    super(props);
    this.PHPController = new PHPController();
    this.state = {
      persons: [],
      hidden: true
    };
    this.options = {
      defaultSortName: "Name",
      defaultSortOrder: "desc"
    };
  }

  componentDidMount() {
    let persons = this.PHPController.getPersons();
    this.setState({ persons: persons });
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
    if (row.Name == "") return "Please enter a name.";
    if (row.Salary == "") return "Please enter a salary.";
    if (isNaN(row.Salary)) return "Salary must be a number.";
    if (row.Salary < 0) return "Salary must be positive.";
    if (row.SocialFactor == "") return "Please enter a social factor.";
    if (isNaN(row.SocialFactor)) return "Social factor must be a number.";
    if (row.SocialFactor < 0 || row.SocialFactor > 9.99)
      return "Social Factor must be in the range of 0 - 9.99.";
    if (row.IncrementFactor == "") return "Please enter an increment factor.";
    if (isNaN(row.IncrementFactor)) return "Increment factor must be a number.";
    if (row.IncrementFactor < 0 || row.IncrementFactor > 9.99)
      return "Increment Factor must be in the range of 0 - 9.99.";

    errorCallback();
  };

  onAfterInsertRow(row) {
    row.Id = "T" + row.Id;
    this.PHPController = new PHPController();
    let newPerson = {
      Id: row["Id"],
      Name: row["Name"],
      Salary: row["Salary"],
      SocialFactor: row["SocialFactor"],
      IncrementFactor: row["IncrementFactor"],
      Flag: "I"
    };
    this.PHPController.insertPerson(newPerson);
  }

  onAfterDeleteRow(rowKeys, rows) {
    console.log(rowKeys);
    console.log(rows);
    let PHP = new PHPController();
    for (let i = 0; i < rows.length; i++) {
      let id = rowKeys[i];
      id = rowKeys[i];

      let removePerson = {
        Id: id,
        Flag: "D"
      };
      PHP.deletePerson(removePerson);
    }
  }

  onBeforeSaveCell(row, cellName, cellValue) {
    if (cellValue == "") {
      toast.error(({ closeToast }) => <div>The field can not be empty.</div>);
      return false;
    }
    if (
      cellName == "Salary" ||
      cellName == "SocialFactor" ||
      cellName == "IncrementFactor"
    ) {
      if (isNaN(cellValue)) {
        toast.error(({ closeToast }) => <div>The value must be a number.</div>);
        return false;
      }
    }
    if (cellName == "Salary") {
      if (cellValue < 0) {
        toast.error(({ closeToast }) => <div>The value must be positive.</div>);
        return false;
      }
    }
    if (cellName == "SocialFactor" || cellName == "IncrementFactor") {
      if (cellValue < 0 || cellValue > 9.99) {
        toast.error(({ closeToast }) => (
          <div>The value must be in the range of 0 - 9.99.</div>
        ));
        return false;
      }
    }

    return true;
  }

  onAfterSaveCell(row, cellName, cellValue) {
    let PHP = new PHPController();
    let updatedPerson = {
      Id: row["Id"],
      Name: row["Name"],
      Salary: row["Salary"],
      SocialFactor: row["SocialFactor"],
      IncrementFactor: row["IncrementFactor"],
      Flag: "U"
    };
    PHP.updatePerson(updatedPerson);
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
          data={this.state.persons}
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
          <TableHeaderColumn dataField="Salary" dataSort={true}>
            Salary
          </TableHeaderColumn>
          <TableHeaderColumn dataField="SocialFactor" dataSort={true}>
            Social Factor
          </TableHeaderColumn>
          <TableHeaderColumn dataField="IncrementFactor" dataSort={true}>
            Increment Factor
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default personTab;