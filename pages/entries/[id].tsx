import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material"
import { Layout } from "../../components/layouts"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { validEntryStatus } from "../../interfaces";




const EntryPage = () => {
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
                        title='Entrada:'
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
                        />
                        <FormControl>
                            <FormLabel>
                                Estado:
                            </FormLabel>
                            <RadioGroup
                                row
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
