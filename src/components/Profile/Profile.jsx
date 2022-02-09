import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
    return (
        <div>
            <div className={s.background}>
                <div className={s.center}>
                    <ProfileInfo isOwner={props.isOwner}
                        savePhoto={props.savePhoto}
                        profile={props.profile}
                        status={props.status}
                        updateStatus={props.updateStatus} />
                </div>
            </div>
            <MyPostsContainer />
        </div>
    );
}

export default Profile;