import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';

// action creators
import {
  editSearchInput
} from '../../../redux/actionCreators/events';


@connect(store => ({
  searchInput: store.search,
}))

export default class Search extends Component {

  state = {
    searchTags:[]
  }
  //
  // editSearchInput = event => this.props.dispatch(
  //   editSearchInput({
  //     searchInput: event.target.value
  //   })
  // );
  //
  // onSearchChange = value => console.log(value)
  change = value => this.props.dispatch(
    editSearchInput({
      searchInput: value
    })
  )

  inputKeyEvents(e) {
    if (e.key === 'Enter') { // Enter pressed
      if (e.target.value.trim()) { // test if input is empty
        const updatedSearch = this.state.searchTags.concat(e.target.value.trim());
        // this.search(updatedSearch);
        this.change(updatedSearch);
        this.setState({ // add tag
          searchTags: updatedSearch// remove whitespace at the beginning and end of string
        });
        this.refs.search.value = '';
      }
    }
    if (!e.target.value && this.state.searchTags.length && e.key === 'Backspace') { // Backspace pressed
      this.removeTag(this.state.searchTags.length-1);
    }
  }
  removeTag(removalIndex) {
    const updatedSearch = this.state.searchTags.filter((val, index) => index !== removalIndex);
    // this.debouncedSearch(updatedSearch);
    this.change(updatedSearch);
    this.setState({
      searchTags: updatedSearch
    });
  }
  searchOnChange(e) {
    if (e.target.value.trim().length > 2 || e.key === 'Backspace') {
      // this.debouncedSearch(this.state.searchTags.concat(e.target.value.trim()));
      this.change(this.state.searchTags.concat(e.target.value.trim()));
    }
  }
  render() {
    return (
      <div className='search center-column-3'>
        <i className='search-icon vertical-center'/>
        <div className='search-input-container'>
          {
            this.state.searchTags.map((val, index) =>
              <div className='search-tag' key={index}>
                {val}
                <span className='close-icon' onClick={this.removeTag.bind(this, index)}>
                  x
                </span>
              </div>
            )
          }
          <input data-id='Search'
                 ref='search'
                 className='search-input'
                 type='text'
                 placeholder='Search...'
                 onKeyUp={::this.searchOnChange}
                 onKeyDown={::this.inputKeyEvents}/>
        </div>
      </div>
    );
  }
}
