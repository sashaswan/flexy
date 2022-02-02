import React from 'react';
import s from './MyPosts.module.css';
import NewPost from './NewPost/NewPost';
import { Formik, Field, Form } from 'formik';
import { validatePost } from '../../common/validators';

const MyPosts = (props) => {

    let postArray = props.postText.map(n => (<NewPost text={n.text} likes={n.likes} key={n.id} />));

    return (
        <div>
            <div className={s.box}>
                <p className={s.title}>My Posts</p>
                <AddNewPostText addPost={props.addPost} />
                {postArray}
            </div>
        </div>
    );
}

const AddNewPostText = (props) => {
    const onSubmit = (values) => {
        props.addPost(values.newPost)
    };
    return (
        <Formik
            initialValues={{
                newPost: '',
            }}
            validationSchema={validatePost}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <Form className={s.form}>
                    <div className={s.addPostInput}>
                        <Field name='newPost' placeholder='New Post' type='text' className={s.input} />
                        {errors.newPost && touched.newPost ? (<p className={s.postreq}>{errors.newPost}</p>) : null}
                    </div>
                    <button className={s.button} type='submit'>New Post</button>
                </Form>
            )}
        </Formik >
    )
}

export default MyPosts;