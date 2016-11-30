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
      <header>
        <div className="container-fluid">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-brand">
                Meetup Tonight
              </div>
              <ul className="nav navbar-nav nav-left">
                <li>
                  <Link
                    className="profile-view-toggle"
                    to="about"
                  >
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link
                    className="profile-view-toggle"
                    to=""
                  >
                    DASHBOARD
                  </Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <NavbarAuth />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}
