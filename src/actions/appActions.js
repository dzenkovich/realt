import Types from '../constants/actionTypes'
import { createAction, readServerError } from '../utils'

export const serverErrorHandler = (dispatch, response) => {
  dispatch(serverError(readServerError(response)))
}

export const disposeServerError = createAction(Types.DISPOSE_SERVER_ERROR)

export const serverError = createAction(Types.SERVER_ERROR)
