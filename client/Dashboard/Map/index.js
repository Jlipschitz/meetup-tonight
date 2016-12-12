import React, { Component } from 'react'
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import MeetupInfo from '../MeetupInfo';

// taken from: https://developers.google.com/maps/documentation/javascript/
const nightStylesObj = [
  {elementType: 'geometry', stylers: [{color: '#2E2E2E'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#2E2E2E'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#FF1177'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#FF1177'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#790048'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#790048'}]
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
    stylers: [{color: '#34001F'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#790048'}]
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
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "visibility": "simplified"
      }
    ]
  },
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
            left: '-35vw',
            zIndex: 0,
            height: '100vh',
            width: '135vw'
          }} />
        }
        googleMapElement={
          <GoogleMap
            onClick={this.onMapClicked}
            defaultZoom={12}
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
                position={{
                  lat: !activeMarkerData.venue ? activeMarkerData.group.lat : activeMarkerData.venue.lat,
                  lng: !activeMarkerData.venue ? activeMarkerData.group.lon : activeMarkerData.venue.lon
                }}
                options={{
                  pixelOffset: 40
                }}
              >
                <MeetupInfo markerData={activeMarkerData} />
              </InfoWindow>
            }
          </GoogleMap>
        }
        />
    )
  }
}
