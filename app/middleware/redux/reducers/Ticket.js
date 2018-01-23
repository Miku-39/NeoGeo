import { Map } from 'immutable'
import { UPDATE_REQUEST, IS_UPDATING, UPDATED, UPDATE_FAILED, CLEAR_UPDATED_FLAG } from '../actions/Ticket'


const initialState = Map({
    item: null,
    isUpdating: false,
    updated: false,
    error: null
})

export default ticketReducer = (state = initialState, action) => {
    switch (action.type){
        case UPDATE_REQUEST:
            return initialState

        case IS_UPDATING:
            return state.merge({ isUpdating: true })

        case UPDATED:
            return state.merge({ isUpdating: false, updated: true })

        case UPDATE_FAILED:
            return state.merge({ isUpdating: false, error: action.payload })
        
        case CLEAR_UPDATED_FLAG:
            return state.merge({ updated: false })

        default: return state
    }
}