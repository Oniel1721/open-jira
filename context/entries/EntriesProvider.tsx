import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { Entry, EntryStatus, FC } from '../../interfaces';
import { EntriesContext, entriesReducer, ActionTypes } from './';

export interface EntriesState {
    entries: Entry[],
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
} 

export const EntriesProvider:FC = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)


    const addNewEntry = (description: string)=>{
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: EntryStatus.PENDING
        }

        dispatch({
            type: ActionTypes.Entries_AddEntry,
            payload: newEntry
        })
    }

    const updateEntry = (entry: Entry)=>{
        dispatch({
            type: ActionTypes.Entries_Updated,
            payload: entry
        })
    }

    return (
    <EntriesContext.Provider value={{
        ...state,
        addNewEntry,
        updateEntry
    }}>
         { children }
    </EntriesContext.Provider>
    )
}