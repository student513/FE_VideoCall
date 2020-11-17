import React, { useEffect, useState } from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import TwilioChat from 'twilio-chat';
import $ from 'jquery';

const Chatting = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(null);
  const [channel, setChannel] = useState(null);

  const handleNewMessage = (text) => {
    if (channel) {
      channel.sendMessage(text);
    }
  };

  const addMessage = (message) => {
    const messageData = { ...message, me: message.author === username };
    setMessages({
      messages: [...messages, messageData],
    });
  };

  const getToken = async () => {
    addMessage({ body: 'Connecting...' });
    const jsonToken = await $.getJSON('/token', (token) =>
      setUsername(token.identity)
    ).fail(() =>
      addMessage({ body: `Error: Failed to connect. Turn on server` })
    );
    return jsonToken;
  };

  const createChatClient = async (token) => {
    return new TwilioChat(token.jwt);
  };

  const joinGeneralChannel = async (chatClient) => {
    await chatClient.getSubscribedChannels(); //.catch(() => this.addMessage({ body: `Error: Could not get channel list.` }))
    await chatClient
      .getChannelByUniqueName('general')
      .then((channel) => {
        addMessage({ body: 'Joining general channel...' });
        setChannel(channel);
      })
      .catch(() => createGeneralChannel(chatClient));
    const Channel = channel;
    await Channel.join()
      .then(() => {
        addMessage({ body: `Joined general channel as ${username}` });
        window.addEventListener('beforeunload', () => Channel.leave());
      })
      .catch(() =>
        addMessage({ body: `Error: Could not join general channel.` })
      );
    return Channel;
  };

  const createGeneralChannel = async (chatClient) => {
    addMessage({ body: 'Creating general channel...' });
    const Client = await chatClient
      .createChannel({ uniqueName: 'general', friendlyName: 'General Chat' })
      .then(() => joinGeneralChannel(chatClient))
      .catch(() =>
        addMessage({ body: `Error: Could not create general channel.` })
      );
    return Client;
  };

  const configureChannelEvents = (channel) => {
    channel.on('messageAdded', ({ author, body }) => {
      addMessage({ author, body });
    });
    channel.on('memberJoined', (member) => {
      addMessage({ body: `${member.identity} has joined the channel.` });
    });
    channel.on('memberLeft', (member) => {
      addMessage({ body: `${member.identity} has left the channel.` });
    });
  };

  useEffect(() => {
    getToken()
      .then(createChatClient)
      .then(joinGeneralChannel)
      .then(configureChannelEvents)
      .catch((error) => {
        addMessage({ body: `Error: ${error.message}` });
      });
  });

  return (
    <div className="chatContainer">
      <MessageList messages={messages} />
      <MessageForm onMessageSend={handleNewMessage} />
    </div>
  );
};

export default Chatting;
