import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import Search from './Search';

class App extends Component {
    state = {
        characters: [],
        updateData:{}
    };

    removeCharacter = index => {
        const { characters } = this.state;
    
        this.setState({
            characters: characters.filter((character, i) => { 
                return i !== index;
            })
        });
    }
    updateCharacter = index => {
        const { characters } = this.state;
    
        this.setState({
            characters: characters.filter((character, i) => { 
                return i !== index;
            }),
            updateData:characters.filter((character, i) => { 
                return i === index;
            })[0]
        });
    }

    handleSubmit = character => {
        this.setState({
            characters: [...this.state.characters, character]}
        );
    }

    handleUpdate = () =>{
        this.setState({
            updateData: null}
        );
    }

    handleSearch = data => {
        const { characters } = this.state;

        let dataList = characters.filter((character) => character.name.indexOf(data.nameSearch) != -1 && character.job.indexOf(data.jobSearch) != -1)
        this.setState({
            charactersAll: characters,
            characters: dataList,
        });
    }
    rollback = ()=>{
        if (this.state.charactersAll) {
            this.setState({
                characters: this.state.charactersAll,
            });
        } 
    }

    render() {
        const { characters,updateData } = this.state;
        
        return (
            <div className="container">
                <h1>React Tutorial</h1>
                <p>Add a character with a name and a job to the table.</p>
                <Search handleSearch={this.handleSearch} rollback = {this.rollback} characterData={characters}></Search>
                <Table
                    characterData={characters}
                    removeCharacter={this.removeCharacter}
                    updateCharacter={this.updateCharacter}
                />
                <h3>Add New</h3>
                <Form handleSubmit={this.handleSubmit} updateData={updateData} handleUpdate={this.handleUpdate}/>
            </div>
        );
    }
}

export default App;