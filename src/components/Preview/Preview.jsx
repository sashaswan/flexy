import React from 'react';
import s from './Preview.module.css';
import logo from './../../img/logo.svg';
import { NavLink } from 'react-router-dom';
import down from './../../img/down.png';

const Preview = () => {
    return (
        <div>
            <div className={s.background}>
                <div className={s.info}>
                    <img src={logo} alt='logo' className={s.logo} />
                    <p><img src={down} className={s.down} alt='down' /></p>
                    <NavLink to={'/profile'}>
                        <p>My Profile</p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export default Preview;