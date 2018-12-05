import React, { Component } from "react";
import "./App.css";
import NavigationBar from "./components/navigationBar";
import AllocationTab from "./components/allocation_tab/allocationTab";

class App extends Component {
  render() {
    return (
      /*  Attach the diffenrent components her to build the whole UI */
      <React.Fragment>
        <NavigationBar />
        <AllocationTab />
      </React.Fragment>
    );
  }
}

export default App;
