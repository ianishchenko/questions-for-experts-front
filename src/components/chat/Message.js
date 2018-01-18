import React from 'react';

const Message = ({message, user}) => (
    <li className={`chat ${user === message.email ? "right" : "left"}`}>
        {user !== message.email
        && <img src={message.img} />
        }
        {message.message}
    </li>
);

export default Message;