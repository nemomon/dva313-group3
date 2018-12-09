import React, { Component } from "react";
import AllocationView from "./allocation_view/allocationView";
import Search from "./persons_list/search";
import "./allocationTab.css"

class AllocationTab extends Component {
  render() {
    return (
      <div className="prog-at">
        <Search />
        <AllocationView />
      </div>
    );
  }
}
export default AllocationTab;
