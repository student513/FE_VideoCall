import React, { Component } from 'react';
import Messages from './Messages';
import Input from './Input';
import './Chatting.css';

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
    const newMember = this.state.member;
    newMember.username = this.props.username;
    this.handleChangeState('member', newMember);

    const drone = new window.Scaledrone(
      process.env.REACT_APP_SCALEDRONE_API_KEY,
      {
        data: this.state.member,
      }
    );
    drone.on('open', (error) => {
      if (error) {
        throw new Error(error);
      }
      const member = { ...this.state.member };
      member.id = drone.clientId;
      this.handleChangeState(member);
    });
    const room = drone.subscribe(`observable-${this.props.roomname}`);
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.handleChangeState(messages);
    });
    this.handleChangeState('drone', drone); //this.handleChangeState(drone); 에러발생
  };

  handleChangeState = (name, value = undefined) => {
    value ? this.setState({ [name]: value }) : this.setState({ [name]: name });
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
        <div className="messageContainer">
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
