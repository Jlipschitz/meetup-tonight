import React, { Component } from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'

export default class Map extends Component {
  render() {
    return(
      <GoogleMapLoader
        containerElement={
          <div style={{height: '400px', width:'400px'}} />
        }
        googleMapElement={
          <GoogleMap
            defaultZoom={11}
            center={this.props.center}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              styles: [{
                stylers:
                [{ 'saturation': -100 },
                { 'gamma': 0.8 },
                { 'lightness': 4 },
                { 'visibility': 'on' }]
              }]
            }}
          >
            {
              this.props.markers.slice(0,30).map((item, i) => (
                <Marker
                  key={i}
                  position={{
                    lat: !item.venue ? item.group.lat : item.venue.lat,
                    lng: !item.venue ? item.group.lon : item.venue.lon
                  }}
                />
              ))
            }
          </GoogleMap>
        }
     />
    )
  }
}
