// get이 없는 이유: username, roomName을 넘겨주면 json을 뱉어주기 때문
export const postUser = (username, roomName) =>
  fetch('/video/token', {
    method: 'POST',
    body: JSON.stringify({
      identity: username,
      room: roomName,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

// 재생목록 post,
// Playlist.js: push, dequeue때 전부 호출
// nowPlayId, showPlayer는 state로 관리하며
// VideoList의 lenght에 따라 조건문으로 관리하자
export const postVideoList = (videoList, roomName) =>
  fetch(`~~~${roomName}`, {
    method: 'POST',
    body: JSON.stringify({
      videoList,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

// 재생목록 get
// Room.js
// 방 입장 시 서버의 VideoList 받아오기
// nowPlayId, showPlayer는 마찬가지로 VideoList로 조건문 관리
export const getVideoList = (roomName) =>
  fetch(`~~~${roomName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

// onPlayerStateChange에서 이벤트 발생 시 호출
export const postPlayerEvent = (roomName, eventNum) =>
  fetch(`~~~${roomName}`, {
    method: 'POST',
    body: JSON.stringify({
      eventNum,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
