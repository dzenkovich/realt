import Types from '../constants/actionTypes'
import { createAction, createAsyncAction } from '../utils'
import Service from '../utils/service'
import {URLS} from '../constants'
import { serverErrorHandler } from './appActions'

export const loadSale = createAsyncAction(Types.DETAIL_LOAD_SALE, (dispatch, data) => {
  dispatch({ type: Types.DETAIL_LOAD_SALE, payload: data })
  return Service.get(URLS.flat, data)
}, serverErrorHandler)

export const loadRent = createAsyncAction(Types.DETAIL_LOAD_RENT, (dispatch, data) => {
  dispatch({ type: Types.DETAIL_LOAD_RENT, payload: data })
  return Service.get(URLS.flat, data)
}, serverErrorHandler)


export const closeDetail = createAction(Types.DETAIL_CLOSE)
