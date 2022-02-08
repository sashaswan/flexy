import React, { Component } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import { Route, withRouter } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/login/login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className="App">
        <div className='wrapper'>
          <HeaderContainer />
          <Route path='/profile/:userId?'
            render={withSuspense(ProfileContainer)} />
          <Route path='/dialogs'
            render={withSuspense(DialogsContainer)} />
          <Route path='/users'
            render={() => <UsersContainer />} />
          <Route path='/login'
            render={() => <Login />} />
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);
