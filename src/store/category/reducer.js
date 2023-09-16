import { ACT_FETCH_ALL_CATEGORIES } from "./action";


const initState = {
    hashCategory: [],
    isFetched: false
}

function reducer(categoryState = initState, action) {
    switch (action.type) {
        case ACT_FETCH_ALL_CATEGORIES:
            return {
                ...categoryState,
                isFetched: true,
                hashCategory: action.payload.hashCategoryById
            };

        default:
            return categoryState;
    }
}

export default reducer