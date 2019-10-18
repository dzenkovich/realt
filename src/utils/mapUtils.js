import { CLUSTER_PRECISION, MAX_SALE_PRICE, MIN_SALE_PRICE } from '../constants'
import chroma from 'chroma-js'

class cluster {
  constructor(lat, lng) {
    this.lat = lat
    this.lng = lng
    this.items = []
  }

  addItem = ({id, rooms, price}) => {
    this.items.push({id, rooms, price})
  }
}

export const clusterData = (data, bounds, zoom) => {
  return data.reduce((result, item) => { // combine positions in same building into clusters
    // omit points that are out of bounds
    if(item.lat > bounds.nw.lat || item.lat < bounds.se.lat) return result
    if(item.lng > bounds.se.lng || item.lng < bounds.nw.lng) return result

    // combine points into clusters
    let res = searchForCluster(result, zoom, item.lat, item.lng)
    if(!res) {
      res = new cluster(item.lat, item.lng)
      result.push(res)
    }
    res.addItem(item)
    return result
  }, [])
}

const getZoomMultiplier = zoom => {
  return Math.pow(2, 19 - zoom)
}

const getDistance = (ver, hor) => {
  return Math.sqrt(Math.pow(ver, 2) + Math.pow(hor, 2))
}

const searchForCluster = (clusters, zoom, lat, lng) => {
  let result = null
  let resultDistance = Infinity
  let precision = CLUSTER_PRECISION * getZoomMultiplier(zoom)
  // regular for loop should be way more performing than .map or .filter
  for (let i = 0; i < clusters.length; i++) {
    let cluster = clusters[i]
    let deltaLat = Math.abs(cluster.lat - lat)
    let deltaLng = Math.abs(cluster.lng - lng)
    if (deltaLat <= precision && deltaLng <= precision) {
      let distance = getDistance(deltaLat, deltaLng)
      if(distance < resultDistance) {
        resultDistance = distance
        result = cluster
      }
    }
  }
  return result
}

const scale = chroma.scale(['green', 'yellow', 'red'])

export const getSaleColor = (price, min = MIN_SALE_PRICE, max = MAX_SALE_PRICE) => {
  let percent = (price - min) / (max - min)
  // I hope scale handles edge cases of <0 or >1
  return scale(percent).hex(percent)
}