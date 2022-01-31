import MyPosts from './MyPosts';
import { addPostActionCreator } from '../../../redux/profileReducer';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
    return {
        postText: state.profilePage.postText,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;