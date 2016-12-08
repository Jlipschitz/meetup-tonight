// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import BlogPost from './BlogPost';
import Map from './Map';

// action creators
import {} from '../../redux/actionCreators/events';

@connect(store => ({
  posts: store.events,
  userEmail: store.user && store.user.email
}))
export default class PostList extends Component {
  static propTypes = {
    // posts: PropTypes.arrayOf(PropTypes.shape({
    //   title: PropTypes.string.isRequired,
    //   body: PropTypes.string.isRequired,
    //   createdDate: PropTypes.string.isRequired,
    //   email: PropTypes.string,
    //   photo: PropTypes.string,
    //   google_link: PropTypes.string,
    //   facebook_link: PropTypes.string
    // })).isRequired,
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
    window.navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    });
  }

  render() {
    return (
      <div>
        <div className="event-container-list">
          <ul className="blog-post-list">
            {
          this.props.posts.map((post, index) =>
            <BlogPost
              post={post}
              index={index}
              key={post.id}
              userEmail={this.props.userEmail}
            />
              )
            }
         </ul>
      </div>
        <div className="event-map-list">
          <Map markers={this.props.posts || []} center={this.state.location}/>
        </div>
      </div>
    );
  }
}
