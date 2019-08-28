import React, { Component } from 'react'
import { Widget as ChatWidget, addResponseMessage } from 'react-chat-widget'
import { connect } from 'react-redux'
import Peer from 'peerjs'
import { START_PEER_CONNECTION } from '../../constants/eventTypes'

import Buttons from '../widgets/Buttons'

import "./ChatBox.css"
import 'react-chat-widget/lib/styles.css'
import logo from '../../assets/images/logo.svg'

// this component was taken from https://github.com/Wolox/react-chat-widget

class ChatBox extends Component {

  constructor(props) {
    super(props)
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia
    this.localVideoRef = React.createRef()
    this.remoteVideoRef = React.createRef()
    this.state.peer = new Peer(this.props.userNick, {
      host: process.env.REACT_APP_PEERJS_HOST,
      path: process.env.REACT_APP_PEERJS_PATH,
      port: process.env.REACT_APP_PEERJS_PORT,
      debug: 1,
      secure: process.env.REACT_APP_PEERJS_SECURE === 'true'
    })
  }

  state = {
    mediaStreaming: false,
    connection: null,
    peer: null,
    localMediaStream: null,
  }

  componentWillReceiveProps({ userToChat, role, socket }) {
    //user who accept invitation is a receiver and wait for connection
    if (role === 'receiver') {
      // when receiveing start peer connection event init peer
      socket.on(START_PEER_CONNECTION, () => {
        // receiving text messages
        console.log('receiver will react on connection')
        this.state.peer.on('connection', peerConnection => {
          peerConnection.on('data', this.handleIncomingMessage)
          this.setState({ connection: peerConnection })
          console.log('receiver will react on data event')
        })

      })
    } else {
      this.setState({ connection: this.state.peer.connect(userToChat) }, () => {
        // sending text messages
        console.log('sender will connect')
        this.state.connection.on('data', this.handleIncomingMessage)
      })
    }

    // receiving media stream
    this.state.peer.on('call', call => {
      call.answer(null)
      call.on('stream', remoteMediaStream => {
        this.remoteVideoRef.srcObject = remoteMediaStream
      })
    })

  }

  // handling peer event here
  handleIncomingMessage = message => {
    console.log('handleIncomingMessage Invoked')
    addResponseMessage(message)
  }

  handleNewUserMessage = newMessage => {
    if (this.state.connection) {
      console.log('handle new user message')
      this.state.connection.send(newMessage)
    }
  }

  handleMediaButton = () => {
    if (!this.state.mediaStreaming) {
      this.setState({ mediaStreaming: true })
      this.startMediaStreaming()
    } else {
      // stopping sending our local media stream
      this.localVideoRef.pause()
      this.localVideoRef.src = ''
      this.state.localMediaStream.getTracks().forEach(track => track.stop())
      this.setState({ mediaStreaming: false })
    }
  }

  startMediaStreaming = () => {
    navigator.getUserMedia({ video: true, audio: true },
      mediaStream => {
        this.setState({ localMediaStream: mediaStream })
        // just displaying media stream locally
        this.localVideoRef.srcObject = mediaStream

        this.state.peer.call(this.props.userToChat, mediaStream)
      }, error => {
        console.error(error)
      })
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
        <Buttons onTalkButtonClicked={this.handleMediaButton} />

        <h3 className={"local-video-label"}>Local video:</h3>
        <video className={"local-video"} autoPlay={true} ref={localVideoRef => { this.localVideoRef = localVideoRef }} muted />

        <h3 className={"remote-video-label"}>Remote video: </h3>
        <video className={"remote-video"} autoPlay={true} ref={remoteVideoRef => { this.remoteVideoRef = remoteVideoRef }} />

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
