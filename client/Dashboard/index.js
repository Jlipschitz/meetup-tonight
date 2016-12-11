// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import MeetupInfo from './MeetupInfo';
import Map from './Map';
import Search from './Search';

import './index.css';

@connect(store => ({
  searchInput: store.search,
  events: store.events,
  userEmail: store.user && store.user.email
}))
export default class Dashboard extends Component {
  static propTypes = {
    userEmail: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    location: {
      lat: 40.75,
      lng: -73.98
    }
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    });
  }

  render() {
    var filtered;

    if(this.props.searchInput[0]) {
      filtered = this.props.events && this.props.events.filter( (item) =>
        this.props.searchInput.some( term =>
          item.description ? item.description.includes(term) : item.name.includes(term)
        )
      );
    } else {
      filtered = this.props.events;
    }

    return (
      <div>
        <div className="event-container-list">
          <Search />
          <div className="event-list">
            <div className="event-list-really">
              {
                filtered.map(event =>
                  <MeetupInfo
                    className="event-list-item"
                    markerData={event}
                    key={event.id}
                  />
                )
              }
            </div>
          </div>
        </div>
        <Map markers={filtered} center={this.state.location} />
      </div>
    );
  }
}
