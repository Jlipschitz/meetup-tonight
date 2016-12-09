// Component here uses ES6 destructuring syntax in import, what is means is "retrieve the property 'Component' off of the object exported from the 'react'"
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Search from './chips';

// styling
import './index.css';

// action creators
import {
  editSearchInput
  // updatePostRequest,
} from '../../redux/actionCreators/events';


@connect(store => ({
  searchInput: store.search,
  // userInfo: {
  //   email: store.user && store.user.email,
  //   photo: store.user && ((store.user.facebook && store.user.facebook.photo) || (store.user.google && store.user.google.photo)),
  //   facebook_link: store.user && store.user.facebook && store.user.facebook.facebook_link,
  //   google_link: store.user && store.user.google && store.user.google.google_link
  // }
}))
export default class PostForm extends Component {
  editSearchInput = event => this.props.dispatch(
    editSearchInput({
      searchInput: event.target.value
    })
  );

  onSearchChange = value => console.log(value)

  render() {
    return (
      <li className="blog-add-post">
        <input
          className="blog-add-post-title"
          type="text"
          placeholder="keyword"
          onChange={this.editSearchInput}
          value={this.props.searchInput}
        />
        <Search change={this.onSearchChange}/>
      </li>

    );
  }
}
