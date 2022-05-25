import { UIState } from './';

export enum ActionTypes {
    UI_OPEN_SIDEBAR = 'UI_OPEN_SIDEBAR',
    UI_CLOSE_SIDEBAR = 'UI_CLOSE_SIDEBAR',
    UI_SET_IS_ADDING_ENTRY = 'UI_SET_IS_ADDING_ENTRY',
    UI_SET_IS_DRAGGING = 'UI_SET_IS_DRAGGING',

}

type UIActionType = {
    type: ActionTypes,
    payload?: boolean
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
        case ActionTypes.UI_SET_IS_ADDING_ENTRY:
            return {
                ...state,
                isAddingEntry: !!action?.payload
            }
        case ActionTypes.UI_SET_IS_DRAGGING:
            return {
                ...state,
                isDragging: !!action?.payload
            }
        default:
            return state;
    }
}