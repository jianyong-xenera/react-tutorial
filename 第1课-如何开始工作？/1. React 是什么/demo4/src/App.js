import React, { Component } from "react";
import { Modal, Button, Input } from "antd";
import Table from "./Table";
import Form from "./Form";

class App extends Component {
  state = {
    characters: [],
    isModalVisible: false,
    newname: "",
    newjob: "",
    index: "",
  };

  removeCharacter = (index) => {
    const { characters } = this.state;

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index;
      }),
    });
  };

  amendCharacter = (index) => {
    this.setState({ isModalVisible: true, index: index });
  };

  handleSubmit = (character) => {
    this.setState({ characters: [...this.state.characters, character] });
  };
  handleOk = () => {
    let obj = {
      name: this.state.newname,
      job: this.state.newjob,
    };
    let arr = [...this.state.characters];
    arr.splice(this.state.index, 1, obj);
    this.setState({
      characters: arr,
      isModalVisible: false,
      newname: "",
      newjob: "",
    });
  };
  handleCancel = () => {
    this.setState({ isModalVisible: false, newname: "", newjob: "" });
  };
  handleChange1 = (e) => {
    this.setState({ newname: e.target.value });
  };
  handleChange2 = (e) => {
    this.setState({ newjob: e.target.value });
  };

  render() {
    const { characters, isModalVisible, newname, newjob } = this.state;

    return (
      <div className="container">
        <Button type="primary">Button</Button>
        <h1>React Tutorial</h1>
        <p>Add a character with a name and a job to the table.</p>
        <Table
          characterData={characters}
          removeCharacter={this.removeCharacter}
          amendCharacter={this.amendCharacter}
        />
        <h3>Add New</h3>
        <Form handleSubmit={this.handleSubmit} />
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            placeholder="请输入name"
            value={newname}
            onChange={this.handleChange1}
          />
          <Input
            placeholder="请输入job"
            value={newjob}
            onChange={this.handleChange2}
          />
        </Modal>
      </div>
    );
  }
}

export default App;
