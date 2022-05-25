import { List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard"


export const EntryList = () => {
  return (
    <div>
        <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'scoll', backgroundColor: 'transparent', padding: '1px 5px' }}>
            <List  sx={{ opacity: 1 }}>
                <EntryCard/>
            </List>
        </Paper>
    </div>
  )
}
