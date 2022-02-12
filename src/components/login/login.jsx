import React from 'react';
import logo from './../../img/logo.svg';
import s from './login.module.css';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import { validateEmail, createField } from '../common/FormControls';
import Cookies from 'js-cookie';

const LoginForm = (props) => {
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <Login login={props.login} captchaUrl={props.captchaUrl} />
    )
}

const Login = ({ login, captchaUrl }) => {
    const onSubmit = (values, { setStatus }) => {
        Cookies.set('values.email')
        login(values.email, values.password, values.rememberMe, setStatus, values.captcha)
    };
    return (
        <div className={s.loginBox}>
            <Formik initialValues={{
                email: '',
                password: '',
                rememberMe: false,
                captcha: ''
            }}
                onSubmit={onSubmit}
            >
                {({ errors, touched, status }) => (
                    <Form className={s.loginForm}>
                        <div className={s.logo}>
                            <img src={logo} alt='logo' />
                        </div>
                        <div className={s.login}>
                            {createField("Email", "email", 'email', validateEmail)}
                            {errors.email && touched.email && <p className={s.loginReq}>{errors.email}</p>}
                        </div>
                        <div className={s.password}>
                            {createField("Password", "password", 'password')}
                            <p className={s.loginReq}>{status}</p>
                        </div>
                        <div className={s.rememberMe}>
                            {createField(null, "rememberMe", 'checkbox', null, null, 'remember me')}
                        </div>
                        <div className={s.captchaBlock}>
                            {captchaUrl && <img src={captchaUrl} alt='captcha' />}
                            {captchaUrl && createField("Symbols from image", "captcha", 'text')}
                        </div>

                        <div className={s.loginButton}>
                            <button type="submit" ><p>Login</p></button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

const mapStateToPrors = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToPrors, { login })(LoginForm);