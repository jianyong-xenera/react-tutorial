import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.props.onFormChange({
            [name]: value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onFormSubmit();
    };

    render() {
        const { name, job } = this.props.form;

        return (
            <form onSubmit={this.handleSubmit}>
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
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default Form;
