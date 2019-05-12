import React, { Component } from 'react'
import * as io from 'socket.io-client'

import './App.css'

import SocketContext from '../../config/socketContext'
import ChatBox from '../chatbox/ChatBox'
import ContactList from '../contacts/ContactList'
import WelcomeDialog from '../widgets/WelcomeDialog'

class App extends Component {

  state = {
    userNick: '',
    socket: null
  }

  handleEnteredNick = (nick) => {
    // if user provides his nick, app is connected with server via socket
    this.setState({
      userNick: nick,
      socket: io(process.env.REACT_APP_SERVER_URL, { query: `nick=${nick}` })
    })
  }

  render() {
    let contactList
    if (this.state.socket) {
      contactList = <ContactList />
    }

    return (
      //We are using one global socket instance by SocketContext
      <SocketContext.Provider value={this.state.socket}>
        <ChatBox />
        {contactList}
        <WelcomeDialog nick={this.handleEnteredNick} />
      </SocketContext.Provider>
    )
  }
}

export default App
