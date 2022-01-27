import React from 'react';
import s from './users.module.css'
import { NavLink } from 'react-router-dom';
import userPhoto from './../../img/ava2.png';

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    };
    return <div className={s.box}>
        {props.users.map(u => <div key={u.id}>
            <div className={s.userBox}>
                <div className={s.userInfo}>
                    <div className={s.avatar}>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} alt='a1' />
                        </NavLink>
                    </div>
                    <div className={s.userInfoBox}>
                        <p>{u.name}</p>
                        <p>{u.status}</p>
                        {/* <p>{u.location.country}</p>
                        <p>{u.location.city}</p> */}
                        {u.followed
                            ? <button
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                className={s.actionButton}
                                onClick={() => { props.unfollow(u.id) }}><p>Unfollow</p>
                            </button>
                            : <button
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                className={s.actionButton}
                                onClick={() => { props.follow(u.id) }}><p>Follow</p></button>}
                    </div>
                </div>
            </div>
        </div>
        )}
        <div className={s.page}>
            {pages.map(p => {
                return <p
                    className={props.currentPage === p && s.selectedPage}
                    onClick={() => {
                        props.onPageChanged(p)
                    }}>{p}</p>
            })}
        </div>
    </div>
}
export default Users;