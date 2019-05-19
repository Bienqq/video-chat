import React, { Component } from 'react';
import ContactItem from './ContactItem'
import SocketContext from '../../config/socketContext'
import { connect } from 'react-redux'
import { updateAllUsersOnline } from '../../actions/actions'

import './ContactList.css'

class ContactList extends Component {

    state = {
        allUsersOnline: []
    }

    // in this way we can access global instance of socketChod
    componentDidMount() {
        this.props.socket.on(process.env.REACT_APP_ALL_USERS_EVENT, allUsersOnline => {
            this.setState({ allUsersOnline: allUsersOnline })
            this.props.onAllUsersUpdated(allUsersOnline)
        })
    }

    onItemClicked = user => {
        this.props.userSelected(user)
    }

    render() {
        const contactItems = this.state.allUsersOnline.map((user, index) => {
            return <ContactItem nick={user} key={index} onItemClicked={() => this.onItemClicked(user)} />
        })
        return (
            <div className="card">
                <div className="container">
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

const mapDispatchToProps = dispatch => {
    return {
        onAllUsersUpdated: allUsersOnline => dispatch(updateAllUsersOnline(allUsersOnline))
    }
}

export default connect(null, mapDispatchToProps)(ContactListWithSocket)