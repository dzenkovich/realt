import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import CommonInitialState from './reducers/initialState'
import CommonReducer from './reducers/reducer'
import MapInitialState from './reducers/mapInitialState'
import MapReducer from './reducers/mapReducer'
import FilterInitialState from './reducers/filterInitialState'
import FilterReducer from './reducers/filterReducer'
import DetailInitialState from './reducers/detailInitialState'
import DetailReducer from './reducers/detailReducer'

// Collapse all logs and ignore system-level logs (show only app-specific)
const loggerMiddleware = createLogger({
  collapsed: true,
  predicate: (getState, action) => action.type && !action.type.match(/^@@/),
})

const middlewares = [thunkMiddleware, loggerMiddleware]

const reducers = combineReducers({
  common: CommonReducer,
  map: MapReducer,
  filter: FilterReducer,
  detail: DetailReducer,
})

const initialState = {
  common: CommonInitialState,
  map: MapInitialState,
  filter: FilterInitialState,
  detail: DetailInitialState,
}

export default createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middlewares)),
)
