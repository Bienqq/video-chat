import React, { Component } from 'react';
import './ContactItem.css'

import picture from "../../assets/images/user.png"

class ContactItem extends Component {

    render() {
        return (
            <div className='list-item'>
                <img className="picture" src={picture} alt="" />
                <div className="info">
                    <span className="nick">{this.props.nick}</span>
                </div >
            </div>
        );
    }
}

export default ContactItem