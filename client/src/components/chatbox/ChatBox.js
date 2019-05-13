import React, { Component } from 'react';
import { Widget as ChatWidget, addResponseMessage } from 'react-chat-widget';
import SocketContext from '../../config/socketContext'

import "./ChatBox.css"
import 'react-chat-widget/lib/styles.css';
import logo from '../../assets/images/logo.svg'

// this component was taken from https://github.com/Wolox/react-chat-widget

class ChatBox extends Component {

  componentDidMount() {
    const roomName = Math.random().toString(36).substring(7)
    const data = {
      roomName,
      nick: this.props.userToChat
    }
    this.props.socket.emit(process.env.REACT_APP_CREATE_ROOM_EVENT, roomName)
    this.props.socket.emit(process.env.REACT_APP_JOIN_ROOM_EVENT, roomName)
    this.props.socket.emit(process.env.REACT_APP_NOTIFY_USER_EVENT, data)
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
    )
  }
}

const ChatBoxWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <ChatBox {...props} socket={socket} />}
  </SocketContext.Consumer>
)

export default ChatBoxWithSocket;