import React from 'react';
import logo from './../../img/logo.svg';
import s from './login.module.css';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';

const LoginForm = (props) => {
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div className={s.loginBox}>
            <Form initialValues={{
                email: '',
                password: '',
                rememberMe: false
            }}
                onSubmit={values => {
                    props.login(values.email, values.password, values.rememberMe);
                }}
            >
                {({ handleSubmit }) => (
                    <form className={s.loginForm} onSubmit={handleSubmit}>
                        <div className={s.logo}>
                            <img src={logo} alt='logo' />
                        </div>
                        <div className={s.login}>
                            <Field
                                placeholder={'Email'}
                                id="email"
                                component={'input'}
                                name="email"
                                type="email"
                            />
                        </div>
                        <div className={s.password}>
                            <Field
                                placeholder={'Password'}
                                id="password"
                                component={'input'}
                                name="password"
                                type="password"
                            />
                        </div>
                        <div className={s.rememberMe}>
                            <Field
                                id="rememberMe"
                                component={'input'}
                                name="rememberMe"
                                type="checkbox"
                            /> remember me
                        </div>
                        <div className={s.loginButton}>
                            <button type="submit" ><p>Login</p></button>
                        </div>
                    </form>
                )}
            </Form>
        </div>
    )
}

const mapStateToPrors = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToPrors, { login })(LoginForm);