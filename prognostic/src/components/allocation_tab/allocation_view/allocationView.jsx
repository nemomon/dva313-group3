import React, { Component } from "react";
import Timeline from "react-visjs-timeline";
import PHP from "./PHP"

const ID_GROUP_TOTAL = -1;


/*********************************************************************************************
*  The internal dataset visjs are using is not exposed to use, meaning that any changes      *
*  made on the allocations through the UI will not be reflected in this state.               *
*                                                                                            *
*  However, we can use callbacks when an item has been added, removed, moved, dragged, or    *
*  updated, so we can through these methods ensure that we stay in sync with any changes.    *
*  This problem arises becuase we are using an react abstraction, that is using the real     *
*  visjs-timeline internally.                                                                *
*                                                                                            *
**********************************************************************************************/

class AllocationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      groups: [],
    };

    this.PHP = new PHP();
    this.init();

    /* A reference to the timeline object so methods can be called on it */
    this.timelineRef = React.createRef();
  }


  /* Options and events for the timeline, events are delageted to class methods  */
  options = {
    width: "100%",
    height: "700px",
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
  *   If the changes are accepted, you MUST make a call: callback(item),   *
  *   if you want to prevent the changes: callback(null).                  *
  *                                                                        *
  *   NOTE: callback(item) updates the internal dataset, not the           *
  *   this.state.items array, we need to make sure they are in sync        *
  *   in onAdd, onRemove, onUpdate, onMoved if we callback(item).          *
  *                                                                        *
  **************************************************************************/

  /* Fired when an item is added to the timeline
  */
  onAdd(item, callback) {
    if (item.group == ID_GROUP_TOTAL) {
      callback(null);
      return;
    }

    item.content = "100";
    this.state.items.push(item);

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
    var endDate = this.state.groups[item.group].end;
    item.style = item.end > endDate ? "background: rgba(175, 0, 0, 1);" : "";
    callback(item);
  }


  /* Fired when double clicking an allocation. 
     TODO: validate the input
  */
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
    var i = this.getItemById(item.id);

    i.end = item.end;
    i.start = item.start;

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

    this.timelineRef.current.$el.setWindow(new Date(year, month, day), new Date(nextYear, nextMonth, day), { animation: false });
  }

  /***********************************************************
  ***********************  END EVENTS  ***********************
  ***********************************************************/




  calculateTimelineHeight() {
    this.options.height = this.state.groups.length * 50 + 70 + 50;;
  }

  getItems() {
    this.state.items = this.PHP.getAllocations(1);
  }

  init() {
    this.createGroups();
    this.getItems();
    this.calculateTimelineHeight();
    this.createVisualBoundaries();
  }

  createVisualBoundaries() {
    /* not including the total timeline */
    for (var i = 1; i < this.state.groups.length; i++) {

      /* background items are not interactable.
         Setting a background-item with the same start and end date
         which is equal the a projects end date, and then a left border 
         in CSS makes a visual boundari on the group that depics when a 
         project end
      */
      var item = {
        group: this.state.groups[i].id,
        start: this.state.groups[i].end,
        end: this.state.groups[i].end,
        type: "background"
      };

      this.state.items.push(item);
    }
  }

  createGroups() {
    let projects = this.PHP.getProjects();
    this.state.groups.push({ id: ID_GROUP_TOTAL, content: "TOTAL" });

    /* the project id becomes the group id, also including the projects end date in the group for easy access
    when checking if an allocation exceed the end date */
    for (var i = 0; i < projects.length; i++) {
      this.state.groups.push({ id: projects[i].id, content: projects[i].name, end: projects[i].end });
    }
  }

  //TODO: Convert item array to map, ids need to be autogenerated and unique.
  getItemById(id) {
    for (var i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].id == id) {
        return this.state.items[i];
      }
    }

    return null;
  }




  /********************************  TIMELINE EVENTS  ********************************
  *                                                                                  *
  *   We can also set up a whole lot of event on the timeline itsself, for example   *
  *   if we wanna do a better UX design for providing the employment rate, sush as   *
  *   holding and draging with the mouse on the allocation to change it              *
  *                                                                                  * 
  *   NOTE: timeline events MOST be passed down to the timeline with the visjs       *
  *   event name with an "Handler" appended to it, read more in reacts-visjs and     *
  *   vis events documentation                                                       *
  *                                                                                  *                                    
  ************************************************************************************/

  /* Fired when double clicking inside the timeline 
  */
  optionsHandler = (props) => {
    if (props.item != null) {
      console.log("Item double-clicked");
    }
  }

  /* Fired continuously when moving the mouse inside the timeline 
  */
  mouseMoveHandler = (props) => {
    if (props.item != null) {
      console.log(props.item);
    }
  }

  render() {
    return (
      <div className="prog-av">
        <div className="prog-av-user">Leia Skywalker</div>
        <div className="prog-av-container">
          <div>{this.props.name}</div>
          <Timeline
            ref={this.timelineRef}
            selectHandler={this.selectHandler}
            doubleClickHandler={this.optionsHandler}
            mouseMoveHandler={this.mouseMoveHandler}
            options={this.options}
            items={this.state.items}
            groups={this.state.groups} />
        </div>
      </div>
    );
  }
}

export default AllocationView;
