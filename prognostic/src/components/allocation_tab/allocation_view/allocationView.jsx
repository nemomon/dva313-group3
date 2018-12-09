import React, { Component } from "react";
import ProjectContainer from './projectContainer';
import TotalContainer from './totalContainer';

/*
  The allocationView is responsible for fetching all projects and setting up it's child
  components correctly through props. 

*/


const groups = [
  {
    id: 1,
    content: 'Project 1'
    // Optional: a field 'className', 'style', 'order', [properties]
  },
  {
    id: 2,
    content: 'Project 2'
    // Optional: a field 'className', 'style', 'order', [properties]
  },
  {
    id: 3,
    content: 'Project 3'
    // Optional: a field 'className', 'style', 'order', [properties]
  },
  {
    id: 4,
    content: 'Project 4'
    // Optional: a field 'className', 'style', 'order', [properties]
  },
  {
    id: 5,
    content: 'Project 5'
    // Optional: a field 'className', 'style', 'order', [properties]
  }
];


/* items on the timeline */
const items = [
  {
    id: 1,
    group: 0,
    start: new Date(2018, 11, 1),
    end: new Date(2018, 11, 4), // end is optional
    content: "allocation",
  }
];

const SIZE = 10;

class AllocationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []
    };

    this.getProjects();
  }

  getProjects() {
    for (var i = 1; i <= SIZE; i++) {
      this.state.projects.push({ name: "Project" + i });
    }

  }

  getGroups() {
    var groups = [];

    for (var i = 0; i < SIZE; i++) {
      groups.push({ id: i, content: this.state.projects[i].name });
    }

    return groups;
  }

  render() {
    return (
      <div className="prog-av">
        <div className="prog-av-user">Leia Skywalker</div>
        <TotalContainer name={"Total"} />
        <ProjectContainer items={items} groups={this.getGroups()} />
      </div>
    );
  }
}

export default AllocationView;
