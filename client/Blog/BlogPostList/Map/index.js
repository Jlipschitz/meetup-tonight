import React, { Component } from 'react'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import moment from 'moment';

// taken from: https://developers.google.com/maps/documentation/javascript/
const nightStylesObj = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#FF1177'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#FF1177'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#FF1177'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}]
  }
];


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
              styles: nightStylesObj,
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
