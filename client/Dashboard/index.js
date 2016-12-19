// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import { connect } from 'react-redux';

// action creators
import { initializationRequests } from '../redux/actionCreators/initialize';
import { activeMeetupChange } from '../redux/actionCreators/events';

// components
import MeetupInfo from './MeetupInfo';
import Map from './Map';
import Search from './Search';

import './index.css';

@connect(store => ({
  searchInput: store.search,
  events: store.events,
  hover: store.hover,
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

  updateOnListHover = (markerIdentifier) => {
      this.props.dispatch(
        activeMeetupChange({
          listID: markerIdentifier
        })
      )
    }

  removeOnListHover = () => {
      this.props.dispatch(
        activeMeetupChange({
          listID: ''
        })
      )
  }

    scrollEvent = (el) => {
        scrollIntoViewIfNeeded(el, false, {
    duration: 150
   })
    }


  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })

      // quick and dirty way to update meetup list to user's location
      this.props.dispatch(initializationRequests());
    });
  }

  render() {
    var filtered;
    const { events, hover, searchInput} = this.props;

    if(searchInput[0]) {
      filtered = events && events.filter( (item) =>
        searchInput.some( term =>
          item.description ? item.description.includes(term) : item.name.includes(term)
        )
      );
    } else {
      filtered = events;
    }

    return (
      <div>
        <div className="event-container-list">
          <Search />
          <div className="event-list">
            <div className="event-list-really">
              {
                filtered.map(event =>
                  <div>
                  <MeetupInfo
                    className="event-list-item"
                    markerData={event}
                    key={event.id}
                    updateOnListHover={this.updateOnListHover}
                    removeOnListHover={this.removeOnListHover}
                    scrollEvent={event && hover && event.id === hover.eventID && this.scrollEvent}
                  />  
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <Map markers={filtered} center={this.state.location}/>
      </div>
    );
  }
}
