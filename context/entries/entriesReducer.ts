import { EntriesState } from './';

enum ActionTypes {
    Entries_ActionName = 'Entries_ActionName',
}

type EntriesActionType = {
    type: ActionTypes
}

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ):EntriesState => {
    switch(action.type){
        // case ActionTypes.Entries_ActionName:
        //     return {
        //         ...state,
        //     }
        default:
            return state;
    }
}