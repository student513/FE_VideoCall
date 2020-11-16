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
