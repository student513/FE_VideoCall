import { observable } from 'mobx';

const userStore = observable({
  roomname: '',
  username: '',

  setUserInfo(roomname, username) {
    this.username = username;
    this.roomname = roomname;
  },
});

export { userStore };
