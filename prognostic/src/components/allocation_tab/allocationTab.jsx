import React, { Component } from "react";
import AllocationView from "./allocation_view/allocationView";

class AllocationTab extends Component {
  render() {
    return (
      <div className="prog-allocation-tab">
        <AllocationView />
      </div>
    );
  }
}
export default AllocationTab;
