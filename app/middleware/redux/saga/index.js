import { takeLatest } from 'redux-saga/effects'

import { LOGIN_REQUEST } from '../actions/Session'
import loginSaga from './Session'
//import { fetchBillsSaga, updateBillSaga } from './DataSaga'


function * sagaWatcher() {
    yield takeLatest(LOGIN_REQUEST, loginSaga)
    
    /*yield [
        takeLatest(LOGIN_REQUEST, loginSaga),
        takeLatest(Constant.BILLS_FETCH_REQUESTED_ACTION, fetchBillsSaga),
        takeLatest(Constant.UPDATE_BILL_ACTION, updateBillSaga)
    ]*/
}

export default sagaWatcher
