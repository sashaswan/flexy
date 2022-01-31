import React from 'react';
import s from './MyPosts.module.css';
import NewPost from './NewPost/NewPost';
import { Field, Form } from 'react-final-form';
import { required } from '../../common/validators';

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
    return (
        <Form
            initialValues={{
                newPost: '',
            }}
            onSubmit={values => {
                props.addPost(values.newPost)
            }}
        >
            {({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit} className={s.form}>

                    <Field name='newPost' validate={required}>
                        {({ input, meta }) => (
                            <div className={s.addPostInput}>
                                <input {...input} placeholder='New Post' type='text' className={s.input}/>
                                {meta.error && meta.touched && <p className={s.postreq}>{meta.error}</p>}
                            </div>
                        )}
                    </Field>
                    <button className={s.button} type='submit' disabled={submitting}>New Post</button>
                </form>
            )}
        </Form>
    )
}

export default MyPosts;