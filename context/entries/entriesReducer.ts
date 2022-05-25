import { Entry } from '../../interfaces';
import { EntriesState } from './';

export enum ActionTypes {
    Entries_AddEntry = 'Entries_AddEntry',
}

type EntriesActionType = {
    type: ActionTypes,
    payload: Entry
}

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ):EntriesState => {
    switch(action.type){
        case ActionTypes.Entries_AddEntry:
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        default:
            return state;
    }
}