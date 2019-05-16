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
        /*
            <div>
                <h1 className="list-title"> Contact List</h1>
                {contactItems}
            </div>
            */
           /*
           <div class="card" >

           <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap"/>
         
           <div class="card-body">
         
             <h4 class="card-title"><a>Card title</a></h4>
             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
             <a href="#" class="btn btn-primary">Button</a>
         
           </div>
         
         </div>
         */

        <div class="card">
  <div class="container">
  <h1 className="list-title"> Contact List</h1>
                {contactItems}
    <p>{contactItems}</p> 
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