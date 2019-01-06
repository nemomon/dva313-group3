import React, { Component } from "react";
import AllocationView from "./allocation_view/allocationView";
import Search from "./persons_list/search";
import "./allocationTab.css"
import PHPController from "../PHPController";


class AllocationTab extends Component {
  constructor(props) {
    super(props);

    this.PHPController = new PHPController();

    this.state = {
      selectedPerson: null,
      persons: []
    }

  }

  componentDidMount() {
    this.PHPController.getPersons(result => this.setState({ persons: result }));
  }

  updateAllocationView = (id) => {
    this.setState({ selectedPerson: id })
  }

  render() {
    console.log("RENDER: AllocationTab.jsx");

    return (
      <div className="prog-at">
        <Search
          updateAllocationView={this.updateAllocationView}
          persons={this.state.persons}
        />
        <AllocationView person={this.state.selectedPerson} />
      </div>
    );
  }
}

export default AllocationTab;
