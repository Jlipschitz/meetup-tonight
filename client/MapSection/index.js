import React, { Component } from 'react'

import Map from './Map'

export default class MapSection extends Component {
  render() {
    return (
      <div style={{width:300, height:600, background:'red'}}>
        <Map />
      </div>
    )
  }
}
