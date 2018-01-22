import { combineReducers } from 'redux'
import session from './Session'
import data from './DataReducer'

const root = combineReducers({
  session,
  data
})

export default root
