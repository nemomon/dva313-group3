import React, { Component } from "react";
import AllocationView from "../allocation_view/allocationView";

let users = [
    {
        name: "Vijay",
    },
    {
        name: "Chris",
    },
    {
        name: "Erika",

    },
    {
        name: "Filip",

    },
    {
        name: "Leia",

    },
    {
        name: "Anna",
    },
    {
        name: "Zaid",
    },

];

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
            users: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            users: users
        });
        this.refs.search.focus();
    }

    handleChange() {
        this.setState({
            searchString: this.refs.search.value
        });
    }

    selectPerson = (id) => {
        AllocationView.initialize(id);
    }

    render() {
        let _users = this.state.users;
        let search = this.state.searchString.trim().toLowerCase();

        if (search.length > 0) {
            _users = _users.filter(function (user) {
                return user.name.toLowerCase().match(search);
            });
        }

        return (
            <div className="pg-search">
                <h2>SEARCH STAFFING</h2>

                <div>
                    <input
                        type="text"
                        value={this.state.searchString}
                        ref="search"
                        onChange={this.handleChange}
                        placeholder="Type name here"
                    />
                    <ul className="pg-search-list">
                        {_users.map(l => {
                            return (
                                <li
                                    className="pg-search-list"
                                    onClick={() => this.selectPerson(l.name)}
                                >
                                    {l.name} <a href="#">{l.email}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Search;
