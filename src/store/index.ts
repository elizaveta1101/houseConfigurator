import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { reducer } from './reducers'
import { ActionCreator } from './actions'
import { ActionTypes } from './action-types'

const rootReducer = combineReducers({
  state: reducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
export { ActionCreator, ActionTypes }
