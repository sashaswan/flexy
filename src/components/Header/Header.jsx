import React from 'react';
import Navbar from './Navbar';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import logout from './../../img/logout.png';

const Header = (props) => {
    return (
        <div>
            <Navbar />
            <div className={s.loginBlock}>
                <div className={s.Links}>
                    {props.isAuth
                        ? <div>{props.login} - <button onClick={props.logout} className={s.Links}><img className={s.logoutButton} src={logout} alt='logout' /></button></div>
                        : <div className={s.authLinks}>
                            <NavLink to={'/login'}>Login</NavLink>
                            <NavLink to={'/register'}>Register</NavLink>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;