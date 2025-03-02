import React from 'react';
import logo from './../../img/logo.svg';
import s from './register.module.css';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { register } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
const RegisterForm = ({ isAuth, register }) => {
    if (isAuth) {
        return <Redirect to={'/profile'} />
    }

    const validationSchema = Yup.object().shape({
        login: Yup.string()
            .required('Username is required')
            .min(2, 'Username must be at least 2 characters'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password')
    });

    const onSubmit = (values, { setStatus, setSubmitting }) => {
        register(values.email, values.password, values.login)
            .then(() => {
                setStatus({ success: true });
            })
            .catch((error) => {
                setStatus(error.message || 'Registration failed');
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className={s.registerBox}>
            <Formik
                initialValues={{
                    email: '',
                    login: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched, status, isSubmitting, handleChange, handleBlur }) => (
                    <Form className={s.registerForm}>
                        <div className={s.logo}>
                            <img src={logo} alt='logo' />
                        </div>
                        <h2 className={s.title}>Create Account</h2>

                        <div className={s.formField}>
                            <Field
                                type="text"
                                name="login"
                                placeholder="Username"
                                className={errors.login && touched.login ? s.errorInput : ''}
                            />
                            {errors.login && touched.login &&
                                <p className={s.fieldError}>{errors.login}</p>}
                        </div>

                        <div className={s.formField}>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className={errors.email && touched.email ? s.errorInput : ''}
                            />
                            {errors.email && touched.email &&
                                <p className={s.fieldError}>{errors.email}</p>}
                        </div>

                        <div className={s.formField}>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Password"
                                className={errors.password && touched.password ? s.errorInput : ''}
                            />
                            {errors.password && touched.password &&
                                <p className={s.fieldError}>{errors.password}</p>}
                        </div>

                        <div className={s.formField}>
                            <Field
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className={errors.confirmPassword && touched.confirmPassword ? s.errorInput : ''}
                            />
                            {errors.confirmPassword && touched.confirmPassword &&
                                <p className={s.fieldError}>{errors.confirmPassword}</p>}
                        </div>

                        {status && typeof status === 'string' &&
                            <p className={s.formStatus}>{status}</p>}

                        <div className={s.submitButton}>
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </div>

                        <div className={s.loginLink}>
                            Already have an account? <NavLink to="/login">Login here</NavLink>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { register })(RegisterForm);