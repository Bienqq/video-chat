import React, { Component } from 'react'
import * as io from 'socket.io-client'
import SocketContext from '../../config/socketContext'
import ChatBox from '../chatbox/ChatBox'
import ContactList from '../contacts/ContactList'
import WelcomeDialog from '../widgets/WelcomeDialog'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { userToChatSelected } from '../../actions/actions'

import './App.css'

class App extends Component {

  state = {
    socket: null,
  }

  componentWillReceiveProps({ userNick }) {
    if (userNick) {
      this.setState({
        socket: io(process.env.REACT_APP_SERVER_URL, { query: `nick=${userNick}` })
      }, () => {
        this.state.socket.on(process.env.REACT_APP_NOTIFY_USER_EVENT, ({ notifierUserNick, roomName }) => this.showNotification(notifierUserNick, roomName))
      })
    }
  }

  showNotification = (notifierUserNick, roomName) => {
    Swal.fire({
      title: 'Want to chat?',
      text: `User ${notifierUserNick} wants to chat with You on room ${roomName} !`,
      type: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chat'
    }).then(result => {
      if (result.value) {
        Swal.fire(
          'You can chat now!',
          'Good luck :)',
          'success'
        )
      }
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
      this.props.onUserToChatSelected(userToChat)
    }
  }

  render() {
    let contactList, messageBox
    if (this.state.socket) {
      contactList = <ContactList userSelected={this.handleUserToChatSelected} />
    }
    if (this.props.userToChat) {
      messageBox = <ChatBox />
    }

    return (
      //We are using one global socket instance by SocketContext
      <SocketContext.Provider value={this.state.socket}>
        {messageBox}
        {contactList}
        <WelcomeDialog />
      </SocketContext.Provider>
    )
  }
}

const mapStateToProps = state => {
  return {
    userNick: state.userNick,
    userToChat: state.userToChat
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onUserToChatSelected: userToChat => dispatch(userToChatSelected(userToChat)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
