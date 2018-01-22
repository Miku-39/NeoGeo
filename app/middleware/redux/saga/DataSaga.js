/*import { call, put, select } from 'redux-saga/effects'

import * as Constant from '../Constant'
import { billsFetchInProgressAction, 
    billsFetchedAction,
    billsFetchingFailedAction,
    updateBillInProgressAction,
    billUpdatedAction,
    updateBillFailedAction
} from '../actions/DataActions'
import { fetchBills, updateBillStatus } from '../../api'

export function * fetchBillsSaga() {
    yield put(billsFetchInProgressAction(true))
    const state = yield select()
    const { userId } = state.session.toJS()

    try {
        const response = yield call(fetchBills, userId)
        yield put(billsFetchInProgressAction(false))
        yield put(billsFetchedAction(response.data))
    }
    catch(error) {
        yield put(billsFetchInProgressAction(false))
        yield put(billsFetchingFailedAction(error))
    }
}

export function * updateBillSaga(action) {
    yield put(updateBillInProgressAction(true))
    const state = yield select()
    const { userId } = state.session.toJS()
    let invoice = action.payload
    invoice.whoAgreed = { id: userId }

    try {
        yield call(updateBillStatus, invoice)
        yield put(updateBillInProgressAction(false))
        yield put(billUpdatedAction())
    }
    catch(error) {
        yield put(updateBillInProgressAction(false))
        yield put(updateBillFailedAction(error))
    }
}
*/