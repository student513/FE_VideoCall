import React, { useEffect, useRef, useState } from 'react';
import './MessageForm.css';

const MessageForm = (onMessageSend) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onMessageSend(message);
    setMessage('');
  };
  return (
    <form className="MessageForm" onSubmit={handleFormSubmit}>
      <div className="input-container">
        <input type="text" ref={inputRef} value={message} />
      </div>
      <div className="button-container">
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default MessageForm;
