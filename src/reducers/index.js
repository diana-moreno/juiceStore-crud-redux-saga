import { combineReducers } from 'redux'
import productsReducer from './productsReducer'
import alertReducer from './alertReducer'

export default combineReducers({
  products: productsReducer,
  alert: alertReducer
})

// si vamos a tener varios reducers, hay que utilizar combineReducers porque solo puede haber uno.