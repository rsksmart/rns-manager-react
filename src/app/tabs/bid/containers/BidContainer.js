import { connect } from 'react-redux';
import { parse } from 'query-string';
import { BidComponent } from '../components';
import { bid } from '../operations';
import { mapMetamaskResponseTypeToBootstrapVariant } from '../../../selectors';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  loading: state.bid.loading,
  response: state.bid.response ? {
    variant: mapMetamaskResponseTypeToBootstrapVariant(state.bid.response.type),
    message: state.bid.response.message
  } : null
});

const mapDispatchToProps = dispatch => ({
  bid: (domain, value) => dispatch(bid(domain, value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BidComponent);
