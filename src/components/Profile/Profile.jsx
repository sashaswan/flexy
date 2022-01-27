import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
    return (
        <div> 
            <div className={s.background}>
                <div className={s.center}>
                    <ProfileInfo profile={props.profile}/>
                </div>
            </div>
            <MyPostsContainer />
        </div>
    );
}

export default Profile;