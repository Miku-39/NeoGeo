import { call, put } from 'redux-saga/effects'

import { isUpdating, updated, updateFailed, isAdding, added, addingFailed } from '../actions/Ticket'
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