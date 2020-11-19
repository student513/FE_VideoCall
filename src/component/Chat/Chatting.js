// import React, { useEffect, useState } from 'react';
// import MessageForm from './MessageForm';
// import MessageList from './MessageList';
// import TwilioChat from 'twilio-chat';
// import useStore from '../../useStore';
// import $ from 'jquery';

// const Chatting = (token) => {
//   const { tokenStore } = useStore();

//   const [messages, setMessages] = useState([]);
//   const [username, setUsername] = useState(null);
//   const [channel, setChannel] = useState(null);

//   const handleNewMessage = (text) => {
//     if (channel) {
//       channel.sendMessage(text);
//     }
//   };

//   const addMessage = (message) => {
//     const messageData = { ...message, me: message.author === username };
//     setMessages([...messages, messageData]);
//   };

//   useEffect(() => {
//     getToken()
//       .then(createChatClient) //mobx로부터 token get
//       .then(joinGeneralChannel)
//       .then(configureChannelEvents)
//       .catch((error) => {
//         addMessage({ body: `Error: ${error.message}` });
//       });
//     // console.log(tokenStore.token);
//   });

//   const getToken = () => {
//     return new Promise((resolve, reject) => {
//       addMessage({ body: 'Connecting...' });

//       $.getJSON('/token', (token) => {
//         // this.setState({ username: token.identity });
//         setUsername(token.identity);
//         console.log(token);
//         resolve(token);
//       }).fail(() => {
//         reject(Error('Failed to connect.'));
//       });
//     });
//   };

//   const createChatClient = async (token) => {
//     const client = new TwilioChat(token.jwt);
//     console.log(client);
//     return client;
//   };

//   const joinGeneralChannel = async (chatClient) => {
//     await chatClient.getSubscribedChannels(); //.catch(() => this.addMessage({ body: `Error: Could not get channel list.` }))
//     await chatClient
//       .getChannelByUniqueName('general')
//       .then((channel) => {
//         addMessage({ body: 'Joining general channel...' });
//         setChannel(channel);
//       })
//       .catch(() => createGeneralChannel(chatClient));
//     const Channel = channel;
//     await Channel.join()
//       .then(() => {
//         addMessage({ body: `Joined general channel as ${username}` });
//         window.addEventListener('beforeunload', () => Channel.leave());
//       })
//       .catch(() =>
//         addMessage({ body: `Error: Could not join general channel.` })
//       );
//     return Channel;
//   };

//   const configureChannelEvents = (channel) => {
//     channel.on('messageAdded', ({ author, body }) => {
//       addMessage({ author, body });
//     });
//     channel.on('memberJoined', (member) => {
//       addMessage({ body: `${member.identity} has joined the channel.` });
//     });
//     channel.on('memberLeft', (member) => {
//       addMessage({ body: `${member.identity} has left the channel.` });
//     });
//   };

//   const createGeneralChannel = async (chatClient) => {
//     addMessage({ body: 'Creating general channel...' });
//     const Client = await chatClient
//       .createChannel({ uniqueName: 'general', friendlyName: 'General Chat' })
//       .then(() => joinGeneralChannel(chatClient))
//       .catch(() =>
//         addMessage({ body: `Error: Could not create general channel.` })
//       );
//     return Client;
//   };

//   return (
//     <div className="chatContainer">
//       <MessageList messages={messages} />
//       <MessageForm onMessageSend={handleNewMessage} />
//     </div>
//   );
// };

// export default Chatting;
import React, { Component } from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import TwilioChat from 'twilio-chat';
import $ from 'jquery';
import './Chatting.css';

class Chatting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: null,
      channel: null,
    };
  }

  componentDidMount = () => {
    this.getToken()
      .then(this.createChatClient)
      .then(this.joinGeneralChannel)
      .then(this.configureChannelEvents)
      .catch((error) => {
        this.addMessage({ body: `Error: ${error.message}` });
      });
  };

  getToken = () => {
    return new Promise((resolve, reject) => {
      this.addMessage({ body: 'Connecting...' });

      $.getJSON('/token', (token) => {
        console.log(token);
        resolve(token);
      }).fail(() => {
        reject(Error('Failed to connect.'));
      });
    });
  };

  createChatClient = (token) => {
    return new Promise((resolve, reject) => {
      resolve(new TwilioChat(token.jwt));
    });
  };

  joinGeneralChannel = (chatClient) => {
    return new Promise((resolve, reject) => {
      chatClient
        .getSubscribedChannels()
        .then(() => {
          chatClient
            .getChannelByUniqueName('general')
            .then((channel) => {
              this.addMessage({ body: 'Joining general channel...' });
              this.setState({ channel });

              channel
                .join()
                .then(() => {
                  this.addMessage({
                    body: `Joined general channel as ${this.state.username}`,
                  });
                  window.addEventListener('beforeunload', () =>
                    channel.leave()
                  );
                })
                .catch(() => reject(Error('Could not join general channel.')));

              resolve(channel);
            })
            .catch(() => this.createGeneralChannel(chatClient));
        })
        .catch(() => reject(Error('Could not get channel list.')));
    });
  };

  createGeneralChannel = async (chatClient) => {
    this.addMessage({ body: 'Creating general channel...' });
    const Client = await chatClient
      .createChannel({ uniqueName: 'general', friendlyName: 'General Chat' })
      .then(() => this.joinGeneralChannel(chatClient))
      .catch(() =>
        this.addMessage({ body: `Error: Could not create general channel.` })
      );
    return Client;
  };

  addMessage = (message) => {
    const messageData = {
      ...message,
      me: message.author === this.state.username,
    };
    this.setState({
      messages: [...this.state.messages, messageData],
    });
  };

  handleNewMessage = (text) => {
    if (this.state.channel) {
      this.state.channel.sendMessage(text);
    }
  };

  configureChannelEvents = (channel) => {
    channel.on('messageAdded', ({ author, body }) => {
      this.addMessage({ author, body });
    });

    channel.on('memberJoined', (member) => {
      this.addMessage({ body: `${member.identity} has joined the channel.` });
    });

    channel.on('memberLeft', (member) => {
      this.addMessage({ body: `${member.identity} has left the channel.` });
    });
  };

  render() {
    return (
      <div className="App">
        <MessageList messages={this.state.messages} />
        <MessageForm onMessageSend={this.handleNewMessage} />
      </div>
    );
  }
}

export default Chatting;
