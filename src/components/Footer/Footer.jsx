import React from 'react';
import footer from './footer.module.css';

const Footer = () => {
    return (
        <div>
            <div className={footer.box}>
                <p className={footer.text}>All copyrights reserved</p>
                <p className={footer.text}>Flexy 2.0</p>
            </div>
        </div>
    );
}

export default Footer;