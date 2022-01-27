import MyPosts from './MyPosts';
import { updateNewPostTextActionCreator, addPostActionCreator } from '../../../redux/profileReducer';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
    return {
        postText: state.profilePage.postText,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action);
        },
        addPost: () => {
            dispatch(addPostActionCreator());
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;