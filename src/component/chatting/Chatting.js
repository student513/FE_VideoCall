import React, { Component } from 'react';
import Messages from "./Messages";
import Input from "./Input";

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}
class Chatting extends Component {
  state = {
    messages: [],
    member: {
      username: "me",
      color: randomColor()
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("4XIVBdHRdUL4f4mw", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

 render() {
  return (
    <div className="App">
      <div className="App-header">
      </div>
      <Messages
        messages={this.state.messages}
        currentMember={this.state.member}
      />
      <Input
        onSendMessage={this.onSendMessage}
      />
    </div>
  );
}
}

export default Chatting;
