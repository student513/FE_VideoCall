import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';
import YouTube from 'react-youtube';
import Drawer from './component/Drawer';
import MenuDropDown from './component/MenuDropDown';
import { useObserver } from 'mobx-react';
import useStore from './useStore';
import './Room.css';

const opts = {
  height: window.innerHeight * 0.75,
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const Room = ({ roomName, token, handleLogout }) => {
  const { videoListStore } = useStore();

  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);

  const dequeueVideoList = () => {
    videoListStore.dequeueVideoList();
  };
  const setNowPlayId = (videoId) => {
    videoListStore.setNowPlayId(videoId);
  };

  const onPlayerStateChange = (e) => {
    if (e.data === 0) {
      dequeueVideoList();
      setNowPlayId(null); // dequeue 이후 동일 videoId가 입력될 경우 영상이 넘어가지 않음
      //서버 GET
      if (videoListStore.videoList.length) {
        //서버 POST
        setNowPlayId(videoListStore.videoList[0].videoId);
      }
    }
    // 영상 일시정지 시(1)
    // 영상 이동 시: 버퍼링(3)?
  };

  // video chatting useEffect
  useEffect(() => {
    const connectParticipant = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const disconnectParticipant = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    Video.connect(token, {
      name: roomName,
    }).then((room) => {
      setRoom(room);
      room.on('participantConnected', connectParticipant);
      room.on('participantDisconnected', disconnectParticipant);
      room.participants.forEach(connectParticipant);
    });

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom?.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach((trackPublication) => {
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

  return useObserver(() => (
    <div className="wrapper">
      <div className="room">
        <MenuDropDown handleLogout={handleLogout} />
        <div className="contentsBlank">
          {videoListStore.showPlayer ? (
            <YouTube
              videoId={videoListStore.nowPlayId}
              opts={opts}
              onStateChange={onPlayerStateChange}
            />
          ) : (
            ' '
          )}
        </div>
        <div className="participants">
          <div className="localParticipants">
            {room ? (
              <Participant
                key={room.localParticipant.sid}
                participant={room.localParticipant}
              />
            ) : (
              ''
            )}
          </div>
          <div className="remoteParticipants">{remoteParticipants}</div>
        </div>
      </div>
      <Drawer messages={messages} />
    </div>
  ));
};

export default Room;
