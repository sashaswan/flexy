import { profileAPI, usersAPI } from '../api/api';
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

let initialState = {
    profile: null,
    status: '',
    userData: [
        { id: 1, name: 'Sasha Swan', location: 'Lviv, Ukraine', date: '17.01.2001' }
    ],

    postText: [
        {
            id: 1,
            text: 'There are almost 120,000 repositories on GitHub. Here are seven of the best ones for dynamic languages like JavaScript you should check out right now.',
            likes: 1
        }
    ],
    newPostText: 'flexy.com'
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                text: state.newPostText,
                likes: 0
            };
            return {
                ...state,
                postText: [...state.postText, newPost],
                newPostText: '',
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText,
            }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({
    type: ADD_POST
})

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT, newText: text
})

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE, profile
})

export const setStatus = (status) => ({
    type: SET_STATUS, status
})

export const getUserProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data));
        });
    }
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data));
        });
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
}

export default profileReducer;