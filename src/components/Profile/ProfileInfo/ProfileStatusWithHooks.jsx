import React, { useState, useEffect } from 'react';
import s from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status] );

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
                <div className={s.status}>
                    <p onDoubleClick={activateEditMode}>{props.status || "-----"}</p>
                </div>
            }
            {editMode &&
                <div className={s.editStatus}>
                    <input autoFocus={true}
                        onBlur={deactivateEditMode}
                        onChange={onStatusChange}
                        value={status} />
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;