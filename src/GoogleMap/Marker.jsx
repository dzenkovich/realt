import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Paper, Popper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { getSaleColor } from '../utils/mapUtils'

const useStyles = makeStyles(theme => ({
  dot: {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 1,
    cursor: 'pointer',
  },
  cluster: {
    position: 'relative',
    width: 10,
    height: 10,
    padding: 2,
    border: '1px solid grey',
    borderRadius: 5,
    fontSize: 0,
    '&.d2': {
      width: 20,
    },
    '&.d3': {
      width: 30,
    },
    '&.d4': {
      width: 20,
      height: 20,
    },
    '&.d5': {
      width: 30,
      height: 20,
    },
    '&.d6': {
      width: 30,
      height: 20,
    },
    '&.d7': {
      width: 30,
      height: 30,
    },
    '&.d8': {
      width: 30,
      height: 30,
    },
    '&.d9': {
      width: 30,
      height: 30,
    },
  },
  left: {
    position: 'absolute',
    width: '100%',
    top: -15,
    fontSize: 10
  }
}))

const Cluster = ({ items }) => {
  const classes = useStyles()
  const dots = items.slice(0, 9)
  const left = items.length - dots.length

  return (
    <div className={classes.cluster + ' d' + dots.length}>
      {dots.map(item => <Dot key={item.id} item={item}/>)}
      {left > 0 && <div className={classes.left}> + {left}</div>}
    </div>
  )
}

const Dot = ({ item }) => {
  const classes = useStyles()
  const [over, setHover] = useState(false)
  const [anchor, setAnchor] = useState(false)
  const toggleOver = e => {
    setHover(!over)
    setAnchor(e.target)
  }

  return (
    <div className={classes.dot}
         onMouseOver={toggleOver}
         onMouseLeave={toggleOver}
         style={{ backgroundColor: getSaleColor(item.price) }}>
      {
        over &&
        <Popper open={true} anchorEl={anchor}>
          <Paper>
            <p>Rooms: {item.rooms}</p>
            <p>Price: ${item.price}</p>
          </Paper>
        </Popper>
      }
    </div>
  )
}

const Marker = ({ items, onClick }) => {
  return (
    <>
      {
        items.length > 1 ?
          <Cluster items={items}/>
          :
          <Dot item={items[0]}/>
      }
    </>
  )
}

Marker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  color: PropTypes.string,
}

Marker.defaultProps = {
  color: 'blue',
}

export default React.memo(Marker)
