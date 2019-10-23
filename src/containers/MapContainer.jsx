import React from 'react';
import { connect } from 'react-redux';
import Map from '../components/Map'
import { updateBounds, showDetails } from '../actions/mapActions'

const MapContainer = props => <Map {...props}/>

const mapStateToProps = state => ({
  points: state.map.points,
  pointsRent: state.map.pointsRent,
  zoom: state.map.zoom,
})

const mapDispatchToProps = {
  updateBounds,
  showDetails,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
