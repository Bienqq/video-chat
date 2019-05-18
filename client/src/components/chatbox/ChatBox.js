import React, { Component } from 'react';
import { Widget as ChatWidget, addResponseMessage } from 'react-chat-widget';
import { connect } from 'react-redux'

import SocketContext from '../../config/socketContext'

import "./ChatBox.css"
import 'react-chat-widget/lib/styles.css';
import logo from '../../assets/images/logo.svg'

// this component was taken from https://github.com/Wolox/react-chat-widget

class ChatBox extends Component {

  componentDidMount() {
    this.props.socket.on(process.env.REACT_APP_MESSAGE_EVENT, newMessage => addResponseMessage(newMessage))
  }

  handleNewUserMessage = newMessage => {
    this.props.socket.emit(process.env.REACT_APP_MESSAGE_EVENT, newMessage)
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

const mapStateToProps = state => {
    return {
      userToChat: state.userToChat
    }
}

export default connect(mapStateToProps)(ChatBoxWithSocket)