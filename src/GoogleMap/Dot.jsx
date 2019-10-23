import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { getSaleColor } from '../utils/mapUtils'

const useStyles = makeStyles({
  dot: {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 1,
    cursor: 'pointer',
  },
})

const Dot = ({ item, onClick }) => {
  const classes = useStyles()

  return (
    <div className={classes.dot}
         onClick={onClick}
         style={{ backgroundColor: getSaleColor(item.price) }}>
    </div>
  )
}

Dot.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default Dot
