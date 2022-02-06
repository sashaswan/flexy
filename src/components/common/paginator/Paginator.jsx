import React from 'react';
import s from './Paginator.module.css'

let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    };
    return <div className={s.page}>
        {pages.map(p => {
            return <p
                className={currentPage === p && s.selectedPage}
                onClick={() => {
                    onPageChanged(p)
                }}>{p}</p>
        })}
    </div>
}
export default Paginator;