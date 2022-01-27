import React from 'react';
import s from './Navbar.module.css';
import { Grid, Cell } from 'react-foundation';
import logo from './../../img/logo.svg';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <div className={s.Navbar}>
                <div className={s.NavbarContent}>
                    <div className={s.logo}>
                        <img alt="pageLogo" src={logo} />
                    </div>
                    <Grid className={s.center}>
                        <Cell large={1} medium={2} small={12}>
                            <div className={s.item}>
                                <NavLink to='/profile' activeClassName={s.selected}>
                                    Profile
                                </NavLink>
                            </div>
                        </Cell>
                        <Cell large={1} medium={2} small={12}>
                            <div className={s.item}>
                                <NavLink to='/dialogs' activeClassName={s.selected}>
                                    Messages
                                </NavLink>
                            </div>
                        </Cell>
                        <Cell large={1} medium={2} small={12}>
                            <div className={s.item}>
                                <NavLink to='/users' activeClassName={s.selected}>
                                    Users
                                </NavLink>
                            </div>
                        </Cell>
                        {/* <Cell large={1} medium={2} small={12}>
                            <div className={s.item}>
                                <a>
                                    News
                                </a>
                            </div>
                        </Cell>
                        <Cell large={1} medium={2} small={12}>
                            <div className={s.item}>
                                <a>
                                    Music
                                </a>
                            </div>
                        </Cell>
                        <Cell large={1} medium={2} small={12}>
                            <div className={s.item}>
                                <a>
                                    Settings
                                </a>
                            </div>
                        </Cell> */}
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Navbar;