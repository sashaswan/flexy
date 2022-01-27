const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

let initialState = {

    dialogsData: [
        { id: 1, name: 'Dima' }
    ],

    messagesData: [
        { id: 1, message: 'It`s what we`ve all been waiting for: The James Webb Space Telescope will soon spread its primary mirror wings!' },
        { id: 2, message: 'This weeks Podium vehicle is the Coil Raiden worth $1,375,000!' },
        { id: 3, message: 'The latest Prize Ride Challenge vehicle is the Annis Euros worth $1,800,0000!' }
    ],
    newMessageText: 'flexy'
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageText: action.body
            }
        case SEND_MESSAGE:
            let body = state.newMessageText;
            return {
                ...state,
                newMessageText: '',
                messagesData: [...state.messagesData, { id: 6, message: body }]
            };
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({
    type: SEND_MESSAGE
})

export const updateNewMessageBodyCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY, body: body
})

export default messagesReducer;