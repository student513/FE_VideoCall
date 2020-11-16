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

  const pushVideoList = (videoInfo) => {
    videoListStore.pushVideoList(videoInfo);
  };
  const setNowPlayId = (videoId) => {
    videoListStore.setNowPlayId(videoId);
  };
  const dequeueVideoList = () => {
    videoListStore.dequeueVideoList();
  };
  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const onPushToList = () => {
    const videoId = getVideoId(url).id;
    if (!videoId) {
      alert('유효하지 않은 url입니다!');
      setUrl('');
      return;
    }
    videoListStore.setShowPlayer();
    getVideoTitle(videoId, function (err, title) {
      const videoInfo = { videoId, title, id: nextId.current++ };
      pushVideoList(videoInfo);
    });
    setUrl('');
  };

  const skipNowVideo = () => {
    dequeueVideoList();
    if (videoListStore.videoList.length) {
      setNowPlayId(videoListStore.videoList[0].videoId);
    }
  };

  const inputUrl = (e) => {
    if (e.key === 'Enter') onPushToList();
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
        onKeyPress={inputUrl}
      />
      <button onClick={onPushToList}>제출</button>
      <button onClick={skipNowVideo}>다음 영상</button>
    </div>
  ));
};

export default Playlist;
