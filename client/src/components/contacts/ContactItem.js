import React from 'react';
import './ContactItem.css'

import picture from "../../assets/images/user.png"

const ContactItem = (props) => {
    return (
        <div className='list-item'>
            <img className="picture" src={picture} alt="" />
            <div className="info">
                <span className="nick">{props.nick}</span>
            </div>
        </div>
    );
}

export default ContactItem