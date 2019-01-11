import React, { Component } from "react";
import "./App.css";
import NavigationBar from "./components/navigationBar";
import AllocationTab from "./components/allocation_tab/allocationTab";
import PersonTab from "./components/personTab";
import ProjectTab from "./components/projectTab";
import SpendingTab from "./components/spendingTab";
import RemainingTab from "./components/remainingTab";
import EndBalanceTab from "./components/endBalanceTab";
import { Route, withRouter } from "react-router-dom";
import BodyBackgroundColor from "react-body-backgroundcolor";
import AllocationView from "./components/allocation_tab/allocation_view/allocationView";




class App extends Component {

  render() {
    return (
      /*  Attach the diffenrent components her to build the whole UI */
      <BodyBackgroundColor backgroundColor='#3d3d3d'>
        <React.Fragment>
          <NavigationBar />
          <Route path="/allocationTable" component={AllocationTab} />
          <Route path="/personTable" component={PersonTab} />
          <Route path="/projectTable" component={ProjectTab} />
          <Route path="/spendingTable" component={SpendingTab} />
          <Route path="/remaningTable" component={RemainingTab} />
          <Route path="/endBalanceTable" component={EndBalanceTab} />
        </React.Fragment>
      </BodyBackgroundColor>


    );
  }
}


export default withRouter(App);
