import React from "react";

const Messages = ({messages, currentMember}) => {
    const renderMessage = (message) => {
        const {member, text} = message;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ?
          "Messages-message currentMember" : "Messages-message";
        return (
          <li className={className}>
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