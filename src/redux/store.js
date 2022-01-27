import profileReducer from './profileReducer';
import messagesReducer from './messagesReducer';

let store = {
  _state: {

    profilePage: {

      userData: [
        { id: 1, name: 'Sasha Swan', location: 'Lviv, Ukraine', date: '17.01.2001' }
      ]

      postText: [
        {
          text: 'There are almost 120,000 repositories on GitHub. Here are seven of the best ones for dynamic languages like JavaScript you should check out right now.',
          likes: 1
        }
      ],
      newPostText: ''
    },
    messagesPage: {

      dialogsData: [
        { id: 1, name: 'Dima' }
      ],

      messagesData: [
        { message: 'It`s what we`ve all been waiting for: The James Webb Space Telescope will soon spread its primary mirror wings!' },
        { message: 'This weeks Podium vehicle is the Coil Raiden worth $1,375,000!' },
        { message: 'The latest Prize Ride Challenge vehicle is the Annis Euros worth $1,800,0000!' }
      ],
      newMessageText: ''
    },

  },
  _callSubscriber() {
    console.log('state changed');
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = messagesReducer(this._state.messagesPage, action);

    this._callSubscriber(this._state);
  }
}

export default store;
window.store = store;


