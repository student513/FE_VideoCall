import React, { useState, useRef, useEffect } from 'react';

const getVideoId = require('get-video-id');
const getVideoTitle = require('get-youtube-title');

const Playlist = () => {
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

  const skipNowVideo = () => {
    setVideoList(videoList.slice(1));
    setNowPlayId(videoList[0].videoId);
  };

  return (
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
  );
};

export default Playlist;
