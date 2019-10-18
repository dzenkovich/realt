import React, { Component } from 'react'
import { Checkbox, FormControlLabel, FormGroup, Slider, Switch, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import PropTypes from 'prop-types'

const thousands = num => Math.round(num / 1000)

const makeMarks = data => data.map(item => ({ value: item, label: item }))

const priceMarks = makeMarks([50, 100, 150, 200, 250, 300, 350])
const priceMeterMarks = makeMarks([500, 1000, 1500, 2000, 2500, 3000, 3500])
const areaMarks = makeMarks([30, 60, 90, 120, 150, 180, 210])

const styles = theme => ({
  formGroup: {
    marginBottom: theme.spacing(2)
  }
})

class Filter extends Component {
  static propTypes = {
    filter: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
  }

  _parseFilterToValues = filter => {
    return {
      rooms: filter.rooms || [1, 2, 3],
      priceOn: !!filter.price,
      price: filter.price ? [thousands(filter.price.gt) || 50, thousands(filter.price.lt) || 150] : [50, 150],
      priceMeterOn: !!filter.priceMeter,
      priceMeter: filter.priceMeter ? [filter.priceMeter.gt || 500, filter.priceMeter.lt || 2000] : [500, 2000],
      areaOn: !!filter.area,
      area: filter.area ? [filter.area.gt || 30, filter.area.lt || 80] : [30, 80],
    }
  }

  state = {
    ...this._parseFilterToValues(this.props.filter),
  }

  componentDidUpdate(oldProps) {
    if (oldProps.filter !== this.props.filter) {
      this.setState({
        ...this._parseFilterToValues(this.props.filter),
      })
    }
  }

  updateFilter = () => {
    const { rooms, priceOn, price, priceMeterOn, priceMeter, areaOn, area } = this.state

    const makeRange = range => {
      const [gt, lt] = range
      if (gt || lt) {
        const filter = {}
        if (gt) filter.gt = gt
        if (lt) filter.lt = lt
        return filter
      }
      return null
    }

    const filter = { rooms }
    if (priceOn) filter.price = makeRange(price)
    if (priceMeterOn) filter.priceMeter = makeRange(priceMeter)
    if (areaOn) filter.area = makeRange(area)

    this.props.onFilter(filter)
  }

  handleRoomChange = e => {
    const { rooms } = this.state
    const { target } = e
    const value = parseInt(target.value)

    const newRooms = target.checked ? [...rooms, value] : rooms.filter(room => room !== value)
    this.setState({ rooms: newRooms }, this.updateFilter)
  }

  handleSwitch = e => {
    const { name, checked } = e.target
    this.setState({
      [name]: checked,
    }, this.updateFilter)
  }

  makeSliderChangeHandle = name => (e, newValue) => {
    this.setState({
      [name]: newValue,
    }, this.updateFilter)
  }

  render() {
    const { classes } = this.props
    const { rooms, priceOn, price, priceMeterOn, priceMeter, areaOn, area } = this.state

    return (
      <>
        <Typography>Комнат:</Typography>
        <FormGroup row className={classes.formGroup}>
          <FormControlLabel control={<Checkbox checked={!!rooms.find(room => room === 1)}
                                               color="primary"
                                               value="1"
                                               onChange={this.handleRoomChange}/>}
                            label="1k"
          />
          <FormControlLabel control={<Checkbox checked={!!rooms.find(room => room === 2)}
                                               color="primary"
                                               value="2"
                                               onChange={this.handleRoomChange}/>}
                            label="2k"
          />
          <FormControlLabel control={<Checkbox checked={!!rooms.find(room => room === 3)}
                                               color="primary"
                                               value="3"
                                               onChange={this.handleRoomChange}/>}
                            label="3k"
          />
        </FormGroup>

        <FormGroup className={classes.formGroup}>
          <FormControlLabel label="Цена (тыс. $):" control={
            <Switch name="priceOn" checked={priceOn} onChange={this.handleSwitch}/>
          }/>
          <Slider min={50}
                  max={350}
                  disabled={!priceOn}
                  step={10}
                  marks={priceMarks}
                  value={price}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  onChange={this.makeSliderChangeHandle('price')}/>
        </FormGroup>

        <FormGroup className={classes.formGroup}>
          <FormControlLabel label={<span>Цена m<sup>2</sup> $:</span>} control={
            <Switch name="priceMeterOn" checked={priceMeterOn} onChange={this.handleSwitch}/>
          }/>
          <Slider min={500}
                  max={3500}
                  disabled={!priceMeterOn}
                  step={50}
                  marks={priceMeterMarks}
                  value={priceMeter}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  onChange={this.makeSliderChangeHandle('priceMeter')}/>
        </FormGroup>

        <FormGroup>
          <FormControlLabel label={<span>Площадь m<sup>2</sup>:</span>} control={
            <Switch name="areaOn" checked={areaOn} onChange={this.handleSwitch}/>
          }/>
          <Slider min={30}
                  max={210}
                  disabled={!areaOn}
                  step={5}
                  marks={areaMarks}
                  value={area}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  onChange={this.makeSliderChangeHandle('area')}/>
        </FormGroup>
      </>
    )
  }
}

export default withStyles(styles)(Filter)
