// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React from 'react';
import MeetupInfo from '../MeetupInfo';

import './index.css';


export default function BlogPost({ post }) {
  return (
    <li className="blog-post">
      <MeetupInfo markerData={post} />
    </li>
  );
}
