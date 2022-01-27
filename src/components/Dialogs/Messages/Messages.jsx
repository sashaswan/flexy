import React from 'react';
import avatar from './../../../img/avatar.png'
import s from './Messages.module.css';

const Messages = (props) => {
    return (
        <div>
            <div className={s.center}>
                <div className={s.ava}>
                    <img src={avatar} alt='profilePicture' />
                </div>
                <div className={s.message}>
                    <p className={s.text}>{props.message}</p>
                </div>
            </div>
        </div>
    );
}

export default Messages;