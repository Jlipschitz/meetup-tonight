// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import BlogPost from './BlogPost';
import Map from './Map';

// action creators
import {} from '../../redux/actionCreators/events';

@connect(store => ({
  searchInput: store.search,
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
    var filtered;

    if(this.props.searchInput[0]) {
      filtered = this.props.posts && this.props.posts.filter( (item) =>
        this.props.searchInput.some( term =>
          item.description ? item.description.includes(term) : item.name.includes(term)
        )
      );
    } else {
      filtered = this.props.posts;
    }

    // item.description && item.description.includes(this.props.searchInput) || item.name.includes(this.props.searchInput)
    // );

    return (
      <div>
      <ul className="blog-post-list">
        {
          filtered.map((post, index) =>
            <BlogPost
              post={post}
              index={index}
              key={post.id}
              userEmail={this.props.userEmail}
            />
          )
        }
      </ul>
      <Map markers={filtered} center={this.state.location}/>
      </div>
    );
  }
}
