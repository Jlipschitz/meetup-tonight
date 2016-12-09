// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { get } from 'lodash';

// styling
import './index.css';

// action creators
import {
  logoutRequest
} from '../../redux/actionCreators/user';


@connect((store) => ({
  user: store.user,
  currentRoute: store.routing.locationBeforeTransitions.pathname
}))
export default class NavAuth extends Component {
  static propTypes = {
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      createdDate: PropTypes.string,
      meetup: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        lat: PropTypes.string.isRequired,
        lon: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired
      })
    }),
    dispatch: PropTypes.func.isRequired
  }

  logout = () => {
    if(this.props.currentRoute !== '/') {
      this.props.dispatch(push('/'))
    }
    this.props.dispatch(logoutRequest());
  }

  loginOnEnterKey = e => e.keyCode === 13 && this.logIn();

  render() {
    const user = this.props.user;
    const loggedIn = !!get(user, '_id'); // if user has email property, they're logged in
    const authErrorMessage = get(user, 'authErrorMessage');

    return (
      <li className="navbar-auth">
        {/* {
          loggedIn
          &&
          <div className="nav-button">
            <Link
              className="profile-view-toggle"
              to="profile"
            >
              PROFILE
            </Link>
          </div>
        } */}
        <div
          className={`nav user-photo ${get(user, 'meetup.photo') && 'show'}`}
          style={get(user, 'meetup.photo') && {backgroundImage: `url(${user.meetup.photo})`}}
        />
        <div
          className="nav-button"
          onKeyDown={this.loginOnEnterKey}
        >
          {
            !loggedIn // check user ""
            &&
            <div>
              <a
                className="o-auth-btn"
                href="/auth/meetup"
              >
                SIGN IN / SIGN UP <i className="fa fa-meetup"/>
              </a>
            </div>
          }
          {
            false // hiding for now
            &&
            loggedIn
            &&
            <input
              className="nav-input"
              ref="email"
              placeholder="email"
              type="text"
            />
          }
          {
            loggedIn
            &&
            <a
              className="nav-button log-out-button"
              href="#"
              onClick={this.logout}
            >
              LOG OUT
            </a>
          }
        </div>
        {
          authErrorMessage
          &&
          <div className="auth-error">
            {authErrorMessage}
          </div>
        }
      </li>
    );
  }
}
