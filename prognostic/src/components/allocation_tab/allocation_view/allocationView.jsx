import React, { Component } from "react";
import vis from "vis";
import PHP from "./PHP"
import "../../../../node_modules/vis/dist/vis-timeline-graph2d.min.css"

const ID_GROUP_TOTAL = -1;
const DEFAULT_EMP_RATE = "100";

class AllocationView extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.items = new vis.DataSet({});
    this.groups = new vis.DataSet({});
    this.PHP = new PHP();
    this.timeline = null;
    this.showEmptyGroups = true;

    this.init();
  }

  init() {
    this.createGroups();
    this.getItems();
    //  this.calculateTimelineHeight();
  }

  /* Options and events for the timeline, events are delageted to class methods  */
  options = {
    width: "100%",
    start: new Date(),
    end: new Date(),
    groupOrder: "id",
    orientation: {
      axis: "bottom",
      item: "bottom"
    },
    editable: {
      add: true,
      remove: true,
      updateGroup: false,
      updateTime: true
    },
    zoomMax: 1000 * 60 * 60 * 24 * 24 * 12,
    zoomMin: 1000 * 60 * 60 * 24,
    align: "center",
    stack: false,
    type: "range",

    onAdd: (item, callback) => {
      this.onAdd(item, callback);
    },
    onRemove: (item, callback) => {
      this.onRemove(item, callback);
    },
    onMoving: (item, callback) => {
      this.onMoving(item, callback);
    },
    onMove: (item, callback) => {
      this.onMove(item, callback);
    },
    onInitialDrawComplete: () => {
      this.onInitialDrawComplete();
    },
    onUpdate: (item, callback) => {
      this.onUpdate(item, callback);
    }
  };



  /**************************  ALLOCATION EVENTS  **************************
  *                                                                        *
  *   If the changes are accepted, you must call: callback(item) to        *
  *   update the this.items dataset, to discard the changes, call          *
  *   callback(null).                                                      *
  *                                                                        *
  **************************************************************************/

  /* Fired when an item is added to the timeline */
  onAdd(item, callback) {
    if (item.group == ID_GROUP_TOTAL) {
      callback(null);
      return;
    }

    item.content = DEFAULT_EMP_RATE;
    this.alertProjectEndExceeded(item.end > this.groups.get(item.group).end, item);
    callback(item);
  }

  onRemove(item, callback) {
    callback(item);
  }

  /* Fired continuously when an allocation is dragged.
     Is used to check if the allocations end date exceeds the project, 
     and if, display a warning.
  */
  onMoving(item, callback) {
    this.alertProjectEndExceeded(item.end > this.groups.get(item.group).end, item);
    callback(item);
  }

  /* Fired when double clicking an allocation. */
  onUpdate(item, callback) {
    item.content = prompt("Input employment rate:", item.content);
    item.content != null ? callback(item) : callback(null);
  }

  /* Fired when an item has been moved or dragged 
  */
  onMove(item, callback) {
    if (item.start >= item.end) {
      callback(null);
      return;
    }

    callback(item);
  }

  /* Fired when the timeline has been drawn, is used to set
     the timeline window so it displays the current month nicley
  */
  onInitialDrawComplete() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var nextMonth = (month == 11 ? 0 : month + 1);
    var nextYear = (month == 11 ? year + 1 : year);
    var day = 1;

    this.timeline.setWindow(new Date(year, month, day), new Date(nextYear, nextMonth, day), { animation: false });
  }

  /***********************************************************
  *                        END EVENTS                        *
  ***********************************************************/


  /* helper function to display visual warning if the allocation exceed a projects end date */
  alertProjectEndExceeded(alert, item) {
    item.style = alert ? "background: rgba(175, 0, 0, 1);" : "";
  }

  /* When react mounts the component, attatch the timeline to the div with id=timeline created in render() */
  componentDidMount() {
    let container = document.getElementById("timeline");
    this.timeline = new vis.Timeline(container, this.items, this.groups, this.options);
  }


  /* ignore this function for now */
  calculateTimelineHeight() {
    this.options.height = this.groups.length * 50 + 70;
  }

  getItems() {
    let item = this.PHP.getAllocations(1);
    item.forEach(item => this.items.add({ id: item.id, content: item.content, start: item.start, end: item.end, group: item.group }));
  }

  /* ignore this function for now */
  createVisualBoundaries() {
    this.groups.forEach(item => {
      if (item.id != ID_GROUP_TOTAL) {
        this.items.add({ group: item.id, start: item.end, end: item.end, type: "background" })
      }
    });
  }

  createGroups() {
    let projects = this.PHP.getProjects();
    this.groups.add({ id: ID_GROUP_TOTAL, content: "TOTAL" });

    /* the project id becomes the group id, also including the projects end date in the group for easy access
    when checking if an allocation exceed the end date */
    for (var i = 0; i < projects.length; i++) {
      this.groups.add({ id: projects[i].id, content: projects[i].name, end: projects[i].end, visible: true });
    }
  }

  /* toggle between hide/show of all groups with no allocations */
  toggleGroups = () => {
    this.showEmptyGroups = !this.showEmptyGroups;

    let notEmptyGroups = this.items.distinct("group");
    let allGroups = this.groups.getIds();
    let difference = allGroups.filter(x => !(notEmptyGroups.indexOf(x) > -1) && (x != ID_GROUP_TOTAL));

    for (var i = 0; i < difference.length; i++) {
      this.groups.update({ id: difference[i], visible: this.showEmptyGroups });
    }

    /* let newHeight;
     if (this.showEmptyGroups) {
       newHeight = (allGroups.length * 50 + 70) + "px";
     }
     else {
       newHeight = ((-difference.length * 50) + (allGroups.length * 50) + 70) + "px";
     }
     this.timeline.setOptions({ height: newHeight }); */

  }

  render() {
    return (
      <div className="prog-av">
        <div className="prog-av-user">Leia Skywalker</div>
        <button onClick={this.toggleGroups}>TOGGLE</button>
        <div className="prog-av-container">
          <div id="timeline"></div>
        </div>
      </div>
    );
  }
}

export default AllocationView;
