import { UIState } from './';

export enum ActionTypes {
    UI_OPEN_SIDEBAR = 'UI_OPEN_SIDEBAR',
    UI_CLOSE_SIDEBAR = 'UI_CLOSE_SIDEBAR'
}

type UIActionType = {
    type: ActionTypes
}

export const uiReducer = ( state: UIState, action: UIActionType ):UIState => {
    switch(action.type){
        case ActionTypes.UI_OPEN_SIDEBAR:
            return {
                ...state,
                sidemenuOpen: true
            }
        case ActionTypes.UI_CLOSE_SIDEBAR:
            return {
                ...state,
                sidemenuOpen: false
            }
        default:
            return state;
    }
}