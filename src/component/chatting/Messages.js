import React, { useEffect, useRef } from "react";

const Messages = ({messages, currentMember}) => {
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  })

  const renderMessage = (message) => {
      const {member, text} = message;
      const messageFromMe = member.id === currentMember.id;
      const className = messageFromMe ?
        "Messages-message currentMember" : "Messages-message";
      return (
        <li className={className} ref={messageRef}>
          <div className="Message-content">
            <div className="username">
              {member.clientData.username}: {text}
            </div>
          </div>
        </li>
      );
    }

    return (
      <ul className="Messages-list">
        {messages.map(m => renderMessage(m))}
      </ul>
    );
}

export default Messages;