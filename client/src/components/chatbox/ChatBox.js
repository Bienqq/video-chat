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

  state = {
    recordVoice: false,
    audioContext: null,
  }

  componentDidMount() {
    this.setState({ audioContext: new AudioContext() })
    this.props.socket.on(process.env.REACT_APP_MESSAGE_EVENT, message => this.handleIncomingMessage(message))
  }

  handleIncomingMessage = ({ type, data }) => {
    switch (type) {
      case 'text':
        addResponseMessage(data)
        break
      case 'audio':
        console.log(data)
        const context = this.state.audioContext
        const arrayBuffer = new ArrayBuffer(data.length)

        context.decodeAudioData(arrayBuffer,  (buffer) => {
          const source = context.createBufferSource();
          source.buffer = buffer;
          source.connect(context.destination);
          source.start(0);
        });
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
    if(voiceBlob.length !== 0){
      console.log(voiceBlob)
      this.props.socket.emit(process.env.REACT_APP_MESSAGE_EVENT, { type: 'audio', data: voiceBlob })
    }
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
    roomName: state.roomName
  }
}

export default connect(mapStateToProps)(ChatBoxWithSocket)