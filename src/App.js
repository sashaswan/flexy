import React from 'react';
import './App.css';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Footer from './components/Footer/Footer';
import { Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/login/login';


const App = () => {
  return (
    <div className="App">
      <HeaderContainer />
      <Route path='/profile/:userId?'
        render={() => <ProfileContainer />} />
      <Route path='/dialogs'
        render={() => <DialogsContainer />} />
      <Route path='/users'
        render={() => <UsersContainer />} />
      <Route path='/login'
        render={() => <LoginPage />} />
      <Footer />
    </div>
  );
}
export default App;