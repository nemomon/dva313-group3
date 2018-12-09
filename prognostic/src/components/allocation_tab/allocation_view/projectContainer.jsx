import React, { Component } from "react";
import Timeline from "react-visjs-timeline";

/* options for the timeline */
const options = {
  width: "100%",
  height: "570px",
  start: new Date(),
  editable: true,
  zoomMax: 1000 * 60 * 60 * 24 * 24 * 250,
  zoomMin: 1000 * 60 * 60 * 24 * 24,
  align: "left",
  stack: false,
  type: "range",
  /* onAdd: function (item, callback) {
     item.content = "DUMMY";
     callback(item);
   },
   onMove: function (item, callback) {
     alert("MOVED: " + item.content);
     callback(item);
   } */
};


class ProjectContainer extends Component {
  state = {};

  render() {
    return (
      <div className="prog-av-container">
        <div>{this.props.name}</div>
        <Timeline options={options} items={this.props.items} groups={this.props.groups} />
      </div>
    );
  }
}

export default ProjectContainer;
