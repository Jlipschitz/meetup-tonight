import React, { Component } from 'react'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import moment from 'moment';

export default class Map extends Component {
  state = {
    activeMarkerId: null,
  }

  onMarkerClick = marker => {
    this.setState({
      activeMarkerId: marker.id
    });
  }

  onInfoCloseClick = () => {
    this.setState({
      activeMarkerId: null
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarkerId: null
      })
    }
  }
  render() {
    const activeMarkerData = this.state.activeMarkerId && this.props.markers.find(marker => marker.id === this.state.activeMarkerId);

    return (
      <GoogleMapLoader
        containerElement={
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-25vw',
            zIndex: 0,
            height: '100vh',
            width: '125vw'
          }} />
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
                  onClick={markerData => this.onMarkerClick(item, markerData)}
                  name={'Current location'}
                  key={i}
                  position={{
                    lat: !item.venue ? item.group.lat : item.venue.lat,
                    lng: !item.venue ? item.group.lon : item.venue.lon
                  }}
                  />
              ))
            }
            {
              activeMarkerData
              &&
              <InfoWindow
                marker={activeMarkerData}
                onCloseclick={this.onInfoCloseClick}
              >
                <div>
                  <a href={activeMarkerData.link}>
                    <h4>{activeMarkerData.name}</h4>
                  </a>
                    {
                      activeMarkerData.venue && activeMarkerData.venue.name &&
                      <p>{activeMarkerData.venue.name}</p>
                  }
                      <p>
                        {activeMarkerData.status}
                        {activeMarkerData.fee && `$${activeMarkerData.fee.amount}`}
                      </p>
                    <p>{activeMarkerData.venue.address_1}</p>
                      <p>{activeMarkerData.venue.city},&nbsp;
                         {activeMarkerData.venue.state}
                         {activeMarkerData.venue.zip}
                      </p>
                  <p>{moment(activeMarkerData.time).format('MMMM Do YYYY, h:mm a')}</p>
                </div>
              </InfoWindow>
            }
          </GoogleMap>
        }
        />
    )
  }
}
