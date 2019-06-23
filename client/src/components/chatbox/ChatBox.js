import React, { Component } from 'react'
import { Widget as ChatWidget, addResponseMessage } from 'react-chat-widget'
import { connect } from 'react-redux'

import SocketContext from '../../config/socketContext'
import Buttons from '../widgets/Buttons'
import { ReactMic } from 'react-mic';

import "./ChatBox.css"
import 'react-chat-widget/lib/styles.css'
import logo from '../../assets/images/logo.svg'

// this component was taken from https://github.com/Wolox/react-chat-widget

class ChatBox extends Component {

  constructor(props) {
    super(props)
    this.localVideoRef = React.createRef()
  }

  state = {
    recordVoice: false,
  }

  componentDidMount() {
    this.props.socket.on(process.env.REACT_APP_MESSAGE_EVENT, message => this.handleIncomingMessage(message))
  }

  handleIncomingMessage = ({ type, data }) => {
    switch (type) {
      case 'text':
        addResponseMessage(data)
        break
      case 'audio':
        break
      case 'video':
        break
      default:
        return
    }
  }

  handleNewUserMessage = newMessage => {
    this.props.socket.emit(process.env.REACT_APP_MESSAGE_EVENT, { type: 'text', data: newMessage })
  }

  handleTalkButton = () => {
    this.setState({ recordVoice: true })
  }

  handleVoice = voiceBlob => {
    if (voiceBlob.length !== 0) {
      this.props.socket.emit(process.env.REACT_APP_MESSAGE_EVENT, { type: 'audio', data: voiceBlob })
    }
  }

  callPeer() {
    navigator.getUserMedia({ video: true, audio: true }, stream => {
      //playing local video
      this.localVideoRef.srcObject = stream
      this.localVideoRef.play()
    },
      err => console.error(err))
  }


  render() {
    const { userToChat, roomName } = this.props
    return (
      <div>
        <ChatWidget handleNewUserMessage={this.handleNewUserMessage}
          title="Chat"
          subtitle={`Chatting with user ${userToChat} on room ${roomName}`}
          profileAvatar={logo}
        />

        <ReactMic
          record={this.state.recordVoice}
          onData={this.handleVoice}
          audioBitsPerSecond={128000}
        />
        <Buttons onTalkButtonClicked={this.handleTalkButton} />
        <video ref={localVideoRef => { this.localVideoRef = localVideoRef }} muted />
      </div>
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
    userToChat: state.userToChat,
    roomName: state.roomName,
    userNick: state.userNick
  }
}

export default connect(mapStateToProps)(ChatBoxWithSocket)