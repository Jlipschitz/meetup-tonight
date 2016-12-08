import React, { Component } from 'react'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

export default class Map extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {name: 'test'},
  }

  onMarkerClick = (props, marker, e) => {
    console.log(`marker is ---- ${marker}`)
    console.log(props)
    console.log(e)
    console.log(this.state)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
  componentDidMount() {
    console.log(this.state)
  }
  render() {
    return (
      <GoogleMapLoader
        containerElement={
          <div style={{ height: '400px', width: '400px' }} />
        }
        googleMapElement={
          <GoogleMap
            onClick={this.onMapClicked}
            defaultZoom={11}
            center={this.props.center}
            options={{
              streetViewControl: false,
              mapTypeControl: false
            }}
            >
            {
              this.props.markers.slice(0, 30).map((item, i) => (
                <Marker
                  onClick={this.onMarkerClick}
                  name={'Current location'}
                  key={i}
                  position={{
                    lat: !item.venue ? item.group.lat : item.venue.lat,
                    lng: !item.venue ? item.group.lon : item.venue.lon
                  }}
                  />
              ))
            }
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
            </InfoWindow>
          </GoogleMap>
        }
        />
    )
  }
}
