import React from 'react';
import Navbar from './Navbar';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <div>
            <Navbar />
            <div className={s.loginBlock}>
                <div className={s.Links}>
                    {props.isAuth
                        ? <div>{props.login} - <button onClick={props.logout} className={s.Links}>Logout</button></div>
                        : <NavLink to={'/login'}>Login</NavLink>}
                </div>
            </div>
        </div>
    );
}

export default Header;