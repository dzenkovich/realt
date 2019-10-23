import React from 'react'
import { Button, Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

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
    display: 'flex',
    flexGrow: 1,
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexGrow: 1,
    '& li': {
      width: '15%',
    },
    '& li:first-child': {
      width: '25%',
    },
  },
  table: {
    width: '100%',
  },
}))

const FlatCard = ({ data }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardMedia image={data.images[0] && data.images[0].url} className={classes.media}/>
      <CardContent className={classes.content}>
        <ul className={classes.list}>
          <li><Typography variant="body">{data.address}</Typography></li>
          {
            data.type === 'sale' &&
            <>
              <li>${data.price}</li>
              <li>${data.priceMeter}m<sup>2</sup></li>
            </>
          }
          {
            data.type === 'rent' &&
            <li>${data.priceMonth}</li>
          }
          <li>{data.rooms}</li>
          <li>{data.area}m<sup>2</sup></li>
          <li><Button size="small" color="primary" сomponent="a" target="_blank"
                      href={'https://realt.by/sale/flats/object/' + data.flatId}>Перейти на Realt.by</Button></li>
        </ul>
      </CardContent>
    </Card>
  )
}

FlatCard.propTypes = {}

export default FlatCard
