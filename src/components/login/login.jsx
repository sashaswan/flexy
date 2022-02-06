import React from 'react';
import logo from './../../img/logo.svg';
import s from './login.module.css';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import { validateEmail, createField } from '../common/FormControls';

const LoginForm = (props) => {
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <Login login={props.login} />
    )
}

const Login = ({ login }) => {
    const onSubmit = (values, { setSubmitting, setStatus }) => {
        login(values.email, values.password, values.rememberMe, setStatus)
        setSubmitting(false)
    };
    return (
        <div className={s.loginBox}>
            <Formik initialValues={{
                email: '',
                password: '',
                rememberMe: false
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
    isAuth: state.auth.isAuth
})

export default connect(mapStateToPrors, { login })(LoginForm);