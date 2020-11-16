import React, { useEffect } from 'react';
import './MessageForm.css';

const MessageForm = (onMessageSend) => {
  useEffect(() => {
    this.input.focus();
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onMessageSend(this.input.value);
    this.input.value = '';
  };
  return (
    <form className="MessageForm" onSubmit={handleFormSubmit}>
      <div className="input-container">
        <input type="text" ref={(node) => (this.input = node)} />
      </div>
      <div className="button-container">
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default MessageForm;
