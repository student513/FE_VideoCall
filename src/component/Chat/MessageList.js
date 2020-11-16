import React, { useEffect } from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = (messages) => {
  useEffect(() => {
    this.node.scrollTop = this.node.scrollHeight;
  });
  return (
    <div className="MessageList" ref={(node) => (this.node = node)}>
      {this.props.messages.map((message, i) => (
        <Message key={i} {...message} />
      ))}
    </div>
  );
};

export default MessageList;
