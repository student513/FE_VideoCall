import React, { Component } from 'react';
import Messages from './Messages';
import Input from './Input';
import './Chatting.css';

const messagesHeight = window.innerHeight / 3;

class Chatting extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      member: {
        username: '', //방에 입장한 identity로 업데이트
      },
      drone: null,
    };
  }

  componentDidMount = () => {
    let newMember = this.state.member;
    newMember.username = this.props.username;
    this.setState({ member: newMember });

    const drone = new window.Scaledrone('4XIVBdHRdUL4f4mw', {
      data: this.state.member,
    });
    drone.on('open', (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = drone.clientId;
      this.setState({ member });
    });
    const room = drone.subscribe(`observable-${this.props.roomname}`);
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
    this.setState({ drone });
  };

  onSendMessage = (message) => {
    this.state.drone.publish({
      room: `observable-${this.props.roomname}`,
      message,
    });
  };

  render() {
    return (
      <div className="chatContainer">
        <div className="messageContainer" style={{ height: messagesHeight }}>
          <Messages
            messages={this.state.messages}
            currentMember={this.state.member}
          />
        </div>
        <div className="inputContainer">
          <Input onSendMessage={this.onSendMessage} />
        </div>
      </div>
    );
  }
}

export default Chatting;
