import React from 'react';
import preloader from './../../../img/preload.svg';
import s from './Preloader.module.css'

let Preloader = (props) => {
    return <div className={s.preloaderBox}>
        <img src={preloader} alt='preloader' />
    </div>
}

export default Preloader;