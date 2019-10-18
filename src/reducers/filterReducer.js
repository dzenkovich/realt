import initialState from './filterInitialState'
import Types from '../constants/actionTypes'

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.SET_FILTER_STATE:
      return {
        ...state,
        filter: action.payload,
      }
    default:
      return { ...state }
  }
}
