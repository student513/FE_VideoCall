import React, { useState, useRef } from 'react';
import { useObserver } from 'mobx-react';
import getVideoId from 'get-video-id';
import getVideoTitle from 'get-youtube-title';
import useStore from '../useStore';
import './Playlist.css';

const Playlist = () => {
  const { videoListStore } = useStore();
  const [url, setUrl] = useState('');
  const nextId = useRef(0);

  const pushVideoList = (videoId, title, id) => {
    videoListStore.pushVideoList(videoId, title, id);
  };
  const setNowPlayId = (videoId) => {
    videoListStore.setNowPlayId(videoId);
  };
  const popVideoList = () => {
    videoListStore.popVideoList();
  };
  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const onPushToList = () => {
    videoListStore.setShowPlayer(true);
    const videoId = getVideoId(url).id;
    getVideoTitle(videoId, function (err, title) {
      pushVideoList(videoId, title, nextId.current++);
    });
    setUrl('');
  };

  const skipNowVideo = () => {
    popVideoList();
    if (videoListStore.videoList.length) {
      setNowPlayId(videoListStore.videoList[0].videoId);
    }
  };

  return useObserver(() => (
    <div className="titleContainer">
      {videoListStore.videoList.map((video) => (
        <div className="videoTitle" key={video.id}>
          {video.title}
        </div>
      ))}
      <input
        className="urlInput"
        value={url}
        onChange={onChangeUrl}
        placeholder="동영상 링크를 입력하세요."
      />
      <button onClick={onPushToList}>제출</button>
      <button onClick={skipNowVideo}>다음 영상</button>
    </div>
  ));
};

export default Playlist;
