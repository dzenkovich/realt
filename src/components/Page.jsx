import React, {useState} from 'react'
import { Fab } from '@material-ui/core'
import { FilterList } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import MapContainer from '../containers/MapContainer'
import DataDialogContainer from '../containers/DataDialogContainer'

const useStyles = makeStyles(theme => ({
  page: {
    width: '100vw',
    height: '100vh',
  },
  fab: {
    position: 'fixed',
    top: theme.spacing(2),
    left: theme.spacing(2),
  }
}))

function Page() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div className={classes.page}>
      <MapContainer/>
      <Fab color="primary" aria-label="add" onClick={handleOpen} className={classes.fab}><FilterList /></Fab>
      <DataDialogContainer open={open} onCancel={handleOpen}/>
    </div>
  )
}

export default Page
