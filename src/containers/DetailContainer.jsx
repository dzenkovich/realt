import React from 'react';
import { connect } from 'react-redux';
import { closeDetail, loadSale, loadRent } from '../actions/detailActions'
import Detail from '../components/Detail'

const DetailContainer = props => <Detail {...props}/>

const mapStateToProps = state => ({
  open: state.detail.open,
  saleIds: state.detail.saleIds,
  rentIds: state.detail.rentIds,
  sale: state.detail.sale,
  rent: state.detail.rent,
  rentMedian: state.detail.rentMedian,
})

const mapDispatchToProps = {
  closeDetail,
  loadSale,
  loadRent
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer)
