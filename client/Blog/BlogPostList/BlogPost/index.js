// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component } from 'react';

// Converts javascript date object to 2-digit slashes date format
import prettyDate from '../../../utils/prettyDate';


export default class BlogPost extends Component {

  render() {
    return (
      <li className="blog-post">
        <h3 className="blog-title">
          {this.props.post.name}
        </h3>
        <p className="blog-body">
          {this.props.post.description}
        </p>
        <p className="blog-body">
          {this.props.post.link}
        </p>
        <p className="blog-body">
          {!this.props.post.venue ? 'lat/lng: ' + this.props.post.group.lat + ', ' + this.props.post.group.lon : 'lat/lng: ' + this.props.post.venue.lat  + ', ' + this.props.post.venue.lon}
        </p>
        <p className="blog-created-date">
          {prettyDate(this.props.post.time)}
        </p>
      </li>
    );
  }
}
