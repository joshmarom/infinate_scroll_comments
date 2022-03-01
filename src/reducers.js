export const commentsReducer = ( state, action ) => {
    switch ( action.type ) {
        case 'STACK_COMMENTS':
            return { ...state, comments: state.comments.concat( action.comments ) }
        case 'FETCHING_COMMENTS':
            return { ...state, fetching: action.fetching }
        default:
            return state;
    }
}

export const pageReducer = ( state, action ) => {
    switch ( action.type ) {
        case 'NEXT_PAGE':
            return { ...state, page: state.page + 1 }
        default:
            return state;
    }
}