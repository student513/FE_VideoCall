import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';
import YouTube from 'react-youtube';
import Drawer from './component/Drawer';
import { useObserver } from 'mobx-react';
import useStore from './useStore';

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const Room = ({ roomName, token, handleLogout }) => {
  const { videoListStore } = useStore();

  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  const popVideoList = () => {
    videoListStore.popVideoList();
  };
  const setNowPlayId = (videoId) => {
    videoListStore.setNowPlayId(videoId);
  };

  const onPlayerStateChange = (e) => {
    if (e.data === 0) {
      console.log('video ended!!');
      popVideoList();
      if (videoListStore.videoList.length) {
        setNowPlayId(videoListStore.videoList[0].videoId);
      }
    }
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

  return useObserver(() => (
    <div className="room">
      <button onClick={handleLogout}>Log out</button>
      {videoListStore.showPlayer ? (
        <YouTube
          videoId={videoListStore.nowPlayId}
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
      <Drawer />
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  ));
};

export default Room;
