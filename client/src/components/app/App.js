import React, { Component } from 'react'
import * as io from 'socket.io-client'
import ChatBox from '../chatbox/ChatBox'
import ContactList from '../contacts/ContactList'
import WelcomeDialog from '../widgets/WelcomeDialog'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { connectSocket, userToChatSelected } from '../../actions/actions'
import { INVITE_USER_TO_CHAT, START_PEER_CONNECTION } from '../../constants/eventTypes'
import './App.css'

class App extends Component {

  state = {
    showChatBox: false,
    role: ''
  }

  componentWillReceiveProps({ userNick, socket }) {
    if (userNick && !socket) {
      // contect to socket server
      this.props.onSocketConnected(io(process.env.REACT_APP_BROKER_URL, { query: `nick=${userNick}` }))
    }
    if (socket) {
      // listen to any invitation from other users
      socket.on(INVITE_USER_TO_CHAT, (notifierUser, answerCallbackFn) => {
        this.handleInvitationAlert(notifierUser, answerCallbackFn)
      })
    }
  }

  handleInvitationAnswer = (userToChat, invitationAnswer) => {
    Swal.fire({
      title: invitationAnswer ? "Invitation accepted!" : "Invitation rejected!",
      text: `User ${userToChat} ${invitationAnswer ? 'accepted' : 'rejected'} Your invitation`,
      type: invitationAnswer ? 'success' : 'error',
      showCancelButton: false,
      confirmButtonText: 'OK'
    }).then(() => {
      if (invitationAnswer) {
        this.setState({ showChatBox: true, role: 'sender' })
        this.props.onUserToChatSelected(userToChat)
        this.props.socket.emit(START_PEER_CONNECTION, userToChat)
      }
    })
  }

  handleInvitationAlert = (notifierUser, answerCallbackFn) => {
    Swal.fire({
      title: 'Want to chat?',
      text: `User ${notifierUser} wants to chat with You !`,
      type: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Accept',
      cancelButtonText: 'Reject'
    }).then(result => {
      if (result.value) {
        this.setState({ showChatBox: true, role: 'receiver' })
        this.props.onUserToChatSelected(notifierUser)
      }
      answerCallbackFn(result.value)
    })
  }

  handleUserToChatSelected = userToChat => {
    if (this.props.userNick === userToChat) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'You cannot chat with Yourself !',
        footer: 'Are you silly? xd'
      })
    } else {
      this.inviteUserToChat(userToChat)
    }
  }

  inviteUserToChat = userToChat => {
    this.props.socket.emit(INVITE_USER_TO_CHAT, userToChat, answer => {
      this.handleInvitationAnswer(userToChat, answer)
    })
  }

  render() {
    let contactList, messageBox
    if (this.props.socket) {
      contactList = <ContactList socket={this.props.socket} userSelected={this.handleUserToChatSelected} />
    }
    if (this.state.showChatBox) {
      messageBox = <ChatBox role={this.state.role} />
    }

    return (
      <div>
        {contactList}
        {messageBox}
        <WelcomeDialog />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userNick: state.userNick,
    socket: state.socket
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSocketConnected: socket => dispatch(connectSocket(socket)),
    onUserToChatSelected: userToChat => dispatch(userToChatSelected(userToChat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
