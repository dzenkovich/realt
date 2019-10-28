import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardContent, CardMedia, Input, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { calculateROI } from '../utils'

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    height: 100,
  },
  media: {
    width: 150,
  },
  content: {
    flexGrow: 1,
  },
  list: {
    width: '100%',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
    '& li': {
      flexGrow: 1,
    },
  },
  right: {
    textAlign: 'right',
  },
  input: {
    width: 50
  },
  table: {
    width: '100%',
  },
}))

const FlatCard = ({ data, rentMedian }) => {
  const classes = useStyles()
  const [rent, setRent] = useState(rentMedian)
  const [ROI, setROI] = useState(calculateROI(data.price, rentMedian))
  const handleRentChange = e => {
    const {value} = e.target
    setRent(value)
    setROI(calculateROI(data.price, value))
  }

  return (
    <Card className={classes.card}>
      <CardMedia image={data.images[0] && data.images[0].url} className={classes.media}/>
      <CardContent className={classes.content}>
        <ul className={classes.list}>
          <li><Typography variant="body">{data.address}</Typography></li>
          <li>{data.finishing}</li>
          <li className={classes.right}><Button size="small" color="primary" сomponent="a" target="_blank"
                      href={'https://realt.by/sale/flats/object/' + data.flatId}>Перейти на Realt.by</Button></li>
        </ul>
        <ul className={classes.list}>
          {
            data.type === 'sale' &&
            <>
              <li>${data.price}</li>
              <li>${data.priceMeter}m<sup>2</sup></li>
              <li>
                {ROI}% по <Input value={rent} onChange={handleRentChange} className={classes.input}/> мес
              </li>
            </>
          }
          {
            data.type === 'rent' &&
            <li>${data.priceMonth}</li>
          }
          <li>{data.rooms}</li>
          <li>{data.area}m<sup>2</sup></li>
          <li>{data.yearBuilt} г.</li>
        </ul>
      </CardContent>
    </Card>
  )
}

FlatCard.propTypes = {
  data: PropTypes.object.isRequired,
  rentMedian: PropTypes.number.isRequired,
}

export default FlatCard
