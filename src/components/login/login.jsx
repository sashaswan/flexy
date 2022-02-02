import React from 'react';
import logo from './../../img/logo.svg';
import s from './login.module.css';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import { validateEmail } from '../common/validators';

const LoginForm = (props) => {
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <Login login={props.login} />
    )
}

const Login = (props) => {
    const onSubmit = (values, { setSubmitting, setStatus }) => {
        props.login(values.email, values.password, values.rememberMe, setStatus)
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
                {({ errors, touched, isValidating, status }) => (
                    <Form className={s.loginForm}>
                        <div className={s.logo}>
                            <img src={logo} alt='logo' />
                        </div>
                        <div className={s.login}>
                            <Field id="email" name="email" placeholder={'Email'} type="email" validate={validateEmail} />
                            {errors.email && touched.email && <p className={s.loginReq}>{errors.email}</p>}
                        </div>
                        <div className={s.password}>
                            <Field id="password" name="password" placeholder={'Password'} type="password" />
                            <p className={s.loginReq}>{status}</p>
                        </div>
                        <div className={s.rememberMe}>
                            <Field id="rememberMe" name="rememberMe" type="checkbox" /> remember me
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