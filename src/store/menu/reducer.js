import { ACT_FETCH_MAIN_MENU } from "./action";

const initState = {
    mainMenus: []
}


function reducer(menuState = initState, action) {
    switch (action.type) {
        case ACT_FETCH_MAIN_MENU:
            return {
                ...menuState,
                mainMenus: action.payload.mainMenus
            }
        default:
            return menuState
    }
}


export default reducer
