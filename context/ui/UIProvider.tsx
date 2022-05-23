import { useReducer } from 'react';
import { FC } from '../../interfaces';
import { UIContext, uiReducer,  ActionTypes} from './';

export interface UIState {
    sidemenuOpen: boolean,
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false
} 

export const UIProvider:FC = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)


    const openSideMenu = ()=>{
        dispatch({type: ActionTypes.UI_OPEN_SIDEBAR})
    }

    const closeSideMenu = ()=>{
        dispatch({type: ActionTypes.UI_CLOSE_SIDEBAR})
    }

    return (
    <UIContext.Provider value={{
        ...state,
        openSideMenu,
        closeSideMenu
    }}>
         { children }
    </UIContext.Provider>
    )
}