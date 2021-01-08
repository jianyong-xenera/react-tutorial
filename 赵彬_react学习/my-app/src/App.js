import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import Edit from "./Edit";

class App extends Component {
    state = {
        characters: [],
        selectcharacters: [],
        selectname: '',
        isShow: true,
        all: 1,
        updatedata: [],
        edit:0,
        index:0
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
        if (this.state.all === 1){
            this.setState({
                index: index,
                edit:1,
                updatedata: this.state.characters[index]
            })
        }else {
            this.setState({
                index: index,
                edit:1,
                updatedata: this.state.selectcharacters[index]
            })
        }
        
    }
    editSubmit = (item, n) => {
        if (this.state.all === 1){
            this.state.characters.splice(this.state.index, 1, item)
            this.setState({
                edit: n
            })
        }else {
            this.state.selectcharacters.splice(this.state.index, 1, item)
            this.setState({
                edit: n
            })
        }
    }

    handleChange = event => {
        this.setState({
            selectname:event.target.value
        });
    }

    handleSubmit = character => {
        this.setState({characters: [...this.state.characters, character]});
        
    }
    selectNameScreen = (selectname) => {
        const { characters } = this.state;
        if (selectname) {
            this.setState({
                all: 2,
                isShow: false,
                selectcharacters: characters.filter((character, i) => {
                    return character.name.indexOf(selectname) >= 0
                })
            });
        } else {
            this.setState({
                all: 1,
                isShow: true,
                characters: characters
            });
        }
        
    }

    render() {
        const { characters, selectcharacters, selectname, isShow, all, updatedata, edit } = this.state;
        
        return (
            <div className="container">
                <h1>React Tutorial</h1>
                <p>Add a character with a name and a job to the table.</p>
                <input 
                    type="text" 
                    name="name" 
                    id="select"
                    value={selectname}
                    onChange={this.handleChange}
                />
                <button onClick={this.selectNameScreen.bind(this, selectname)}>Select</button>
                {
                    edit ? (<Edit onEditSubmit={this.editSubmit} updatedata={updatedata} />) : (this.state.isShow ? (<Table
                        characterData={characters}
                        removeCharacter={this.removeCharacter}
                        updateCharacter={this.updateCharacter}
                        isShow={isShow}
                        all={all}
                    />) : (<Table
                        characterData={selectcharacters}
                        removeCharacter={this.removeCharacter}
                        updateCharacter={this.updateCharacter}
                        isShow={isShow}
                        all={all}
                    />))
                }
                
                <h3>Add New</h3>
                <Form handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default App;