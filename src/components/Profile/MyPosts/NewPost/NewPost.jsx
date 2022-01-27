import React from 'react';
import s from './NewPost.module.css';
import avatar from './../../../../img/avatar.png';
import like from './../../../../img/like.png';

const NewPost = (props) => {
    return (
        <div>
            <div className={s.new}>
                <div className={s.postBlock}>
                    <div className={s.ava}>
                        <img src={avatar} alt='profilePicture' />
                    </div>
                    <p className={s.text}>
                        {props.text}
                    </p>
                    <div className={s.likes}>
                        <img src={like} alt='finger' />
                        <p className={s.likesCount}>
                            Likes Count: {props.likes}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPost;