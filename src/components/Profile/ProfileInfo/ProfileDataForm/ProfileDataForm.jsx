import React from 'react';
import { createField } from './../../../common/FormControls';
import s from './../../ProfileInfo/Edit.module.css';
import { Formik, Form } from 'formik';

const ProfileDataForm = ({ saveProfile, goToSaveMode, profile }) => {

    // const onSubmit = (values, { setStatus }) => {
    //     saveProfile(values, setStatus)
    //     .then(() => {
    //         return goToSaveMode();
    //     })
    // }}

    const onSubmit = (values, {setStatus}) => {
        saveProfile(values, setStatus)
        .then(() =>{
            goToSaveMode();
        })
    }

    return (
        <Formik initialValues={{
            fullName: profile.fullName,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            aboutMe: profile.aboutMe,
            lookingForAJob: profile.lookingForAJob,
            contacts: profile.contacts
        }}
        onSubmit={onSubmit}
        >
            {({ status }) => (
            <Form>
                <div>
                    {Object.keys(profile.contacts).map(key => {
                        return (
                            <div>
                                <p>{key}: {createField(key, 'contacts.' + key, 'text')}</p>
                            </div>
                        )
                    })}
                    <p>Full name</p> {createField('Full name', 'fullName', 'text')}
                    <p>My skills:</p>
                    {createField('My skills:', 'lookingForAJobDescription', 'text')}
                    <p>About me:</p>
                    {createField('About me:', 'aboutMe', 'text')}
                    {createField('null', 'lookingForAJob', 'checkbox', null, null, 'Looking for a job')}
                    <p className={s.loginReq}>{status}</p>
                    <button type='submit' className={s.editButton}>
                        <p>Save</p>
                    </button>
                </div>
            </Form>
            )}
        </Formik>
    )
}
export default ProfileDataForm;