import React, { Component } from "react";

class Search extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.props.onSearchChange({
            [name]: value,
        });
    };

    render() {
        const { name, job } = this.props.search;

        return (
            <form>
                <label for="name">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={this.handleChange}
                />
                <label for="job">Job</label>
                <input
                    type="text"
                    name="job"
                    id="job"
                    value={job}
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}

export default Search;