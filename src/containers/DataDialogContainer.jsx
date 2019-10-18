import React from 'react';
import { connect } from 'react-redux';
import { filterFlats, setFilter } from '../actions/filterActions'
import DataDialog from '../components/DataDialog'

const DataDialogContainer = props => <DataDialog {...props}/>

const mapStateToProps = state => ({
  filter: state.filter.filter,
})

const mapDispatchToProps = {
  filterFlats,
  setFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(DataDialogContainer)
