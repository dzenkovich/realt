import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import Marker from '../GoogleMap/Marker'
import MapCanvas from '../GoogleMap/MapCanvas'
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../constants'

class Map extends PureComponent {
  static propTypes = {
    points: PropTypes.array.isRequired,
    pointsRent: PropTypes.array.isRequired,
    defaultCenter: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired,
    updateBounds: PropTypes.func.isRequired,
    showDetails: PropTypes.func.isRequired,
  }

  static defaultProps = {
    points: [],
    defaultCenter: DEFAULT_CENTER,
    defaultZoom: DEFAULT_ZOOM,
  }

  createMapOptions = () => {
    return {
      panControl: false,
      mapTypeControl: false,
    }
  }

  handleBoundsChange = data => {
    this.props.updateBounds(data)
  }

  render() {
    const { points, pointsRent, defaultCenter, zoom, showDetails } = this.props

    return <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyCVJ_4G85silDMaq9tlOz-mLGzGmc5ypII' }}
                           options={this.createMapOptions}
                           defaultCenter={defaultCenter}
                           onChange={this.handleBoundsChange}
                           zoom={zoom}>
      <MapCanvas points={pointsRent} zoom={zoom}/>
      {points.slice(0, 1000).map(point => <Marker key={point.items[0].id}
                                                  lat={point.lat}
                                                  lng={point.lng}
                                                  items={point.items}
                                                  showDetails={showDetails}/>)}
    </GoogleMapReact>

  }
}

export default Map
