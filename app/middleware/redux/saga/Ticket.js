import { call, put } from 'redux-saga/effects'

import { isUpdating, updated, updateFailed, isAdding, fileIsAdding, added, fileAdded, addingFailed, fileAddingFailed } from '../actions/Ticket'
import api from '../../api'


export function * updateTicketSaga(action) {
    yield put(isUpdating())

    try {
        const response = yield call(api.updateTicketStatus, action.payload)
        yield put(updated())
    }
    catch(error) {
        yield put(updateFailed(error))
    }
}

export function * addTicketSaga(action) {
    yield put(isAdding())

    try {
        const response = yield call(api.addTicket, action.payload)
        yield put(added())
    }
    catch(error) {
        yield put(addingFailed(error))
    }
}

export function * addFileSaga(action){
  yield put(fileIsAdding())

  try {
      console.log('redux saga addFileSaga')
      const response = yield call(api.addFile, action.payload)
      console.log(response)
      yield put(fileAdded())
  }
  catch(error) {
      console.log('failed')
      console.log(error)
      yield put(fileAddingFailed(error))
  }
}
