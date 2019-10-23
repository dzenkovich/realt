import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Dot from './Dot'

const useStyles = makeStyles({
  cluster: {
    position: 'relative',
    width: 10,
    height: 10,
    padding: 2,
    border: '1px solid grey',
    borderRadius: 5,
    cursor: 'pointer',
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
    fontSize: 10,
  },
})

const Cluster = ({ items, onClick }) => {
  const classes = useStyles()
  const dots = items.slice(0, 9)
  const left = items.length - dots.length

  return (
    <div className={classes.cluster + ' d' + dots.length} onClick={onClick}>
      {dots.map(item => <Dot key={item.id} item={item}/>)}
      {left > 0 && <div className={classes.left}> + {left}</div>}
    </div>
  )
}

Cluster.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Cluster
