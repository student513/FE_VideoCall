import React, { Component } from 'react';
import Messages from "./Messages";
import Input from "./Input";
import {observer} from 'mobx-react';
import {userStore} from '../../store/User'

@observer
class Chatting extends Component {
  constructor() {
    super();
    this.state = {
        messages: [],
        member: {
          username: "me",//방에 입장한 identity로 업데이트
        },
        drone: null
      }
  }

  componentDidMount = () => {
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
      const room = drone.subscribe(`observable-${userStore.roomname}`);
      room.on('data', (data, member) => {
        const messages = this.state.messages;
        messages.push({member, text: data});
        this.setState({messages});
      });
      this.setState({drone})
      console.log(drone)
  }

  onSendMessage = (message) => {
    this.state.drone.publish({
        //이게 방을 구분하는건가?
      room: `observable-${userStore.roomname}`,
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
