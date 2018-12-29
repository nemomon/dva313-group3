import { callbackify } from "util";

const allocations = [
  {
    id: 1,
    group: 1,
    start: new Date(2018, 11, 6),
    end: new Date(2018, 11, 9), // end is optional
    content: "100"
  },
  {
    id: 2,
    group: 1,
    start: new Date(2018, 11, 11),
    end: new Date(2018, 11, 14), // end is optional
    content: "100"
  },
  {
    id: 3,
    group: 2,
    start: new Date(2018, 11, 1),
    end: new Date(2018, 11, 3), // end is optional
    content: "100"
  },
  {
    id: 4,
    group: 2,
    start: new Date(2018, 11, 15),
    end: new Date(2018, 11, 17), // end is optional
    content: "100"
  },
  {
    id: 5,
    group: 3,
    start: new Date(2019, 9, 10),
    end: new Date(2019, 9, 20), // end is optional
    content: "100"
  },
  {
    id: 6,
    group: 5,
    start: new Date(2018, 11, 25),
    end: new Date(2018, 11, 29), // end is optional
    content: "100"
  },
  {
    id: 7,
    group: 6,
    start: new Date(2018, 7, 1),
    end: new Date(2018, 7, 29), // end is optional
    content: "100"
  }
];

const projects = [
  {
    id: 1,
    name: "Prognostic",
    start: new Date(2018, 11, 1),
    end: new Date(2018, 11, 30) // end is optional
  },
  {
    id: 2,
    name: "GetThere",
    start: new Date(2018, 10, 1),
    end: new Date(2019, 1, 1) // end is optional
  },
  {
    id: 3,
    name: "AI-DOG",
    start: new Date(2018, 11, 1),
    end: new Date(2018, 11, 15) // end is optional
  },
  {
    id: 4,
    name: "Untiteled Project",
    start: new Date(2018, 11, 1),
    end: new Date(2019, 2, 1) // end is optional
  },
  {
    id: 5,
    name: "Designer-xx",
    start: new Date(2018, 11, 19),
    end: new Date(2019, 3, 1) // end is optional
  },
  {
    id: 6,
    name: "TOMATO",
    start: new Date(2018, 11, 1),
    end: new Date(2019, 1, 15) // end is optional
  }
];

const BASE = "http://127.0.0.1/project/";

class PHPController {
  constructor() {
    if (!PHPController.instance) {
      console.log("PHPController created");
      PHPController.instance = this;
      this.persons = { data: [], callbacks: [], ready: false };
      this.projects = { data: [], callbacks: [], ready: false };
      this.allocations = { arr: [], ready: false };
      this.spendings = [];
      this.observers = [];
      this.callbacks = [];

      this.init();
    }

    console.log("Get referende to PHPController");
    return PHPController.instance;
  }


  init() {
    this._fetch("getAllPersons.php", this.persons);
    this._fetch("getAllProject.php", this.projects);
    /*  this._fetch("getAllAllocation.php");
      this._fetch("getAllSpending.php");
      this._fetch("getAllRemaining.php");
      this._fetch("getAllEndbalance.php"); */
  }


  _fetch(path, obj) {
    console.log("fetch start");
    fetch(BASE + path)
      .then(res => res.json())
      .then(
        result => {
          obj.data = result;
          obj.ready = true;
          obj.callbacks.forEach(callback => callback(obj.data));
          obj.callbacks = [];
        },
        error => {
          console.log(error);
        }
      )
  }



  getProjectPromise() {
    return this.projects.promise;
  }


  getPromise(path) {

    return fetch(BASE + path)
      .then(res => res.json())
      .then(
        result => {
          //this.observers.forEach(observer => observer.callback(result));
          this.projects.projects = result;
        },
        error => {
          console.log(error);
        }
      )
  }

  callback(func) {

    func("hello");
  }


  getPromise2() {
    return new Promise((resolve, reject) => {
      if (this.projects.ready) {
        resolve(this.projects.projects)
      }






    });
  }

  /*
      _fetch(path) {
        fetch(BASE + path)
          .then(res => res.json())
          .then(
            result => {
              this.observers.forEach(observer => observer.callback(result));
              //  this.projects = result;
              console.log(this.projects);
            },
            error => {
              console.log(error);
            }
          )
      } */

  /* PUBLIC INTERFACE THAT ALL THE TABS CAN USE TO FETCH AND SAVE DATA INTO THE LOCAL ARRAYS */
  getPersons() { }




  getProjects(callback) {
    if (this.projects.ready) {
      console.log("LOCAL");
      callback(this.projects.data);
      return;
    }
    else {
      console.log("NOT READY");
      this.projects.callbacks.push(callback);
      //callback("not ready");
    }
    // return this.projects.promise.then(() => this.projects.projects);
  }






  getAllocations(personId) {
    return allocations;
  }


  registerCallback(observer) {
    this.observers.push(observer);
  }

  getSpendings() { }

  getRemaining() {
    /* do client side calculations here based on the data on the local arrays and return a array of object */
  }

  getEndbalance() {
    /* do client side calculations here based on the data on the local arrays and return a array of object */
  }

  /* save the obj to the local arrays */
  savePerson(obj) { }
  saveProject(obj) { }
  saveAllocation(obj) { }
  saveSpending(obj) { }

  /* send the new/updated data to be saved to the database, should be executed when pressing the global save button */
  updateDatabase() { }
}

const instance = new PHPController();
//Object.freeze(instance);

export default PHPController;
