import React, { Component } from 'react';
import ContactItem from './ContactItem'
import { connect } from 'react-redux'
import { updateAllUsersOnline } from '../../actions/actions'
import { ALL_USERS_ONLINE } from '../../constants/eventTypes'

import './ContactList.css'

class ContactList extends Component {

    state = {
        allUsersOnline: []
    }

    componentDidMount() {
        this.props.socket.on(ALL_USERS_ONLINE, allUsersOnline => {
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

const mapDispatchToProps = dispatch => {
    return {
        onAllUsersUpdated: allUsersOnline => dispatch(updateAllUsersOnline(allUsersOnline))
    }
}

export default connect(null, mapDispatchToProps)(ContactList)