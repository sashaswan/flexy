import React from 'react';
import s from './Users.module.css'
import Paginator from '../common/paginator/Paginator';
import User from './User';

let Users = ({ currentPage, onPageChanged, totalItemsCount, pageSize, users, ...props }) => {

    return <div className={s.box}>
        {users.map(u => <User
            user={u}
            followingInProgress={props.followingInProgress}
            unfollow={props.unfollow}
            follow={props.follow}
            key={u.id} />)}

        <Paginator currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalItemsCount={totalItemsCount}
            pageSize={pageSize} />
    </div>
}
export default Users;