import React, { Component } from 'react';
import moment from 'moment';
import { get } from 'lodash';

import './index.css';

export default class MeetupInfo extends Component {
  componentDidUpdate() {
    this.props.scrollEvent && this.props.scrollEvent(this.refs.element)
  }

  render() {
    const { className, markerData, updateOnListHover, removeOnListHover } = this.props;
    return (
      <div className={`${className || ''} meetup-info`}
            onMouseEnter={e => updateOnListHover && updateOnListHover(markerData.id)}
            onMouseLeave={e => removeOnListHover && removeOnListHover()}
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
            <span className="meetup-info-item-tags"><i>Price:</i></span>{markerData.fee && ` $${markerData.fee.amount}` || ` Free!`}
          </p>
          {
            get(markerData, 'venue.name')
            &&
            <p className="meetup-info-item">
              <span className="meetup-info-item-tags"><i>Hosted by:</i></span>{` ${markerData.venue.name}`}
            </p>
          }
          <p className="meetup-info-item">
            {
              markerData.venue
              &&
              <span className="meetup-info-item-tags"><i>Located at:</i></span>
            }
            {get(markerData, 'venue.address_1') && ` ${markerData.venue.address_1},`}
            {
              markerData.venue
              &&
              ` ${markerData.venue.city}${markerData.venue.state ? `, ${markerData.venue.state}` : ''}${markerData.venue.zip ? ` ${markerData.venue.zip}` : ''}`
            }
          </p>
          <p className="meetup-info-item">
            <span className="meetup-info-item-tags"><i>Happening:</i></span>{` ${moment(markerData.time).format('MMMM Do YYYY, h:mm a')}`}
          </p>
        </div>
      </div>
    );
  }
}
