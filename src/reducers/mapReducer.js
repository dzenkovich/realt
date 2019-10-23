import Types from '../constants/actionTypes'
import { clusterData, limitToBounds } from '../utils/mapUtils'
import initialState from './mapInitialState'

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.FILTER_FLATS_SUCCESS:
      return {
        ...state,
        sales: action.payload,
        points: clusterData(action.payload, state.bounds, state.zoom),
      }
    case Types.FILTER_RENTS_SUCCESS:
      return {
        ...state,
        medianRent: action.payload,
        pointsRent: limitToBounds(action.payload, state.bounds)
      }
    case Types.MAP_UPDATE_BOUNDS:
      const {bounds, zoom} = action.payload

      return {
        ...state,
        bounds,
        zoom,
        points: clusterData(state.sales, bounds, zoom),
        pointsRent: limitToBounds(state.medianRent, bounds)
      }
    default:
      return state
  }
}