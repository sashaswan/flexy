import React from 'react';
import avatar from './../../../img/avatar.png'
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const profileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.ava}>
                <img src={props.profile.photos.small != null ? props.profile.photos.small : avatar} alt='profilePicture'/>
            </div>
            <div className={s.description}>
                <p className={s.name}>{props.profile.fullName}</p>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                <p className={s.aboutMe}>{props.profile.aboutMe}</p>
                <p className={s.job}>{props.profile.lookingForAJobDescription}</p>
            </div>
        </div>
    );
}

export default profileInfo;