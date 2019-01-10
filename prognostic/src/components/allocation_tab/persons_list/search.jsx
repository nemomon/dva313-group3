import React, { Component } from "react";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: "",
        };
    }

    componentDidMount() {
        this.refs.search.focus();
    }

    handleChange = () => {
        this.setState({ searchString: this.refs.search.value });
    }

    render() {
        console.log("RENDER: Search.jsx");
        let _users = this.props.persons;
        let search = this.state.searchString.trim().toLowerCase();

        if (search.length > 0) {
            _users = _users.filter(function (user) {
                return user.Name.toLowerCase().match(search);
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
                                    onClick={() => this.props.updateAllocationView(l.Id, l.Name)}
                                >
                                    {l.Name} <a href="#">{l.email}</a>
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
