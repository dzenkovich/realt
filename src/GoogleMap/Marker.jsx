import React from 'react'
import PropTypes from 'prop-types'
import Dot from './Dot'
import Cluster from './Cluster'

const Marker = ({ items, lat, lng, showDetails }) => {
  const handleDetails = () => showDetails({items, lat, lng})

  return (
    <>
      {
        items.length > 1 ?
          <Cluster items={items} onClick={handleDetails}/>
          :
          <Dot item={items[0]} onClick={handleDetails}/>
      }
    </>
  )
}

Marker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  showDetails: PropTypes.func.isRequired,
}

export default React.memo(Marker)
