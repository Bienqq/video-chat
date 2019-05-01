import React, { Component } from 'react';
import { Widget as ChatWidget, addResponseMessage } from 'react-chat-widget';

import "./ChatBox.css"
import 'react-chat-widget/lib/styles.css';
import logo from '../../assets/images/logo.svg'

// this component was taken from https://github.com/Wolox/react-chat-widget

class ChatBox extends Component {

  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    //addResponseMessage(response);
  }

  render() {
    return (
      <ChatWidget handleNewUserMessage={this.handleNewUserMessage}
        title="Chat"
        subtitle=""
        profileAvatar={logo}
      />
    );
  }
}

export default ChatBox;