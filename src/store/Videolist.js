import { observable } from 'mobx';

const videoListStore = observable({
  videoList: [],
  nowPlayId: '',
  showPlayer: false,

  setShowPlayer() {
    this.showPlayer = true;
  },
  setNowPlayId(videoId) {
    this.nowPlayId = videoId;
  },
  pushVideoList(videoId, title, id) {
    this.videoList.push({
      videoId,
      title,
      id,
    });
    if (this.videoList.length) {
      this.setNowPlayId(this.videoList[0].videoId);
      console.log(this.videoList);
    }
  },
  popVideoList() {
    if (this.videoList.length) {
      this.videoList = this.videoList.slice(1);
    }
  },
});

export { videoListStore };
