import React from 'react';

export default function ExpertAvatar(props) {
    return (
        <div className="avatar">
            <img src={props.url} alt="experts avatar"/>
        </div>
    );
}