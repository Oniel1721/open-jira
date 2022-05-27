
import { GetServerSideProps } from 'next'
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material"
import { Layout } from "../../components/layouts"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Entry, EntryStatus, FC, validEntryStatus } from "../../interfaces";
import { ChangeEvent, useContext, useMemo, useState } from "react";
import { isValidObjectId } from 'mongoose'
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { useRouter } from 'next/router';

interface Props {
    entry: Entry
}


const EntryPage:FC<Props> = ({ entry }) => {
    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)

    const router = useRouter()

    const { updateEntry } = useContext(EntriesContext)

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>)=>{
        setInputValue(event.target.value)
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>)=>{
        setStatus(event.target.value as EntryStatus)
    }

    const onSave = ()=>{
        if(inputValue.trim().length === 0) return;
        updateEntry({
            ...entry,
            description: inputValue,
            status
        }, true)
        router.push('/')
    }

    const isNotValid = useMemo(()=> inputValue.length <=0 && touched, [inputValue, touched])


  return (
    <Layout title=".......">
        <Grid
            container
            justifyContent='center'
            sx={{
                marginTop: 2
            }}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader
                        title={`Entrada: ${inputValue}`} 
                        subheader={`Creada hace ...Minutos`} 
                    />
                    <CardContent>
                        <TextField 
                            sx={{
                                marginTop: 2,
                                marginButtom: 1
                            }}
                            fullWidth
                            placeholder="Nueva Entrada"
                            autoFocus
                            multiline
                            label='Nueva Entrada'
                            value={inputValue}
                            onBlur={()=>setTouched(true)}
                            onChange={onInputValueChanged}
                            helperText={isNotValid?'Ingrese un valor':''}
                            error={isNotValid}
                        />
                        <FormControl>
                            <FormLabel>
                                Estado:
                            </FormLabel>
                            <RadioGroup
                                row
                                value={status}
                                onChange={onStatusChanged}
                            >
                                {
                                    validEntryStatus.map((status)=>(
                                        <FormControlLabel
                                            key={status}
                                            value={status}
                                            control={<Radio/>}
                                            label={status}
                                        />         
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                    </CardContent>
                    <CardActions>
                        <Button
                            startIcon={<SaveOutlinedIcon />}
                            variant='contained'
                            fullWidth
                            onClick={onSave}
                            disabled={inputValue.length <= 0}
                        >
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

        <IconButton
            sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark'
            }}
        >
            <DeleteOutlinedIcon/>
        </IconButton>
    </Layout>
  )
}



export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const {id} = params as {id: string};
    const redirectToIndex = {
        redirect: {
            destination: '/',
            permanent: false
        }
    }

    const entry = await dbEntries.getEntryById(id)
    if(!entry) return redirectToIndex;

   
    
    return {
        props: {
            entry
        }
    }
}

export default EntryPage
