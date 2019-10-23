import React, { Component } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import PropTypes from 'prop-types'
import Filter from './Filter'
import { loadFilter, saveFilter } from '../actions/filterActions'

class DataDialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    filter: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired,
    filterFlats: PropTypes.func.isRequired,
    filterRents: PropTypes.func.isRequired,
  }

  state = {
    filter: this.props.filter,
  }

  componentDidMount() {
    const { setFilter } = this.props
    const filter = loadFilter()
    if (filter) setFilter(filter)
    else this._filter(this.props.filter)
  }

  _filter = filter => {
    const {filterFlats, filterRents} = this.props
    return Promise.all([filterFlats(filter), filterRents(filter)])
  }

  componentDidUpdate(oldProps) {
    if (oldProps.filter !== this.props.filter) {
      this._filter(this.props.filter)
    }
  }

  handleUpdateFilter = filter => {
    this.setState({ filter })
  }

  handleFilter = () => {
    const { filter } = this.state
    this.props.setFilter(filter)
    saveFilter(filter)
  }

  handleCancel = () => this.props.onCancel()

  render() {
    const { open, filter } = this.props

    return (
      <Dialog open={open} fullWidth={true} onClose={this.handleCancel}>
        <DialogTitle>Фильтр</DialogTitle>
        <DialogContent>
          <Filter filter={filter} onFilter={this.handleUpdateFilter}/>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={this.handleFilter}>Применить</Button>
          <Button variant="outlined" onClick={this.handleCancel}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default DataDialog
