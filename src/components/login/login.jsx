import React from 'react';
import logo from './../../img/logo.svg';
import s from './login.module.css';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import { required } from '../common/validators';

const LoginForm = (props) => {
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <Login login={props.login} />
    )
}

const Login = (props) => {
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
                {({ handleSubmit, submitting }) => (
                    <form className={s.loginForm} onSubmit={handleSubmit}>
                        <div className={s.logo}>
                            <img src={logo} alt='logo' />
                        </div>
                        <div className={s.login}>
                            <Field name="email" validate={required} >
                                {({ input, meta }) => (
                                    <div>
                                        <input placeholder={'Email'} type="email" {...input} />
                                        {meta.error && meta.touched && <p className={s.loginReq}>{meta.error}</p>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className={s.password}>
                            <Field name="password" validate={required} >
                                {({ input, meta }) => (
                                    <div>
                                        <input placeholder={'Password'} type="password" {...input} />
                                        {meta.error && meta.touched && <p className={s.loginReq}>{meta.error}</p>}
                                    </div>
                                )}
                            </Field>
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
                            <button type="submit" disabled={submitting}><p>Login</p></button>
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