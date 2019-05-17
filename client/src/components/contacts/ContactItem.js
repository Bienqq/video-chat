import React from 'react';
import './ContactItem.css'

import picture from "../../assets/images/user.png"

const ContactItem = ({onItemClicked, nick}) => {
    return (
        <div className='list-item' onClick={onItemClicked}>
            <img className="picture" src={picture} alt="" />
            <div className="info">
                <span className="nick">{nick}</span>
            </div>
        </div>
    );
}

export default ContactItem