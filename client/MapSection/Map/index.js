import React, { Component } from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'
import { connect } from 'react-redux'

@connect(store => ({
  posts: store.events,
  userEmail: store.user && store.user.email
}))
export default class Map extends Component {
  render() {
    const mapContainer = <div style={{height: '100%', width:'100%'}}></div>
    // const markers = this.props.posts.slice(0,10).map((post, i) => {
    //   let marker = {
    //     position: {
    //       lat: !post.venue ? post.group.lat : post.venue.lat,
    //       lng: !post.venue ? post.group.lon : post.venue.lon
    //     }
    //   }
    //   return <Marker key={i} {...marker} />
    // })

    return(
      <GoogleMapLoader
        containerElement={mapContainer}
        googleMapElement={
          <GoogleMap
            defaultZoom={15}
            center={{ lat: 40.75, lng: -73.98 }}
            options={{streetViewControl: false, mapTypeControl: false}}
            >
            {/* { markers } */}
            <Marker key={0kzjfksj993} position={{ lat: 40.75, lng: -73.98 }} />
          </GoogleMap>
        }
     />
    )
  }
}
