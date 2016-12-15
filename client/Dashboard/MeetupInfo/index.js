import React, { Component } from 'react';
import moment from 'moment';
import { get } from 'lodash';

import './index.css';

export default class MeetupInfo extends Component {
  componentDidUpdate() {
    this.props.scrollEvent && this.props.scrollEvent(this.refs.element)
  }

  render() {
    const { className, markerData, updateOnListHover } = this.props;
    return (
      <div className={`${className || ''} meetup-info`}
            onMouseEnter={e => updateOnListHover && updateOnListHover(markerData.id)}
            ref="element"
      >
        <a
          className="meetup-image"
          href={markerData.link}
          style={markerData.image && {backgroundImage: `url('${markerData.image}')`}}
        />
        <div className="meetup-content">
          <a
            className="meetup-link"
            href={markerData.link}
          >
            {markerData.name}
          </a>
          <p className="meetup-info-item">
            <i>Price:</i>{markerData.fee && ` $${markerData.fee.amount}` || ` Free!`}
          </p>
          {
            get(markerData, 'venue.name')
            &&
            <p className="meetup-info-item">
              <i>Hosted by:</i>{` ${markerData.venue.name}`}
            </p>
          }
          <p className="meetup-info-item">
            {
              markerData.venue
              &&
              <i>Located at:</i>
            }
            {get(markerData, 'venue.address_1') && ` ${markerData.venue.address_1},`}
            {
              markerData.venue
              &&
              ` ${markerData.venue.city}${markerData.venue.state ? `, ${markerData.venue.state}` : ''}${markerData.venue.zip ? ` ${markerData.venue.zip}` : ''}`
            }
          </p>
          <p className="meetup-info-item">
            <i>Happening:</i>{` ${moment(markerData.time).format('MMMM Do YYYY, h:mm a')}`}
          </p>
        </div>
      </div>
    );
  }
}
