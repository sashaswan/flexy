import React from 'react';
import s from './Dialogs.module.css';
import Messages from './Messages/Messages';
import DialogsUsers from './DialogsUsers/DialogsUsers';
import button from './../../img/send.svg';
import { Field, Form } from 'react-final-form';
import { required } from '../common/validators';

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
    return (
        <Form
            initialValues={{
                message: '',
            }}
            onSubmit={values => {
                props.sendMessage(values.message);
            }}
        >
            {({ handleSubmit }) => (
                <form className={s.flex} onSubmit={handleSubmit}>
                    <Field name='message' validate={required}>
                        {({ input, meta }) => (
                            <div className={s.addMessageInput}>
                                <input {...input} placeholder='Enter your message' type='text' />
                                <div className={s.requiredBox}>
                                    {meta.error && meta.touched && <p className={s.messageReq}>{meta.error}</p>}
                                </div>
                            </div>
                        )}
                    </Field>
                    <button type='submit'>
                        <img src={button} alt='sendButton' />
                    </button>
                </form>
            )}
        </Form>
    )
}

export default Dialogs;