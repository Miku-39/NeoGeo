import { Platform } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'remote-redux-devtools'
import logger from 'redux-logger'

import rootReducer from './reducers'
import saga from './saga' 


const sagaMiddleware = createSagaMiddleware()
//const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
const middlewares = [sagaMiddleware, logger]
const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(saga)

export default store
