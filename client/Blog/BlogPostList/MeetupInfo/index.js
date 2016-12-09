import React from 'react';
import moment from 'moment';
import { get } from 'lodash';


export default function MeetupInfo({ markerData }) {
  return (
    <div>
      <a href={markerData.link}>
        <h4>{markerData.name}</h4>
      </a>
      <p>
        Price:{markerData.fee && ` $${markerData.fee.amount}` || ` Free`}
      </p>
      {
        get(markerData, 'venue.name')
        &&
        <p>{markerData.venue.name}</p>
      }
      {
        get(markerData, 'venue.address_1')
        &&
        <p>{markerData.venue.address_1}</p>
      }
      {
        markerData.venue
        &&
        <p>
          {markerData.venue.city},&nbsp;
          {markerData.venue.state}
          {markerData.venue.zip}
        </p>
      }
      <p>{moment(markerData.time).format('MMMM Do YYYY, h:mm a')}</p>
    </div>
  );
}
