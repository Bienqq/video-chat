import React, { Component } from 'react';
import ContactItem from './ContactItem'
import SocketContext from '../../config/socketContext'

import './ContactList.css'

class ContactList extends Component {

    state = {
        allUsers: []
    }

    // in this way we can access global instance of socket
    componentDidMount() {
        this.props.socket.on(process.env.REACT_APP_ALL_USERS_EVENT, allUsers => {
            this.setState({ allUsers: allUsers })
        })
    }

    onItemClicked = (user) => {
        this.props.userToChat(user) 
    }

    render() {
        const contactItems = this.state.allUsers.map((user, index) => {
            return <ContactItem nick={user} key={index} onClick={() => this.onItemClicked(user)}/>
        })
        return (
            <div class="card">
                <div class="container">
                <h1 className="list-title"> Contact List</h1>
                    {contactItems}
                </div>
            </div>
        )
    }
}

const ContactListWithSocket = props => (
    <SocketContext.Consumer>
        {socket => < ContactList {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default ContactListWithSocket