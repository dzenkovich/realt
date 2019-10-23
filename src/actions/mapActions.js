import Types from '../constants/actionTypes'
import { createAction } from '../utils'

export const updateBounds = createAction(Types.MAP_UPDATE_BOUNDS)

export const showDetails = createAction(Types.MAP_DETAILS)
