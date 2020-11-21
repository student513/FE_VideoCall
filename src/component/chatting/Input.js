import React, {useState} from "react";
import './Input.css'
const Input = ({onSendMessage}) => {
  const [text, setText] = useState("")
  const onChange = (e) => {
    setText(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    setText("")
    onSendMessage(text);
  }

    return (
      <div className="Input">
        <form onSubmit={onSubmit}>
          <input
            className="chatInput"
            onChange={onChange}
            value={text}
            type="text"
            placeholder="채팅을 시작하세요."
          />
          <button>Send</button>
        </form>
      </div>
    );

}

export default Input;
