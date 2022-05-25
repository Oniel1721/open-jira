import { useReducer } from 'react';
import { FC } from '../../interfaces';
import { UIContext, uiReducer,  ActionTypes} from './';

export interface UIState {
    sidemenuOpen: boolean,
    isAddingEntry: boolean

}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false
} 

export const UIProvider:FC = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)


    const openSideMenu = ()=>{
        dispatch({type: ActionTypes.UI_OPEN_SIDEBAR})
    }

    const closeSideMenu = ()=>{
        dispatch({type: ActionTypes.UI_CLOSE_SIDEBAR})
    }

    const setIsAddingEntry = (payload: boolean)=>{
        dispatch({type: ActionTypes.UI_SET_IS_ADDING_ENTRY, payload})
    }

    return (
    <UIContext.Provider value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry
    }}>
         { children }
    </UIContext.Provider>
    )
}