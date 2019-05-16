import React, { Component } from 'react'

import * as io from 'socket.io-client'
import './App.css'
import SocketContext from '../../config/socketContext'
import ChatBox from '../chatbox/ChatBox'
import ContactList from '../contacts/ContactList'
import WelcomeDialog from '../widgets/WelcomeDialog'
import Swal from 'sweetalert2'

class App extends Component {

  state = {
    userNick: '',
    socket: null,
    userToChat: '',
  }

  handleEnteredNick = (nick) => {
    // if user provides his nick, app is connected with server via socket
    this.setState({
      userNick: nick,
      socket: io(process.env.REACT_APP_SERVER_URL, { query: `nick=${nick}` })
    }, () => {
      this.state.socket.on(process.env.REACT_APP_NOTIFY_USER_EVENT, ({ notifierUserNick, roomName }) => {
        
        Swal.fire({
          title: 'Want to chat?',
          text: 'User ' + notifierUserNick + ' wants to chat with You on room ' + roomName + ' !',
          type: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Chat'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'You can chat now!',
              'Good luck :)',
              'success'
            )
          }
        })

      })
    })
  }

  selectUserToChat = (userToChat) => {
    if (this.state.userNick === userToChat) {
      alert("You cannot chat with Yourself !")
    } else {
      this.setState({ userToChat: userToChat })
    }
  }

  render() {
    let contactList, messageBox
    if (this.state.socket) {
      contactList = <ContactList userToChat={this.selectUserToChat} />
    }
    if (this.state.userToChat) {
      messageBox = <ChatBox userToChat={this.state.userToChat}/>
    }

    return (
      //We are using one global socket instance by SocketContext
      <SocketContext.Provider value={this.state.socket}>
        {messageBox}
        {contactList}
        <WelcomeDialog nick={this.handleEnteredNick} />
      </SocketContext.Provider>
    )
  }
}

export default App
