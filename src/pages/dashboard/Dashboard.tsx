import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../../components/dashboard/SideBar'

export const Dashboard = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <aside>
          <SideBar />
        </aside>
      </Grid>
      <Grid>
        <main>
          <Outlet />
        </main>
      </Grid>
    </Grid>
  )
}
