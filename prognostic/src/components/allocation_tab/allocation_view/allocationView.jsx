import React, { Component } from "react";
import vis from "vis";
import PHPController from "../../PHPController";
import "../../../../node_modules/vis/dist/vis-timeline-graph2d.min.css";

const ID_GROUP_TOTAL = -1;
const DEFAULT_EMP_RATE = "100";

class AllocationView extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.items = new vis.DataSet({});
    this.groups = new vis.DataSet({});
    this.total = [];
    this.PHPController = new PHPController();
    this.timeline = null;
    this.showEmptyGroups = true;

    this.preInit();
  }

  /* fired before the timeline is created */
  preInit() {
    this.createGroups();
  }

  /* When react mounts the component, attatch the timeline to the div with id=timeline created in render() */
  componentDidMount() {
    let container = document.getElementById("timeline");
    this.timeline = new vis.Timeline(
      container,
      this.items,
      this.groups,
      this.options
    );

    this.postInit();
  }

  /* fired after the timeline is created */
  postInit() {
    this.createTotalTimeline();
    this.attachEvents();
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
    if (item.group == ID_GROUP_TOTAL || this.props.personId == null) {
      callback(null);
      return;
    }

    let newAlloc = {
      Id: "T" + item.id,
      personId: this.props.personId,
      projectId: item.group,   
      Percentage: DEFAULT_EMP_RATE,
      StartDate: item.start,
      EndDate: item.end,
      Flag: "I",
    }

    item.id = "T" + item.id;
    item.content = DEFAULT_EMP_RATE;

   this.PHPController.insertAllocation(newAlloc);
   this.alertProjectEndExceeded(item);
   callback(item);
   this.createTotalTimeline();
  }

  onRemove(item, callback) {

    let removeAlloc = {Id: item.id, Flag: "D"};
    this.PHPController.deleteAllocation(removeAlloc);
    callback(item);
    this.createTotalTimeline();
  }

  /* Fired continuously when an allocation is dragged.
     Is used to check if the allocations end date exceeds the project, 
     and if, display a warning.
  */
  onMoving(item, callback) {
    this.alertProjectEndExceeded(item);
    callback(item);
  }

  /* Fired when double clicking an allocation. */
  onUpdate(item, callback) {
    let value = prompt("Input employment rate:", item.content);

    if (value != null) {
      value = value.trim();
    }

    if (value == "" || value < 0 || value > 200) {
      callback(null);
      return;
    }

    if (Math.floor(value) == value) {
      item.content = value;

      let updateAlloc = {Id: item.id, Flag: "U", StartDate: item.start, EndDate: item.end, Percentage: item.content};
      this.PHPController.updateAllocation(updateAlloc);

      callback(item);
      this.createTotalTimeline();
    } else {
      callback(null);
    }

  }

  /* Fired when an item has been moved or dragged
   */
  onMove(item, callback) {
    if (item.start >= item.end) {
      callback(null);
      return;
    }
    let updateAlloc = {Id: item.id, Flag: "U", StartDate: item.start, EndDate: item.end, Percentage: item.content};
    this.PHPController.updateAllocation(updateAlloc);
    callback(item);
    this.createTotalTimeline();
  }

  /* Fired when the timeline has been drawn, is used to set
     the timeline window so it displays the current month nicley
  */
  onInitialDrawComplete() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var nextMonth = month == 11 ? 0 : month + 1;
    var nextYear = month == 11 ? year + 1 : year;
    var day = 1;

    this.timeline.setWindow(
      new Date(year, month, day),
      new Date(nextYear, nextMonth, day),
      { animation: false }
    );
  }

  /***********************************************************
   *                        END EVENTS                        *
   ***********************************************************/


  /* helper function to display visual warning if the allocation exceed a projects end date */
  alertProjectEndExceeded(item) {
    item.style = item.end > this.groups.get(item.group).end ? "background: rgba(175, 0, 0, 1);" : "";
  }


  attachEvents() {
    this.timeline.on('contextmenu', props => {
      props.event.preventDefault();
      if (props.item != null) {
        let properties = this.timeline.getEventProperties(props.event);
        this.splitAllocation(props.item, properties.snappedTime._d);
      }
    });

    this.timeline.on('rangechanged', (a, b, x) => {
      this.updateTotalTimeline();
    });

    this.items.on("add", (event, props, args) => {
      if (args != null && args.total) {
        let heigth = (args.rate / 2) + "px";
        let ele = document.getElementsByClassName(args.id)[0];
        if (ele != undefined) {
          ele.style.height = heigth;
          this.timeline.redraw();
        }
      }
    });
  }


  splitAllocation(allocId, splitDate) {
    let alloc = this.items.get(allocId);
    let startDate = alloc.start;
    let endDate = alloc.end;
    let empRate = alloc.content;
    let group = alloc.group;

    if (splitDate >= endDate || splitDate <= startDate) {
      return;
    }

    this.items.remove(alloc.id); //TODO NEED TO BE REMOVED FROM THE LOCAL this.PHPController CLASS ALSO

    //ids are auto genereted here, can i querry a set of ids from the this.PHPController-class?
    let newItem1 = { content: empRate, start: startDate, end: splitDate, group: group }
    let newItem2 = { content: empRate, start: splitDate, end: endDate, group: group }

    this.alertProjectEndExceeded(newItem1);
    this.alertProjectEndExceeded(newItem2);
    this.items.add(newItem1);
    this.items.add(newItem2);

  }


  addAllocation(alloc) {


    console.log(alloc);

    let newAlloc = {
      id: alloc.Id,
      content: alloc.Percentage,
      start: new Date(alloc.StartDate),
      end: new Date(alloc.EndDate),
      group: alloc.projectId
    }

 /*   let newAlloc = {
      id: parseInt(alloc.Id),
      content: alloc.Percentage,
      start: new Date(alloc.StartDate),
      end: new Date(alloc.EndDate),
      group: parseInt(alloc.projectId)
    } */


    console.log(newAlloc);
    this.alertProjectEndExceeded(newAlloc);
    this.items.add(newAlloc);
  }


  setTimelineHeight(rows, init) {
    let heigth = rows * 50 + 70 + 150;
    init ? this.options.height = heigth : this.timeline.setOptions({ height: heigth });
  }



  updateTotalTimeline() {
    this.items.remove(this.items.get({ filter: function (item) { return item.group == ID_GROUP_TOTAL } }));
    this._createTotalTimeline();
  }


  createTotalTimeline() {
    this.items.remove(this.items.get({ filter: function (item) { return item.group == ID_GROUP_TOTAL } }));

    let totalSet = new vis.DataSet({});
    let allocations = this.items.get();
    let length = allocations.length;
    this.total = [];

    if (length < 1) {
      return;
    }

    for (var i = 0; i < length; i++) {
      totalSet.add({
        date: allocations[i].start
      });
      totalSet.add({
        date: allocations[i].end
      });
    }

    let sortedDates = totalSet.get({ fields: ['date'], order: "date", type: { date: 'Date' } });
    var intersections = [];
    var currentDate = sortedDates[0];

    //extract the intersections
    for (var i = 0; i < sortedDates.length; i++) {
      if (currentDate.date < sortedDates[i].date) {
        intersections.push({ 'start': currentDate.date, 'end': sortedDates[i].date });
        currentDate = sortedDates[i];
      }
    }

    // calculate contents
    var sum;
    for (var j = 0; j < intersections.length; j++) {
      sum = 0;
      for (var i = 0; i < allocations.length; i++) {
        if (allocations[i]['start'] <= intersections[j]['start'] && allocations[i]['end'] >= intersections[j]['end']) {
          sum = sum + parseInt(allocations[i]['content']);
        }
      }

      if (sum > 0) {
        this.total.push({ start: intersections[j]['start'], end: intersections[j]['end'], rate: sum, tag: j })
        // this.addTotal(intersections[j]['start'], intersections[j]['end'], sum, j);
      }
    }
    this._createTotalTimeline();
  }

  _createTotalTimeline() {
    let length = this.total.length;

    for (var i = 0; i < length; i++) {

      let id = "totalItem-" + this.total[i].tag;
      let rate = this.total[i].rate;
      let color = this.getColor(rate);

      let newAlloc = {
        content: "",
        start: this.total[i].start,
        end: this.total[i].end,
        group: ID_GROUP_TOTAL,
        className: id,
        editable: false,
        style: color
      }

      let args = { id: id, rate: rate, total: true };
      this.items.add(newAlloc, args);
    }


  }

  /*
    addTotal(start, end, rate, tag) {
      let id = "totalItem-" + tag;
  
      let color = this.getColor(rate);
  
      let newAlloc = {
        content: "",
        start: start,
        end: end,
        group: ID_GROUP_TOTAL,
        className: id,
        editable: false,
        style: color
      }
  
      let args = { id: id, rate: rate, total: true };
      this.items.add(newAlloc, args);
    }
  */

  getColor(rate) {
    if (rate <= 25) return "background: #00b855";
    if (rate <= 50) return "background: #00e56b";
    if (rate <= 75) return "background: #00ff77";
    if (rate <= 100) return "background: #38ff94";
    if (rate <= 125) return "background: #fdcb6e";
    if (rate <= 150) return "background: #d63031";

    return "background: #ff6666";
  }

  /* ignore this function for now */
  createVisualBoundaries() {
    this.groups.forEach(item => {
      if (item.id != ID_GROUP_TOTAL) {
        this.items.add({
          group: item.id,
          start: item.end,
          end: item.end,
          type: "background"
        });
      }
    });
  }


  getAllocations(personId) {
    if (personId == null) {
      return;
    }

    this.items.clear();
    let allocations = this.PHPController.getAllocation(personId);

    allocations.forEach(item => this.addAllocation(item));

   // this.items.clear();
   // allocations.forEach(item => this.addAllocation(item));

    //this.this.PHPController.getAllocations(personId, allocations => this._getAllocations(allocations));
  }


 /* _getAllocations(allocations) {
    this.items.clear();
    allocations.forEach(item => this.addAllocation(item));
  } */

  createGroups() {

  //  this.PHPController.getProjects(projects => this._createGroups(projects));

    let projects = this.PHPController.getProjects();

    this.groups.add({ id: ID_GROUP_TOTAL, content: "", className: "pg-totalTimeline" });
    // the project id becomes the group id, also including the projects end date in the group for easy access
   // when checking if an allocation exceed the end date 
    for (var i = 0; i < projects.length; i++) {
      this.groups.add({
        id: parseInt(projects[i].Id),
        content: projects[i].Name,
        end: new Date(projects[i].EndDate),
        visible: true
      });
    }

    this.setTimelineHeight(this.groups.length, true);
  }




/*
  createGroups() {
    this.this.PHPController.getProjects(projects => this._createGroups(projects));
  }


  _createGroups(projects) {
    this.groups.add({ id: ID_GROUP_TOTAL, content: "", className: "pg-totalTimeline" });
    // the project id becomes the group id, also including the projects end date in the group for easy access
   // when checking if an allocation exceed the end date 
    for (var i = 0; i < projects.length; i++) {
      this.groups.add({
        id: parseInt(projects[i].Id),
        content: projects[i].Name,
        end: new Date(projects[i].EndDate),
        visible: true
      });
    }

    this.setTimelineHeight(this.groups.length);
  }

*/


  /* toggle between hide/show of all groups with no allocations */
  toggleGroups = () => {
    this.showEmptyGroups = !this.showEmptyGroups;

    let notEmptyGroups = this.items.distinct("group");
    let allGroups = this.groups.getIds();
    let difference = allGroups.filter(
      x => !(notEmptyGroups.indexOf(x) > -1) && x != ID_GROUP_TOTAL
    );

    for (var i = 0; i < difference.length; i++) {
      this.groups.update({ id: difference[i], visible: this.showEmptyGroups });
    }

    let height = this.showEmptyGroups ? allGroups.length : allGroups.length - difference.length;

    this.setTimelineHeight(height, false);
  };


  refreshTotal = () => {
    this.createTotalTimeline();
  }


  render() {
    console.log("RENDER: AllocationView.jsx");
    this.getAllocations(this.props.personId);
    this.createTotalTimeline();


    return (
      <div className="prog-av">
        <div className="prog-av-user">{this.props.personName}</div>
        <button className="togglebtn" onClick={this.toggleGroups}>TOGGLE</button>
        <button className="updatebtn" onClick={this.refreshTotal}>UPDATE</button>
        <div className="prog-av-container">
          <div id="timeline" />
        </div>
      </div>
    );
  }
}

export default AllocationView;
