import React, { Component } from 'react'
import { Widget as ChatWidget, addResponseMessage } from 'react-chat-widget'
import { connect } from 'react-redux'
import Peer from 'peerjs'
import { START_PEER_CONNECTION } from '../../constants/eventTypes'

import Buttons from '../widgets/Buttons'
import { ReactMic } from 'react-mic'

import "./ChatBox.css"
import 'react-chat-widget/lib/styles.css'
import logo from '../../assets/images/logo.svg'

// this component was taken from https://github.com/Wolox/react-chat-widget

class ChatBox extends Component {

  constructor(props) {
    super(props)
    this.localVideoRef = React.createRef()
    this.state.peer = new Peer(this.props.userNick, {
      host: process.env.REACT_APP_PEERJS_HOST,
      port: process.env.REACT_APP_PEERJS_PORT,
      path: process.env.REACT_APP_PEERJS_PATH,
      debug: 1,
      secure: false
    })
  }

  state = {
    recordVoice: false,
    connection: null,
    peer: null
  }

  componentWillReceiveProps({ userToChat, role, socket }) {
    //user who accept invitation is a receiver and wait for connection
    if (role === 'receiver') {
      socket.on(START_PEER_CONNECTION, () => {
        this.state.peer.on('connection', peerConnection => {
          peerConnection.on('data', this.handleIncomingMessage)
          this.setState({ connection: peerConnection })
        })
      })
    } else {
      this.setState({ connection: this.state.peer.connect(userToChat) }, () => {
        const connection = this.state.connection
        connection.on('data', this.handleIncomingMessage)
      })
    }
  }

  componentDidMount() {
  }

  handleIncomingMessage = message => {
    addResponseMessage(message)
  }

  handleNewUserMessage = newMessage => {
    if (this.state.connection) {
      this.state.connection.send(newMessage)
    }
  }

  handleTalkButton = () => {
    if (!this.setState.recordVoice) {
      this.setState({ recordVoice: true })
    }
  }

  handleVoice = voiceBlob => {

  }

  render() {
    const { userToChat } = this.props
    return (
      <div>
        <ChatWidget handleNewUserMessage={this.handleNewUserMessage}
          title="Chat"
          subtitle={`Chatting with user ${userToChat}`}
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

const mapStateToProps = state => {
  return {
    userToChat: state.userToChat,
    userNick: state.userNick,
    socket: state.socket
  }
}

export default connect(mapStateToProps)(ChatBox)