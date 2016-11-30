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

  viewProfile = () => this.props.dispatch(push('/profile'))

  viewBlog = () => this.props.dispatch(push('/'))

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
    const viewingProfile = this.props.currentRoute === '/profile';

    return (
      <ul className="navbar-auth nav navbar-nav navbar-right">
        <li className="nav-button">
          <Link
            className="profile-view-toggle"
            to=""
          >
            BLOG
          </Link>
        </li>
        <li className="nav-button">
          <Link
            className="profile-view-toggle"
            to="about"
          >
            ABOUT
          </Link>
        </li>
        {
          loggedIn
          &&
          <li className="nav-button">
            <a
              className="profile-view-toggle"
              href="#"
              onClick={!viewingProfile ? this.viewProfile : this.viewBlog}
            >
              {`VIEW ${!viewingProfile ? 'PROFILE' : 'BLOG'}`}
            </a>
            <Link
              className="profile-view-toggle"
              to="profile"
            >
              PROFILE
            </Link>
          </li>
        }
        <li
          className={`nav user-photo ${get(user, 'meetup.photo') && 'show'}`}
          style={get(user, 'meetup.photo') && {backgroundImage: `url(${user.meetup.photo})`}}
        />
        <li
          className="nav-button"
          onKeyDown={this.loginOnEnterKey}
        >
          {
            (!loggedIn) // check user ""
            &&
            <span>
              {
                !get(user, 'meetup')
                &&
                <a href="/auth/meetup">
                  <i className="fa fa-meetup o-auth-btn"/>
                </a>
              }
              {
                loggedIn
                &&
                <input
                  className="nav-input"
                  ref="email"
                  placeholder="email"
                  type="text"
                />
              }
            </span>
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
        </li>
        {
          authErrorMessage
          &&
          <div className="auth-error">
            {authErrorMessage}
          </div>
        }
      </ul>
    );
  }
}
