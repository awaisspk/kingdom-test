import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../../components/dashboard/SideBar'

export const Dashboard = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <aside>
          <SideBar />
        </aside>
      </Grid>
      <Grid item xs={10}>
        <Outlet />
      </Grid>
    </Grid>
  )
}
