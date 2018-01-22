/*import { Map } from 'immutable'

import * as Constant from '../Constant'


const initialState = Map({
  bills: [],
  fetchingInProgress: null,
  updateBillInProgress: null,
  billUpdated: null,
  error: null,
  updateBillStatusError: null,
  shouldRefreshBiils: null
})

const dataReducer = (state = initialState, action) => {
  switch (action.type){
    case Constant.BILLS_FETCH_REQUESTED_ACTION:
      return state.merge({fetchingInProgress: null, error: null, shouldRefreshBiils: null})

    case Constant.BILLS_FETCHING_IN_PROGRESS_ACTION:
      return state.merge({fetchingInProgress: action.payload})

    case Constant.BILLS_FETCHED_ACTION:
      return state.merge({bills: action.payload, fetchingInProgress: false, error: null})

    case Constant.BILLS_FETCHING_FAILED:
      return state.merge({fetchingInProgress: false, error: action.payload})

    case Constant.DISMISS_DATA_ERROR_DIALOG_ACTION: 
      return state.merge({error: null})

    case Constant.UPDATE_BILL_ACTION:
      return state.merge({billUpdated: null})

    case Constant.UPDATE_BILL_IN_PROGRESS_ACTION:
      return state.merge({updateBillInProgress: action.payload})

    case Constant.BILL_UPDATED_ACTION: 
      return state.merge({billUpdated: true, shouldRefreshBiils: true})

    case Constant.UPDATE_BILL_FAILED_ACTION:
      return state.merge({updateBillStatusError: action.payload})

    case Constant.DISMISS_BILL_UPDATED_DIALOG:
      return state.merge({billUpdated: null})

    case Constant.DISMISS_UPDATE_BILL_STATUS_ERROR_DIALOG_ACTION:
      return state.merge({updateBillStatusError: null})
    
    default: return state
  }
}

export default dataReducer*/