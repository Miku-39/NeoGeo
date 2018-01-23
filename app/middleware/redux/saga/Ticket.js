import { call, put } from 'redux-saga/effects'

import { isUpdating, updated, updateFailed } from '../actions/Ticket'
import api from '../../api'


export default function * updateTicketSaga(action) {
    yield put(isUpdating())

    try {
        const response = yield call(api.updateTicketStatus, action.payload)
        yield put(updated())
    }
    catch(error) {
        yield put(updateFailed(error))
    }
}