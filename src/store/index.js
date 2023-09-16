import { createStore, applyMiddleware, combineReducers } from 'redux'
import authReducer from './auth/reducer';
import postReducer from './post/reducer'
import categoryReducer from './category/reducer'
import menuReducer from './menu/reducer'
import commentReducer from './comment/reducer'
import thunk from 'redux-thunk';
import logger from 'redux-logger'


const rootReducers = combineReducers({
    POST: postReducer,
    AUTH: authReducer,
    CATEGORY: categoryReducer,
    MENU: menuReducer,
    COMMENT: commentReducer,
})

const store = createStore(rootReducers, applyMiddleware(thunk, logger))

export default store