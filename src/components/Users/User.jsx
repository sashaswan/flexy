import React from 'react';
import s from './Users.module.css'
import { NavLink } from 'react-router-dom';
import userPhoto from './../../img/ava2.png';

let User = ({ user, followingInProgress, unfollow, follow }) => {

    return (
        <div className={s.usersBlock}>
            <div className={s.userBox}>
                <div className={s.userInfo}>
                    <div className={s.avatar}>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} alt='a1' />
                        </NavLink>
                    </div>
                    <div className={s.userInfoBox}>
                        <p>{user.name}</p>
                        <p>{user.status}</p>
                        {/* <p>{user.location.country}</p>
                        <p>{user.location.city}</p> */}
                        {user.followed
                            ? <button
                                disabled={followingInProgress.some(id => id === user.id)}
                                className={s.actionButton}
                                onClick={() => { unfollow(user.id) }}><p>Unfollow</p>
                            </button>
                            : <button
                                disabled={followingInProgress.some(id => id === user.id)}
                                className={s.actionButton}
                                onClick={() => { follow(user.id) }}><p>Follow</p></button>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default User;