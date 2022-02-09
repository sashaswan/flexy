import React from 'react';
import avatar from './../../../img/avatar.png'
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const profileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }
    return (
        <div>
            <div className={s.ava}>
                <img src={profile.photos.small != null ? profile.photos.small : avatar} 
                className={s.circle}
                alt='profilePicture'/>
            </div>
            <div className={s.description}>
                <p className={s.name}>{profile.fullName}</p>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <p className={s.aboutMe}>{profile.aboutMe}</p>
                <p className={s.job}>{profile.lookingForAJobDescription}</p>
                {isOwner && <input onChange={onMainPhotoSelected} type={'file'}/>}
            </div>
        </div>
    );
}

export default profileInfo;