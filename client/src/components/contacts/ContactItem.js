import React from 'react';
import './ContactItem.css'
import { connect } from 'react-redux'

import picture from "../../assets/images/user.png"

const ContactItem = ({ onItemClicked, nick, isUser}) => {
    const userNick = nick === isUser ? 'userNick' : ''
    return (
        <div className='list-item' onClick={onItemClicked}>
            <img className="picture" src={picture} alt="" />
            <div className="info">
                <span className={`nick ${userNick}`}>{nick}</span>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isUser: state.userNick
    }
}

export default connect(mapStateToProps)(ContactItem)