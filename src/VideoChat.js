import React, { useState, useCallback, useEffect } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import { postUser } from './helper/api';


const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await postUser(username, roomName);
    setToken(data.token);
  };

  const handleLogout = (event) => {
    setToken(null);
  };

  useEffect(() => {
    console.log(token);
  });

  if (token) {
    return (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  }
  return (
    <Lobby
      username={username}
      roomName={roomName}
      handleUsernameChange={handleUsernameChange}
      handleRoomNameChange={handleRoomNameChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default VideoChat;
