import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  table: {
    margin: 0,
    padding: 0,
    border: 'none',
    borderSpacing: 0,
    height: '100%',
  }
})

const ColorBar = ({ bars }) => {
  const classes = useStyles()

  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          {
            bars.map((bar, i) => <td key={i} style={{ backgroundColor: bar }}/>)
          }
        </tr>
      </tbody>
    </table>
  )
}

ColorBar.propTypes = {
  bars: PropTypes.array.isRequired
}

export default React.memo(ColorBar)
