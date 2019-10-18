import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import theme from '../theme'
import Page from './Page'
import Alert from './Alert'

function App({ errorMessage, disposeServerError }) {
  return (
    <ThemeProvider theme={theme}>
      <Page/>
      {
        errorMessage &&
        <Alert open={true}
               onClose={disposeServerError}
               title="Ошибка Сервера!"
               text={errorMessage}
               alert={true}
               buttons={<Button onClick={disposeServerError} variant="contained" color="primary">Ok</Button>}
        />
      }
    </ThemeProvider>
  )
}

App.propTypes = {
  errorMessage: PropTypes.string,
  disposeServerError: PropTypes.func.isRequired,
}

export default App
