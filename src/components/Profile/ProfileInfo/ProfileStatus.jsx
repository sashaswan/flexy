import React from 'react';
import s from './ProfileStatus.module.css';

class profileStatus extends React.Component {
    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        }) 
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        }) 
    }
    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div className={s.status}>
                        <p onDoubleClick={this.activateEditMode}>{this.props.status}</p>
                    </div>
                }
                {this.state.editMode &&
                    <div className={s.editStatus}>
                        <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status} />
                    </div>
                }
            </div>
        )
    }
}

export default profileStatus;