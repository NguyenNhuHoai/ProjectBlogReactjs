import { ACT_FETCH_COMMENT_PARENT } from "./actions";


const initState = {
    parentPaging: {
        list: [],
        currentPage: 1
    }
}


function reducer(commentState = initState, action) {
    switch (action.type) {
        case ACT_FETCH_COMMENT_PARENT:
            return {
                ...commentState,
                parentPaging: {
                    ...commentState.parentPaging,
                    list: action.payload.currentPage === 1
                        ?
                        action.payload.comments
                        : [
                            ...commentState.parentPaging.list,
                            ...action.payload.comments
                        ],
                    total: action.payload.total,
                    toalPages: action.payload.toalPages,
                    currentPage: action.payload.currentPage
                }
            }

        default:
            return commentState;
    }
}

export default reducer