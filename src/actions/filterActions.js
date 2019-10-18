import Types from '../constants/actionTypes'
import { createAction, createAsyncAction } from '../utils'
import Service from '../utils/service'
import {URLS} from '../constants'
import { serverErrorHandler } from './appActions'

export const setFilter = createAction(Types.SET_FILTER_STATE)

export const loadFilter = () => {
  try {
    return JSON.parse(window.localStorage.getItem('filter'))
  }
  catch (e) {
    console.warn(e)
    return null
  }
}

export const saveFilter = (state) => {
  window.localStorage.setItem('filter', JSON.stringify(state))
}

export const filterFlats = createAsyncAction(Types.FILTER_FLATS, (dispatch, data) => {
  dispatch({ type: Types.FILTER_FLATS, payload: data })
  return Service.get(URLS.flats, data)
}, serverErrorHandler)

