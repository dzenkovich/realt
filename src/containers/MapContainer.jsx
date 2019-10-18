import React from 'react';
import { connect } from 'react-redux';
import Map from '../components/Map'
import { updateBounds } from '../actions/mapActions'

const MapContainer = props => <Map {...props}/>

const mapStateToProps = state => ({
  points: state.map.points,
  zoom: state.map.zoom,
})

const mapDispatchToProps = {
  updateBounds,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
