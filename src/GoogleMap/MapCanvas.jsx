import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getRentColor, getZoomMultiplier } from '../utils/mapUtils'

class MapCanvas extends Component {
  static propTypes = {
    points: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.w = this.holder.offsetWidth
    this.h = this.holder.offsetHeight
    const canvas = document.createElement('canvas')
    canvas.width = this.w
    canvas.height = this.h
    this.ctx = canvas.getContext('2d')
    this.ctx.globalAlpha = 0.5
    this.holder.appendChild(canvas)
  }

  componentDidUpdate(oldProps) {
    if(oldProps.points !== this.props.points) {
      const {points, $geoService, zoom} = this.props
      this.ctx.clearRect(0, 0, this.w, this.h)
      points.forEach(({lat, lng, priceMonthMedian}) => {
        const {x, y} = $geoService.fromLatLngToCenterPixel({lat, lng})
        this._drawCircle(this.w/2 + x, this.h/2 + y, priceMonthMedian, zoom)
      })
    }
  }

  _drawCircle(x, y, price, zoom) {
    const radius = 200 / getZoomMultiplier(zoom)
    this.ctx.fillStyle = getRentColor(price);
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
  }

  render() {
    return (
      <div ref={holder => this.holder = holder} style={{width: '100vw', height: '100vh', left: '-50vw', top: '-50vh', position: 'absolute'}}/>
    )
  }
}

export default MapCanvas
