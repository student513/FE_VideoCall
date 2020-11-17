const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant, ChatGrant } = AccessToken;

const generateToken = (config) => {
  return new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret
  );
};

const videoToken = (identity, room, config) => {
  const token = generateToken(config);

  let videoGrant;
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  token.addGrant(videoGrant);

  if (config.TWILIO_CHAT_SERVICE_SID) {
    // Create a "grant" which enables a client to use IPM as a given user,
    // on a given device
    const chatGrant = new ChatGrant({
      serviceSid: config.TWILIO_CHAT_SERVICE_SID,
    });
    token.addGrant(chatGrant);
  }

  token.identity = identity;
  return token;
};

module.exports = { videoToken };
