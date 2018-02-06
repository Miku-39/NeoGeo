export const UPDATE_TICKET_REQUEST = 'updateTicket'
export const IS_UPDATING = 'isUpdating'
export const UPDATED = 'updated'
export const UPDATE_FAILED = 'updateFailed'
export const CLEAR_FLAGS = 'clearFlags'
export const ADD_TICKET_REQUEST = 'addTicket'
export const IS_ADDING = 'isAdding'
export const ADDED = 'added'
export const ADDING_FAILED = 'addingFailed'


export const update = (ticket) => {
    return {
        type: UPDATE_TICKET_REQUEST,
        payload: ticket
    }
}

export const isUpdating = (isUpdated) => {
    return {
        type: IS_UPDATING,
        payload: isUpdating
    }
}

export const updated = () => {
    return {
        type: UPDATED
    }
}

export const updateFailed = (error) => {
    return {
        type: UPDATE_FAILED,
        payload: error
    }
}

export const dismiss = () => {
    return {
        type: CLEAR_FLAGS
    }
}

export const add = (ticket) => {
    return {
        type: ADD_TICKET_REQUEST,
        payload: ticket
    }
}

export const isAdding = (isAdding) => {
    return {
        type: IS_ADDING,
        payload: isAdding
    }
}

export const added = () => {
    return {
        type: ADDED
    }
}

export const addingFailed = (error) => {
    return {
        type: ADDING_FAILED,
        payload: error
    }
}

