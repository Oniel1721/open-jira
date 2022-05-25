import { Entry } from '../../interfaces';
import { EntriesState } from './';

export enum ActionTypes {
    Entries_AddEntry = 'Entries_AddEntry',
    Entries_Updated = 'Entries_Updated'
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
        case ActionTypes.Entries_Updated:
            return {
                ...state,
                entries: state.entries.map(entry=>{
                    if(entry._id === action.payload._id){
                        entry.status = action.payload.status
                        entry.description = action.payload.description
                    }
                    return entry
                })
            }
        default:
            return state;
    }
}