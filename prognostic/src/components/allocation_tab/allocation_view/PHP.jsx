
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
    }
];



const projects = [
    {
        id: 1,
        name: "Prognostic",
        start: new Date(2018, 11, 1),
        end: new Date(2018, 11, 30), // end is optional
    },
    {
        id: 2,
        name: "GetThere",
        start: new Date(2018, 10, 1),
        end: new Date(2019, 1, 1), // end is optional
    },
    {
        id: 3,
        name: "AI-DOG",
        start: new Date(2018, 11, 1),
        end: new Date(2018, 11, 15), // end is optional
    },
    {
        id: 4,
        name: "Untiteled Project",
        start: new Date(2018, 11, 1),
        end: new Date(2019, 2, 1), // end is optional
    },
    {
        id: 5,
        name: "Designer-xx",
        start: new Date(2018, 11, 19),
        end: new Date(2019, 3, 1), // end is optional
    },
    {
        id: 6,
        name: "TOMATO",
        start: new Date(2018, 11, 1),
        end: new Date(2019, 1, 15), // end is optional
    }
];


/* Singelton */
class PHP {
    constructor() {
        if (!PHP.instance) {
            //this.data = [];
            PHP.instance = this;
        }

        return PHP.instance;
    }

    getProjects() {
        return projects;
    }

    getAllocations(id) {
        return allocations;
    }

}

const instance = new PHP();
Object.freeze(instance);

export default PHP;