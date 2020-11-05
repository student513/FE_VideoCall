import React, { useState, useEffect, useRef } from 'react';
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
    autoplay: 1,
  },
};

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const [videoList, setVideoList] = useState([]);
  const [url, setUrl] = useState('');
  const [nowPlayId, setNowPlayId] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);
  const nextId = useRef(0);

  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const onPushToList = () => {
    setShowPlayer(true);
    const videoId = getVideoId(url).id;
    getVideoTitle(videoId, function (err, title) {
      setVideoList((prevInfo) => [
        ...prevInfo,
        { videoId, title, id: nextId.current++ },
      ]);
    });
    setUrl('');
  };

  // youtube useEffect
  useEffect(() => {
    if (videoList.length) {
      setNowPlayId(videoList[0].videoId);
    }
  }, [videoList]);

  const onPlayerStateChange = (e) => {
    if (e.data === 0) {
      console.log('video ended!!');
      setVideoList(videoList.slice(1));
      setNowPlayId(videoList[0].videoId);
    }
  };

  const skipNowVideo = () => {
    setVideoList(videoList.slice(1));
    setNowPlayId(videoList[0].videoId);
  };

  // video chatting useEffect
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
      {showPlayer ? (
        <YouTube
          videoId={nowPlayId}
          opts={opts}
          onStateChange={onPlayerStateChange}
        />
      ) : (
        <div />
      )}

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
        {videoList.map((video) => (
          <p key={video.id}>{video.title}</p>
        ))}
        <input
          value={url}
          onChange={onChangeUrl}
          placeholder="동영상 링크를 입력하세요."
        />
        <button onClick={onPushToList}>제출</button>
        <button onClick={skipNowVideo}>다음 영상</button>
      </div>

      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;
