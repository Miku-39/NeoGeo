import { Map } from 'immutable'
import { UPDATE_REQUEST, IS_UPDATING, UPDATED, UPDATE_FAILED, CLEAR_FLAGS } from '../actions/Ticket'
import { ADD_TICKET_REQUEST, IS_ADDING, ADDED, ADDING_FAILED } from '../actions/Ticket'

const initialState = Map({
    item: null,
    isUpdating: false,
    updated: false,
    isAdding: false,
    added: false,
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
        
        case CLEAR_FLAGS:
            return state.merge({ updated: false, added: false })


        case ADD_TICKET_REQUEST:
            return initialState

        case IS_ADDING:
            return state.merge({ isAdding: true })

        case ADDED:
            return state.merge({ isAdding: false, added: true })

        case ADDING_FAILED:
            return state.merge({ isAdding: false, error: action.payload })
            

        default: return state
    }
}