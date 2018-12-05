import React, { Component } from "react";
import Timeline from "react-visjs-timeline";

/* options for the timeline */
const options = {
  width: "100%",
  height: "150px",
  start: new Date(),
  editable: true,
  zoomMax: 1000 * 60 * 60 * 24 * 24 * 250,
  zoomMin: 1000 * 60 * 60 * 24 * 24,
  align: "left",
  stack: false,
  type: "range",
  onAdd: function(item, callback) {
    item.content = "DUMMY";
    callback(item);
  },
  onMove: function(item, callback) {
    alert("MOVED: " + item.content);
    callback(item);
  }
};

/* items on the timeline */
const items = [
  {
    start: new Date(2018, 11, 1),
    end: new Date(2018, 11, 4), // end is optional
    content: "allocation"
  }
];

class ProjectContainer extends Component {
  state = {};

  render() {
    return (
      <div className="prog-av-container">
        <div className="prog-av-name">{this.props.name}</div>
        <Timeline options={options} items={items} />
      </div>
    );
  }
}

export default ProjectContainer;
