import React, { Component } from 'react';
import Messages from "./Messages";
import Input from "./Input";
import './Chatting.css'

class Chatting extends Component {
  constructor() {
    super();
    this.state = {
        messages: [],
        member: {
          username: "",//방에 입장한 identity로 업데이트
        },
        drone: null
      }
  }

  componentDidMount = () => {
    let newMember = this.state.member
    newMember.username = this.props.username
    this.setState({member:newMember})

    const drone = new window.Scaledrone("4XIVBdHRdUL4f4mw", {
        data: this.state.member
      });
      drone.on('open', error => {
        if (error) {
          return console.error(error);
        }
        const member = {...this.state.member};
        member.id = drone.clientId;
        this.setState({member});
      });
      const room = drone.subscribe(`observable-${this.props.roomname}`);
      room.on('data', (data, member) => {
        const messages = this.state.messages;
        messages.push({member, text: data});
        this.setState({messages});
      });
      this.setState({drone})
  }

  onSendMessage = (message) => {
    this.state.drone.publish({
      room: `observable-${this.props.roomname}`,
      message
    });
  }

 render() {
  return (
    <div className="chatContainer">
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
