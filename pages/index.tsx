import type { NextPage } from 'next'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { Layout } from '../components/layouts'
import { EntryList, NewEntry } from '../components/ui'
import { EntryStatus } from '../interfaces'

const HomePage: NextPage = () => {
  return (
    <Layout title='Home - OpenJira'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} >
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Pendientes"></CardHeader>

              {/* Agregar una nueva entrada */}
              {/* Listado de las entradas */}
              <NewEntry />
              <EntryList status={EntryStatus.PENDING}/>

          </Card>
        </Grid>

        <Grid item xs={12} sm={4} >
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title="En Progreso"></CardHeader>
              {/* Agregar una nueva entrada */}
              {/* Listado de las entradas */}
              <EntryList status={EntryStatus.IN_PROGRESS} />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} >
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Completadas"></CardHeader>
              {/* Agregar una nueva entrada */}
              {/* Listado de las entradas */}
              <EntryList status={EntryStatus.FINISHED} />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage
