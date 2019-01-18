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
      selectedId: null,
      selectedName: "",
      persons: []
    }
    
  }

  componentDidMount() {
    let persons = this.PHPController.getPersons();
    this.setState({ persons: persons });
  }

  updateAllocationView = (id, name) => {
    this.setState({ selectedId: id,  selectedName: name})
  }

  render() {
    console.log("RENDER: AllocationTab.jsx");

    return (
      <div className="prog-at">
        <Search
          updateAllocationView={this.updateAllocationView}
          persons={this.state.persons}
        />
        <AllocationView 
        personId={this.state.selectedId}
        personName={this.state.selectedName} />
      </div>
    );
  }
}

export default AllocationTab;
