import React, { useState } from 'react';
import s from './../ProfileInfo/Edit.module.css';
import ProfileDataForm from './ProfileDataForm/ProfileDataForm';


const Edit = ({ profile, isOwner, saveProfile }) => {
    let [editMode, setEditMode] = useState(false);

    return (
        <div className={s.wrapper}>
            <p>Contacts</p>
            <div className={s.box}>
                {editMode
                    ? <ProfileDataForm profile={profile} saveProfile={saveProfile} goToSaveMode={() => { setEditMode(false) }} />
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />}
            </div>
        </div>
    )
}
export default Edit;

const ProfileData = ({ profile, isOwner, goToEditMode }) => {

    return (
        <div>
            {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
            <p>
                Looking for a job :
                <b className={s.text}>{profile.lookingForAJob ? "yes" : "no"}</b>
            </p>
            {profile.lookingForAJob &&
                <p>
                    My skills:<b className={s.text}>{profile.lookingForAJobDescription}</b>
                </p>}
            {isOwner &&
                <button onClick={goToEditMode} className={s.editButton}>
                    <p>Edit</p>
                </button>
            }
        </div>
    )
}

const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div>
            <p>{contactTitle} : <b className={s.text}>{contactValue}</b></p>
        </div>
    )
}