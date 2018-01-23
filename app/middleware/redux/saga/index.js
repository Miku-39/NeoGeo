import { takeLatest } from 'redux-saga/effects'

import { LOGIN_REQUEST } from '../actions/Session'
import { FETCH_REQUEST } from '../actions/Tickets'
import { UPDATE_TICKET_REQUEST } from '../actions/Ticket'
import loginSaga from './Session'
import ticketsSaga from './Tickets'
import updateTicketSaga from './Ticket'
//import { fetchBillsSaga, updateBillSaga } from './DataSaga'


function * sagaWatcher() {
    yield [
        takeLatest(LOGIN_REQUEST, loginSaga),
        takeLatest(FETCH_REQUEST, ticketsSaga),
        takeLatest(UPDATE_TICKET_REQUEST, updateTicketSaga)
    ]
}

export default sagaWatcher
