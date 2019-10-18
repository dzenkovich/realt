import React from 'react';
import { connect } from 'react-redux';
import App from '../components/App'
import { disposeServerError } from '../actions/appActions'

const AppContainer = props => <App {...props}/>

const mapStateToProps = state => ({
  errorMessage: state.common.errorMessage,
})

const mapDispatchToProps = {
  disposeServerError
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
