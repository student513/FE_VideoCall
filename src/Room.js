import React, { useState, useEffect, useRef, useCallback } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';
import YouTube from 'react-youtube';

const getVideoId = require('get-video-id');
const getVideoTitle = require('get-youtube-title');

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [videoInfoList, setVideoInfoList] = useState([]);
  const [url, setUrl] = useState('');

  const nextId = useRef(0);

  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };
  const onPushToList = () => {
    const videoId = getVideoId(url).id;
    getVideoTitle(videoId, function (err, title) {
      console.log(err);
      console.log(title);
      setVideoInfoList((prevInfo) => [
        ...prevInfo,
        { url, videoId, title, id: nextId.current++ },
      ]);
    });

    console.log(videoInfoList);
    setUrl('');
  };

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    Video.connect(token, {
      name: roomName,
    }).then((room) => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="room">
      <button onClick={handleLogout}>Log out</button>
      <YouTube videoId="2g811Eo7K8U" opts={opts} />
      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ''
        )}
      </div>
      <div>
        {videoInfoList.map((videoInfo) => (
          <p key={videoInfo.id}>{videoInfo.title}</p>
        ))}
        <input
          value={url}
          onChange={onChangeUrl}
          placeholder="동영상 링크를 입력하세요."
        />
        <button onClick={onPushToList}>제출</button>
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;
