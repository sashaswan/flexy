import React, { useState } from 'react';
import s from './Paginator.module.css';
import cn from 'classnames';
import left from './../../../img/left-arrow.png';
import right from './../../../img/right-arrow.png';

let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    };

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;

    return <div className={s.page}>
        {portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) }}><img src={left} className={s.arrows} alt='prev'/></button>}
        {pages
            .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
            .map((p) => {
                return <p
                    className={cn({
                        [s.selectedPage]: currentPage === p
                    }, s.pageNumber)}
                    key={p}
                    onClick={(e) => {
                        onPageChanged(p);
                    }}>{p}</p>
            })}
        {portionCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1) }}><img src={right} className={s.arrows} alt='next'/></button>}
    </div>
}
export default Paginator;