import React from 'react';
import s from './MyPosts.module.css';
import NewPost from './NewPost/NewPost';

const MyPosts = (props) => {

    let postArray = props.postText.map(n => (<NewPost text={n.text} likes={n.likes} key={n.id}/>));

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div>
            <div className={s.box}>
                <p className={s.title}>My Posts</p>
                <div className={s.form}>
                    <input type='text' placeholder='New Post' className={s.input} ref={newPostElement} onChange={onPostChange} value={props.newPostText}></input>
                    <button className={s.button} onClick={onAddPost}>New Post</button>
                </div>
                {postArray}
            </div>
        </div>
    );
}

export default MyPosts;