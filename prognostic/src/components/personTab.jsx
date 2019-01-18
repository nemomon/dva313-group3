import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import PHPController from "./PHPController";

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

      console.log(removePerson);
      PHP.deletePerson(removePerson);
    }
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