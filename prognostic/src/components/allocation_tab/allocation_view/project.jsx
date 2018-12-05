import React, { Component } from 'react';

/* Dummy model class for projects */
class Project extends Component {
    constructor(name, start, end) {
        this.name = name;
        this.start = start;
        this.end = end;
    }

    get name() { return this.name }
}