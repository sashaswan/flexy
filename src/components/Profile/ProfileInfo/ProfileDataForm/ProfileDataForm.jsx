import React from 'react';
import { createField } from './../../../common/FormControls';
import s from './../../ProfileInfo/ProfileDataForm/ProfileDataForm.module.css';
import { Formik, Form } from 'formik';

const ProfileDataForm = ({ saveProfile, goToSaveMode, profile }) => {

    const onSubmit = (values, { setStatus }) => {
        saveProfile(values, setStatus)
            .then(() => {
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
                                <div className={s.socialInfo}>
                                    <p>{key}: {createField(key, 'contacts.' + key, 'text')}</p>
                                </div>
                            )
                        })}
                        <div className={s.socialInfo}>
                            <p>Full name</p> {createField('Full name', 'fullName', 'text')}
                            <p>My skills:</p>
                            {createField('My skills:', 'lookingForAJobDescription', 'text')}
                            <p>About me:</p>
                            {createField('About me:', 'aboutMe', 'text')}
                            <div className={s.lookingForAJob}>
                                {createField('null', 'lookingForAJob', 'checkbox', null, null, 'Looking for a job')}
                            </div>
                        </div>
                        <b className={s.req}>{status}</b>
                        <div>
                            <button type='submit' className={s.editButton}>
                                <p>Save</p>
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
export default ProfileDataForm;