export const postUser = (username, roomName) =>
  fetch('/token', {
    method: 'POST',
    body: JSON.stringify({
      identity: username,
      room: roomName,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
