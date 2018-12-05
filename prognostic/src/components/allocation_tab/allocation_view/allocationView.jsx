import React, { Component } from "react";
import ProjectContainer from './projectContainer';
import "./allocationView.css"

/*
  The allocationView is responsible for fetching all projects and setting up it's child
  components correctly through props. 

*/

const SIZE = 10;

class AllocationView extends Component {
  state = {
    projects: []
  };

  getProjects() {
    this.state.projects = [];
    for (var i = 1; i <= SIZE; i++) {
      this.state.projects.push({ name: "Project" + i });
    }
  }

  render() {
    return (
      <div className="prog-av">
        {this.getProjects()}
        {this.state.projects.map(ele => <ProjectContainer name={ele.name} />)}
      </div>
    );
  }
}

export default AllocationView;
