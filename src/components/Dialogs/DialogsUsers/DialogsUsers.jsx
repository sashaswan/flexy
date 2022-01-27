import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import s from './DialogsUsers.module.css';
import avatar from './../../../img/avatar.png'


const DialogsUsers = (props) => {
    return (
        <div>
            <div className={s.users}>
                <div className={s.ava}>
                    <img src={avatar} alt='profilePicture' />
                </div>
                <NavLink to={'/dialogs/' + props.id} >
                    <div className={s.infoBox}>
                        <p className={s.name}>{props.name}</p>
                        <p className={s.info}>Online now</p>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

export default DialogsUsers;