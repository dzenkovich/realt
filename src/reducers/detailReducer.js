import initialState from './filterInitialState'
import Types from '../constants/actionTypes'
import { findInArea } from '../utils/mapUtils'

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.MAP_UPDATE_BOUNDS:
      return {
        ...state,
        zoom: action.payload.zoom,
      }
    case Types.FILTER_RENTS_SUCCESS:
      return {
        ...state,
        medianRent: action.payload,
      }
    case Types.MAP_DETAILS:
      const { items, lat, lng } = action.payload
      const clustersRent = findInArea(state.medianRent, lat, lng, state.zoom)
      const rentFlats = clustersRent.reduce((result, item) => {
        return result.concat(item.items)
      }, [])
      const rentPrices = rentFlats.map(flat => flat.priceMonth).sort()
      return {
        ...state,
        open: true,
        saleIds: items.map(flat => flat.flatId),
        rentIds: rentFlats.map(flat => flat.flatId),
        rentMedian: rentPrices[Math.floor(rentPrices.length / 2)] || 0
      }
    case Types.DETAIL_LOAD_SALE_SUCCESS:
      return {
        ...state,
        sale: action.payload,
      }
    case Types.DETAIL_LOAD_RENT_SUCCESS:
      return {
        ...state,
        rent: action.payload,
      }
    case Types.DETAIL_CLOSE:
      return {
        ...state,
        open: false,
      }
    default:
      return { ...state }
  }
}
