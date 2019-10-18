import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { Info, Warning } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    icon: alert => ({
      color: alert ? theme.palette.danger : theme.palette.info,
      fontSize: '3rem',
      marginRight: theme.spacing() * 3,
    }),
    text: {
      display: 'flex',
      justifyContent: 'center',
    },
  }
))

const Alert = ({ onClose, alert, open, title, text, buttons }) => {
  const classes = useStyles(alert)

  return <Dialog open={open}
                 onClose={onClose}
                 aria-labelledby="alert-dialog-title"
                 aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent className={classes.text}>
      {alert ? <Warning className={classes.icon}/> : <Info className={classes.icon}/>}
      {text}
    </DialogContent>
    <DialogActions>{buttons}</DialogActions>
  </Dialog>
}

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  alert: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  buttons: PropTypes.object.isRequired
}

export default Alert
