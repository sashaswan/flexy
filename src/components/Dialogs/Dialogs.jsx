import React from 'react';
import s from './Dialogs.module.css';
import Messages from './Messages/Messages';
import DialogsUsers from './DialogsUsers/DialogsUsers';
import button from './../../img/send.svg';
import { Formik, Field, Form } from 'formik';
import { validatePost } from '../common/validators';

const Dialogs = (props) => {

    let state = props.messagesPage;

    let usersArray = state.dialogsData.map(u => <DialogsUsers name={u.name} key={u.id} id={u.id} />);

    let messagesArray = state.messagesData.map(m => <Messages message={m.message} key={m.id} />);

    return (
        <div>
            <div className={s.box}>
                <div className={s.left}>
                    {usersArray}
                </div>
                <div className={s.right}>
                    <div className={s.stick}>
                        <div className={s.topBox}>
                            <div className={s.insideBox}>
                                <p className={s.name}>Dima</p>
                                <p className={s.info}>Online now</p>
                            </div>
                        </div>
                    </div>
                    {messagesArray}
                    <div className={s.send}>
                        <div className={s.form}>
                            <AddNewMessageBody sendMessage={props.sendMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const AddNewMessageBody = (props) => {
    const onSubmit = (values) => {
        props.sendMessage(values.message);
    };
    return (
        <Formik
            initialValues={{
                message: '',
            }}
            validationSchema={validatePost}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <Form className={s.flex} >
                    <div className={s.addMessageInput}>
                        <Field name='message' placeholder='Enter your message' type='text' />
                        <div className={s.requiredBox}>
                            {errors.message && touched.message ? (<p className={s.messageReq}>{errors.message}</p>) : null}
                        </div>
                    </div>
                    <button type='submit'>
                        <img src={button} alt='sendButton' />
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default Dialogs;