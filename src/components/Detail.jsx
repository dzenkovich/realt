import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import { withStyles } from '@material-ui/styles'
import FlatCard from './FlatCard'
import ColorBar from './ColorBar'
import { getRentColor, getSaleColor } from '../utils/mapUtils'

const styles = theme => ({
  tab: {
    display: 'flex',
    alignItems: 'center',
    '& table': {
      height: theme.spacing(2),
      marginLeft: theme.spacing(2)
    },
    '& td': {
      width: 7
    }
  },
})

const tabProps = ind => ({ id: 'detail-tab-' + ind })

class Detail extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    saleIds: PropTypes.array.isRequired,
    rentIds: PropTypes.array.isRequired,
    sale: PropTypes.array.isRequired,
    rent: PropTypes.array.isRequired,
    rentMedian: PropTypes.number.isRequired,
    closeDetail: PropTypes.func.isRequired,
    loadSale: PropTypes.func.isRequired,
    loadRent: PropTypes.func.isRequired,
  }

  state = {
    value: 0,
    saleColorBars: [],
    rentColorBars: [],
  }

  componentDidMount() {
    this.setState({ value: 0 })
  }

  componentDidUpdate(oldProps) {
    const { saleIds, rentIds, sale, rent } = this.props
    if (oldProps.saleIds !== saleIds) {
      // TODO add loading spinner
      this.props.loadSale({ids: saleIds})
    }
    if (oldProps.rentIds !== rentIds) {
      // TODO add loading spinner
      this.props.loadRent({ids: rentIds})
    }
    if (oldProps.sale !== sale) {
      this.setState({
        saleColorBars: sale.map(flat => getSaleColor(flat.price)),
      })
    }
    if (oldProps.rent !== rent) {
      this.setState({
        rentColorBars: rent.map(flat => getRentColor(flat.priceMonth)),
      })
    }
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { open, sale, rent, rentMedian, closeDetail, classes } = this.props
    const { value, saleColorBars, rentColorBars } = this.state

    return (
      <>
        {
          open &&
          <Dialog open={true} fullWidth={true} maxWidth="lg">
            <DialogTitle>Детали</DialogTitle>
            <DialogContent>
              <Tabs value={value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
              >
                <Tab label={<div className={classes.tab}>Sale: {sale.length} <ColorBar bars={saleColorBars}/></div>}
                     {...tabProps(0)} />
                <Tab label={<div className={classes.tab}>Rent: {rent.length} <ColorBar bars={rentColorBars}/></div>}
                     {...tabProps(0)} />
              </Tabs>
              <SwipeableViews axis="x" index={value} onChangeIndex={this.handleChangeIndex}>
                <Box value={value} index={0}>
                  {
                    sale.map(flat => <FlatCard key={flat.flatId} data={flat} rentMedian={rentMedian} />)
                  }
                </Box>
                <Box value={value} index={1}>
                  {
                    rent.map(flat => <FlatCard key={flat.flatId} data={flat}/>)
                  }
                </Box>
              </SwipeableViews>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" color="primary" onClick={closeDetail}>Закрыть</Button>
            </DialogActions>
          </Dialog>
        }
      </>
    )
  }
}

export default withStyles(styles)(Detail)
