import { useEffect, useReducer } from 'react';
import { entriesApi } from '../../apis';
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


    const addNewEntry = async (description: string)=>{
        const { data } = await entriesApi.post<Entry>('/entries', {
            description
        })

        dispatch({
            type: ActionTypes.Entries_AddEntry,
            payload: data
        })
    }

    const updateEntry = async ({description, status, _id}: Entry)=>{
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description,
                status
            })
        
            dispatch({
                type: ActionTypes.Entries_Updated,
                payload: data
            })
        }
        catch(error){
            console.log(error)
        }
    }

    const refreshEntries = async()=>{
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({type: ActionTypes.Entries_Refresh_Data, payload: data})
    }

    useEffect(()=>{
        refreshEntries();
    }, [])

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