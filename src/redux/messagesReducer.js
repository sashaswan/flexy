const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {

    dialogsData: [
        { id: 1, name: 'Dima' }
    ],

    messagesData: [
        { id: 1, message: 'It`s what we`ve all been waiting for: The James Webb Space Telescope will soon spread its primary mirror wings!' },
        { id: 2, message: 'This weeks Podium vehicle is the Coil Raiden worth $1,375,000!' },
        { id: 3, message: 'The latest Prize Ride Challenge vehicle is the Annis Euros worth $1,800,0000!' },
        { id: 4, message: 'Absolutely amazing video by #SpaceX! I dream of such a future and I am sure that it will become a reality! @elonmusk' }
    ]
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageText;
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 6, message: body }]
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageText) => ({
    type: SEND_MESSAGE,
    newMessageText
})

export default messagesReducer;