import initialState from './initialState'
import Types from '../constants/actionTypes'

export default function(state = initialState, action) {
  switch (action.type) {
    case Types.SERVER_ERROR:
      return {
        ...state,
        errorMessage: action.payload || null,
      }
    case Types.DISPOSE_SERVER_ERROR:
      return {
        ...state,
        errorMessage: null,
      }
    default:
      return { ...state }
  }
}
