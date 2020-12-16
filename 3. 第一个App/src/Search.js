import React, {Component} from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        
        this.initialState = {
            nameSearch: '',
            jobSearch: ''
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name] : value
        });
        

    }

    onSearch = (event) => {
        event.preventDefault();
        
        this.props.handleSearch(this.state);
        this.setState(this.initialState);
    }

    render() {
        const { nameSearch ,jobSearch} = this.state;
        const characterData = this.props.characterData;
        if (!characterData.length) {
            return (<div></div>)
        } else {
            return (
                <form onSubmit={this.onSearch}>
                    <label for="nameSearch">nameSearch</label>
                    <input 
                        type="text" 
                        name="nameSearch" 
                        id="nameSearch"
                        value={nameSearch} 
                        onChange={this.handleChange} />
                    <label for="jobSearch">jobSearch</label>
                    <input 
                        type="text" 
                        name="jobSearch" 
                        id="jobSearch"
                        value={jobSearch} 
                        onChange={this.handleChange} />
                    <button type="submit">
                        Search
                    </button>
                    <button onClick={()=>this.props.rollback()}>
                        Rollback
                    </button>
                </form>      
            );
        }
        
    }
}

export default Search;
