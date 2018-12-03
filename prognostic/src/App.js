import React, { Component } from "react";
import "./App.css";
import NavigationBar from "./components/navigationBar";
import PersonTable from "./components/personsTable";

class App extends Component {
  render() {
    return (
      /*  Attach the diffenrent components her to build the whole UI */
      <React.Fragment>
        <NavigationBar />
        <PersonTable />
      </React.Fragment>
    );
  }
}

export default App;
