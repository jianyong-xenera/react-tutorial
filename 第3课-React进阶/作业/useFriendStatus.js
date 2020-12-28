import { func } from "prop-types";
import React, { useState, useEffect, Component } from "react";

function useFriendStatus(WrapperComponent,friendID){
  return class extends React.Component{
    constructor(props){
      super(props);
      this.handleStatusChange=this.handleStatusChange.bind(this);
      this.state={
        isOnline:null
      }
    }

  ComponentDidMount(){
   ChatAPI.subscribeToFriendStatus(friendID,this.handleStatusChange);
  }
  ComponentWillUnmount(){
    ChatAPI.unsubscribeFromFriendStatus(friendID,this.handleStatusChange);
  }
  handleStatusChange(status){
    this.setState({
      isOnline:status.isOnline
    });
  }
  render(){
    return<WrapperComponent data={this.state.isOnline}></WrapperComponent>
  }
}
}
