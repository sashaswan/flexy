import React from 'react';
import avatar from './../../../img/avatar.png'
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import Edit from './../ProfileInfo/Edit';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    if (!profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }
    return (
        <div>
            <div className={s.background}>
                <div className={s.center}>
                    <div className={s.ava}>
                        <img src={profile.photos.small != null ? profile.photos.small : avatar}
                            className={s.circle}
                            alt='profilePicture' />
                    </div>
                    <div className={s.description}>
                        <p className={s.name}>{profile.fullName}</p>
                        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                        <p className={s.aboutMe}>{profile.aboutMe}</p>
                        {isOwner &&
                            <div>
                                <input onChange={onMainPhotoSelected} type={'file'}
                                    id="FileUpload" className={s.inputfile} />
                                <label htmlFor="FileUpload" className={s.upload}>Upload Photo</label>
                            </div>}
                    </div>
                </div>
            </div>
            <Edit profile={profile} isOwner={isOwner} saveProfile={saveProfile} />
        </div>
    );
}

export default ProfileInfo;