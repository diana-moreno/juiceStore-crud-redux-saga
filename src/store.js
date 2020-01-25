import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import thunk from 'redux-thunk'

import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), // applyMiddleware se requiere porque vamos a utilizar thunk
    applyMiddleware(sagaMiddleware),
    typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)
sagaMiddleware.run(rootSaga) // los sagas no funcionan sin esto, los actions sí

export default store



/*import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'// utilizar redux de manera asíncrona
import reducer from './reducers'

// solamente hay un store por aplicación

const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), // applyMiddleware se requiere porque vamos a utilizar thunk
    typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

export default store*/