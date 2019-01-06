

/* This is needed when we are in the react environment, when we deploy and 
upload everything to an apache-server, we need the change all links to relative 
For more info, read the guide how to interpret PHP while running the React server */

const BASE = "http://127.0.0.1/project/";


/* This class is using the singelton design pattern */
class PHPController {

  constructor() {

    /* Fetch the data once when the class is created, the boolean variable ready indicates if the local structures are 
    ready to be sent to a caller or if this class should make a callback later when they are ready */
    if (!PHPController.instance) {
      PHPController.instance = this;
      this.persons = { data: [], callbacks: [], ready: false };
      this.projects = { data: [], callbacks: [], ready: false };
      this.allocations = { data: [], callbacks: [], ready: false };
      this.spendings = { data: [], callbacks: [], ready: false };
      this.remainings = { data: [], callbacks: [], ready: false };
      this.endbalances = { data: [], callbacks: [], ready: false };
      this.init();
    }

    return PHPController.instance;
  }

  init() {
    this._fetch("getAllPersons.php", this.persons);
    this._fetch("getAllProject.php", this.projects);
    this._fetch("getAllAllocation2.php", this.allocations);
    this._fetch("getAllSpending.php", this.spendings);
    this._fetch("getAllRemaining.php", this.remainings);
    this._fetch("getAllEndbalance.php", this.endbalances);
  }

  /* asynchronous ajax calls */
  _fetch(path, obj) {
    fetch(BASE + path)
      .then(res => res.json())
      .then(
        result => {
          obj.data = result;
          obj.ready = true;

          /* if there are any callbacks in the callback array, call them */
          obj.callbacks.forEach(callback => {
            callback(obj.data);
          });

          /* empty the callback array */
          obj.callbacks = [];

        },
        error => {
          console.log(error);
        }
      )
  }


  /* PUBLIC INTERFACE THAT ALL THE TABS CAN USE TO FETCH AND SAVE DATA INTO THE LOCAL ARRAYS */
  getPersons(callback) {
    this.persons.ready ? callback(this.persons.data) : this.persons.callbacks.push(callback);
  }

  getProjects(callback) {
    this.projects.ready ? callback(this.projects.data) : this.projects.callbacks.push(callback);
  }

  /* get allocations for a specifik person */
  getAllocations(personId, callback) {
    /* the filter function wont work becuase we dont get the personId column in the allocation table in the database, just the id for the allocation itself 
      SUGGESTION1: change the getAllAllocations.php so it sends back the personId maybe? 
    */
    this.projects.ready ? callback(this.allocations.data.filter(alloc => alloc.PersonId == personId)) : this.allocations.callbacks.push(callback);
  }

  getSpendings(callback) {
    this.spendings.ready ? callback(this.spendings.data) : this.spendings.callbacks.push(callback);
  }

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


/* create the instance directly when the user retrives the index.php file and make it immutable for change */
const instance = new PHPController();
Object.freeze(instance);

export default PHPController;




/* POSSIBLE PROBLEMS WITH THE ABOVE IMPLEMENTATION AND CONSIDERATIONS:

  - The data that is sent back to the tabs are sending references (i.e. sends backs the data array directly instead of sending back a copy).
    I dont really know if this is problematic yet, if we change this objects we are changing the data array directly.. can cuase side-effects.

  - The getAllocations method is problematic, if the data-array is not ready, the callback is stored and executed later, but it dont do the
    filtering then

  - Should we retrive all allocations from the server and fitler it in javascript to a specific person? Or should this be implemented in PHP
    or maybe a stored procedure in the database?

    NOTE this is just a class i have wrote in haste, the logic is probarly flawed and needs to be reviewed and tested. But the sementic functionallity
    that this class represents should be correct.


*/