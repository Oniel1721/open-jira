import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material"
import { Layout } from "../../components/layouts"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { EntryStatus, validEntryStatus } from "../../interfaces";
import { ChangeEvent, useMemo, useState } from "react";




const EntryPage = () => {

    const [inputValue, setInputValue] = useState('')
    const [status, setStatus] = useState<EntryStatus>(EntryStatus.PENDING)
    const [touched, setTouched] = useState(false)

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>)=>{
        setInputValue(event.target.value)
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>)=>{
        setStatus(event.target.value as EntryStatus)
    }

    const onSave = ()=>{
        
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

export default EntryPage
