export const UPDATE_TICKET_REQUEST = 'updateTicket'
export const IS_UPDATING = 'isUpdating'
export const UPDATED = 'updated'
export const UPDATE_FAILED = 'updateFailed'
export const CLEAR_UPDATED_FLAG = 'clearUpdatedFlag'

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
        type: CLEAR_UPDATED_FLAG
    }
}
