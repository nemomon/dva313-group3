import React, { Component } from "react";
import Timeline from "react-visjs-timeline";
import PHP from "./PHP"

/*
  The allocationView is responsible for fetching all projects and setting up it's child
  components correctly through props. 
*/


/*


PROBS:
  Initial zoom
  Data binding (the state objects is not the same as the GUI objects)
  The creation of the total timeline is problematic if implemented as a vis group with allocations. Different approah?
  Methods dont work becuase of react rip. sort of.
  
*/


class AllocationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      items: [],
      groups: [],
    };

    this.PHP = new PHP();
    this.init();
  }


  /* options for the timeline */
  options = {
    width: "100%",
    height: "700px",
    start: new Date(),
    orientation: {
      axis: "bottom",
      item: "bottom"
    },
    editable: {
      add: true,
      remove: false,
      updateGroup: false,
      updateTime: true
    },
    zoomMax: 1000 * 60 * 60 * 24 * 24 * 12,
    zoomMin: 1000 * 60 * 60 * 24 * 24,
    align: "center",
    stack: false,
    type: "range",


    /* Events that are fired */
    onAdd: (item, callback) => {

      if (item.group == 0) {
        callback(null);
        return;
      }

      item.content = "50";
      this.state.items.push(item);

      callback(item);
    },
    onMoving: (item, callback) => {
      var endDate = this.getProjectEnd(item.group);

      if (item.end > endDate) {
        item.style = "background: red";
      }
      else {
        item.style = "";
      }
      callback(item);
    },
    onMove: (item, callback) => {

      var i = this.getItemById(item.id);
      console.log(i);

      i.end = item.end;
      i.start = item.start;

      console.log(item);
      if (i == item) {
        alert("asdas");
      }
      callback(item);
    },
  };



  getProjectEnd(id) {
    return this.state.projects[id - 1].end;
  }


  calculateTimelineHeight() {
    this.options.height = this.state.groups.length * 50 + 70 + 50;;
  }


  getItems() {
    let items = this.PHP.getAllocations(1);

    for (var i = 0; i < items.length; i++) {
      this.state.items.push(items[i]);
    }
  }



  createTotalTimeline() {
    /* let it = this.state.items.length
     for (var i = 0; i < it; i++) {
 
       var item = {
         id: this.state.items[i].id + 100,
         group: 0,
         editable: false,
         start: this.state.items[i].start,
         end: this.state.items[i].end,
         content: this.state.items[i].content
       }
 
       this.state.items.push(item);
     } */
  }


  init() {
    this.getProjects();
    this.createGroups();
    this.getItems();
    this.createTotalTimeline();
    this.calculateTimelineHeight();
    this.createVisualBoundaries();
    //  this.addToTotal();
  }


  addToTotal() {
    let data = this.state.items.push({
      id: 2,
      group: 0,
      editable: false,
      selectable: false,
      start: new Date(2018, 11, 13),
      end: new Date(2018, 11, 18), // end is optional
      content: "alloc2",
    });

    this.setState({ items: data });

  }





  createVisualBoundaries() {
    /* not including the total timeline */
    for (var i = 1; i < this.state.projects.length; i++) {

      var item = {
        id: i + 1110,
        group: this.state.projects[i].id,
        start: this.state.projects[i].end,
        end: this.state.projects[i].end,
        type: "background"
      };

      this.state.items.push(item);
    }
  }


  getProjects() {
    let projects = this.PHP.getProjects();

    for (var i = 0; i < projects.length; i++) {
      this.state.projects.push(projects[i]);
    }
  }


  createGroups() {
    this.state.groups.push({ id: 0, content: "TOTAL" });

    for (var i = 1; i <= this.state.projects.length; i++) {
      this.state.groups.push({ id: i, content: this.state.projects[i - 1].name });
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




  /************************************                    
   ************   EVENTS   ************            
   ************************************/

  /* Fired when double clicking inside the timeline */
  optionsHandler = (props) => {
    if (props.item != null) {
      console.log("Item double-clicked");
    }

  }

  /* Fired continuously when moving the mouse inside the timeline */
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
