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
  pushVideoList(videoInfo) {
    this.videoList.push(videoInfo);
    if (this.videoList.length) {
      this.setNowPlayId(this.videoList[0].videoId);
    }
  },
  dequeueVideoList() {
    if (this.videoList.length > 1) {
      this.videoList = this.videoList.slice(1);
    }
  },
});

export { videoListStore };
