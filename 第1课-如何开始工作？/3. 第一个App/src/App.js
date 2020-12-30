import React, { Component } from "react";
import Table from "./Table";
import Form from "./Form";
import Search from "./Search";

class App extends Component {
  state = {
    characters: [],
    search: { name: "", job: "" },
    form: { name: "", job: "" },
    updateIndex: null,
  };

  removeCharacter = (index) => {
    const { characters } = this.state;

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index;
      }),
    });
  };

  updateCharacter = (index) => {
    const { characters } = this.state;

    this.setState({
      updateIndex: index,
      form: characters[index],
    });
  };

  handleSubmit = () => {
    const { form, updateIndex } = this.state;
    const characters =
      updateIndex != null
        ? this.state.characters.map((elem, index) => {
            return index == updateIndex ? form : elem;
          })
        : [...this.state.characters, form];
    this.setState({
      characters: characters,
      form: { name: "", job: "" },
      updateIndex: null,
    });
  };

  handleSearchChange = (character) => {
    this.setState({
      search: { ...this.state.search, ...character },
    });
  };

  handleFormChange = (character) => {
    this.setState({
      form: { ...this.state.form, ...character },
    });
  };

  render() {
    const { characters, search, form, updateIndex } = this.state;

    const filterCharacters = characters.filter(function(elem) {
      return search.name
        ? elem.name.indexOf(search.name.trim()) != -1
        : true && search.job
        ? elem.job.indexOf(search.job.trim()) != -1
        : true;
    });

    return (
      <div className= "container">
        <h1>React Tutorial</h1>
        <p>Add a character with a name and a job to the table.</p>
        <Search search={search} onSearchChange={this.handleSearchChange} />
        <Table
          characterData={filterCharacters}
          removeCharacter={this.removeCharacter}
          updateCharacter={this.updateCharacter}
        />
        <h3>{updateIndex != null ? "Update" : "Add New"}</h3>
        <Form
          form={form}
          onFormChange={this.handleFormChange}
          onFormSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;
