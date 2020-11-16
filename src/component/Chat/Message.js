import React from 'react';
import classNames from 'classnames';
import './Message.css';

const Message = (author, body, me) => {
  const classes = classNames('Message', {
    log: !author,
    me: me,
  });
  return (
    <div className={classes}>
      {author && <span className="author">{author}:</span>}
      {body}
    </div>
  );
};

export default Message;
