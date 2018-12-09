import React, { Component } from "react";
import "./App.css";
import NavigationBar from "./components/navigationBar";
import AllocationTab from "./components/allocation_tab/allocationTab";
import PersonTable from "./components/personsTable";
import TestTable from "./components/testTable";

class App extends Component {
  render() {
    return (
      /*  Attach the diffenrent components her to build the whole UI */
      /* Replace <AllocationTab /> with <TestTable /> to try out the table */
      <React.Fragment>
        <NavigationBar />
        <AllocationTab />
      </React.Fragment>
    );
  }
}

export default App;
