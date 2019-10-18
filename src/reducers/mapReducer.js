import Types from '../constants/actionTypes'
import { clusterData } from '../utils/mapUtils'
import initialState from './mapInitialState'

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.FILTER_FLATS_SUCCESS:
      return {
        ...state,
        sales: action.payload,
        points: clusterData(action.payload, state.bounds, state.zoom),
      }
    case Types.MAP_UPDATE_BOUNDS:
      const {bounds, zoom} = action.payload

      return {
        ...state,
        bounds,
        zoom,
        points: clusterData(state.sales, bounds, zoom),
      }
    default:
      return state
  }
}