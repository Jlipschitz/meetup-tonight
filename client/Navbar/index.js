// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component } from 'react';
import { Link } from 'react-router';

// styling
import './index.css';

// components
import NavbarAuth from './NavbarAuth';


export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar-meetup">
        <li className="navbar-meetup-left">
          <Link
            className="navbar-brand"
            to=""
          >

            Meetup Tonight
          </Link>
        </li>
        <li className="navbar-meetup-center">
          <div className="profile-view-toggle">
            <Link
              className="nav-button profile-view-toggle-link"
              to="about"
            >
              ABOUT
            </Link>
          </div>
          <div className="profile-view-toggle">
            <Link
              className="nav-button profile-view-toggle-link"
              to=""
            >
              DASHBOARD
            </Link>
          </div>
        </li>
        <NavbarAuth className="navbar-meetup-right" />
      </nav>
    );
  }
}
