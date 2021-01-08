import React, {Component} from 'react'


class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.updatedata.name,
            job: this.props.updatedata.job,
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name] : value
        })
    }

    editSubmit = event => {
        event.preventDefault();
        this.props.onEditSubmit(this.state, 0)

    }

    render() {
        const { name, job } = this.state

        return (
            <form onSubmit={this.editSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={this.handleChange}
                />
                <label>job</label>
                <input
                    type="text"
                    name="job"
                    id="job"
                    value={job}
                    onChange={this.handleChange}
                />
                <button type="submit">
                    Edit
                </button>
            </form>
        )
    }
}

export default Edit;