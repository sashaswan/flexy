import React from 'react';
import s from './Dialogs.module.css';
import Messages from './Messages/Messages';
import DialogsUsers from './DialogsUsers/DialogsUsers';
import button from './../../img/send.svg';

const Dialogs = (props) => {

    let state = props.messagesPage;

    let usersArray = state.dialogsData.map(u => <DialogsUsers name={u.name} key={u.id} id={u.id} />);

    let messagesArray = state.messagesData.map(m => <Messages message={m.message} key={m.id}/>);

    let newMessageText = state.newMessageText;

    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
    }  
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
                            <div className={s.flex}>
                                <input type='text' placeholder='Enter your message' value={newMessageText} onChange={onNewMessageChange}></input>
                                <button type='sumbit' onClick={onSendMessageClick}>
                                    <img src={button} alt='sendButton' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;