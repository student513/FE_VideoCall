import React, { Component } from 'react';
import Message from './Message';
import './MessageList.css';

class MessageList extends Component {
  static defaultProps = {
    messages: [],
  };

  componentDidUpdate = () => {
    this.node.scrollTop = this.node.scrollHeight;
  };

  render() {
    return (
      <div className="MessageList" ref={(node) => (this.node = node)}>
        {this.props.messages.map((message, i) => (
          <Message key={i} {...message} />
        ))}
      </div>
    );
  }
}

export default MessageList;
