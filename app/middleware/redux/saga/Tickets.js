import { call, put } from 'redux-saga/effects'

import { isFetching, fetched, fetchFailed, fetch } from '../actions/Tickets'
import api from '../../api'

function * fetchTicketsSaga() {
    yield put(isFetching())

    try {
        const response = yield call(api.fetchTickets)
        yield put(fetched(response.data))
    }
    catch(error) {
        yield put(fetchFailed(error))
    }
}

export default fetchTicketsSaga
