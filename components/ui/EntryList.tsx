import { List, Paper } from "@mui/material"
import { EntryStatus, FC } from "../../interfaces";
import { EntryCard } from "./EntryCard"
import { DragEvent, useContext, useMemo } from 'react';
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus;
}


export const EntryList: FC<Props> = ({ status }) => {

  const { entries, updateEntry } =  useContext(EntriesContext)
  const { isDragging, setIsDragging } = useContext(UIContext)


  const entriesByStatus = useMemo(()=>{
    return entries.filter(entry => entry.status === status)
  }, [entries, status])

  const allowDrop = (event: DragEvent<HTMLDivElement>)=>{
    event.preventDefault()
  }
  
  const onDropEntry = (event: DragEvent<HTMLDivElement>)=>{
    const id = event.dataTransfer.getData('text')
    const entry = entries.find(e=>e._id===id)!;
    updateEntry({
      ...entry,
      status
    })
    setIsDragging(false)
  }

  
  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging?styles.dragging:''}
    >
        <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'auto', backgroundColor: 'transparent', padding: '1px 5px' }}>
            <List  sx={{ 
              opacity: isDragging?0.2:1, 
              transition: 'all 0.3s' 
              }}>
              {entriesByStatus.map((entry)=>(
                <EntryCard key={entry._id} entry={entry}/>
              ))}
            </List>
        </Paper>
    </div>
  )
}
