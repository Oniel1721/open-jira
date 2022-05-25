import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { Entry, EntryStatus, FC } from '../../interfaces';
import { EntriesContext, entriesReducer, ActionTypes } from './';

export interface EntriesState {
    entries: Entry[],
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'First description: Pendiente',
            status: EntryStatus.PENDING,
            createAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'Second description: En progeso',
            status: EntryStatus.IN_PROGRESS,
            createAt: Date.now() - 1000000
        },
        {
            _id: uuidv4(),
            description: 'Third description: Terminada',
            status: EntryStatus.FINISHED,
            createAt: Date.now() - 100000
        },
    ]
} 

export const EntriesProvider:FC = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)


    const addNewEntry = (description: string)=>{
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createAt: Date.now(),
            status: EntryStatus.PENDING
        }

        dispatch({
            type: ActionTypes.Entries_AddEntry,
            payload: newEntry
        })
    }

    return (
    <EntriesContext.Provider value={{
        ...state,
        addNewEntry
    }}>
         { children }
    </EntriesContext.Provider>
    )
}