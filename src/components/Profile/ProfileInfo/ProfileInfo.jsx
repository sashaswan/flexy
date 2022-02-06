import React from 'react';
import avatar from './../../../img/avatar.png'
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const profileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.ava}>
                <img src={profile.photos.small != null ? profile.photos.small : avatar} alt='profilePicture'/>
            </div>
            <div className={s.description}>
                <p className={s.name}>{profile.fullName}</p>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <p className={s.aboutMe}>{profile.aboutMe}</p>
                <p className={s.job}>{profile.lookingForAJobDescription}</p>
            </div>
        </div>
    );
}

export default profileInfo;