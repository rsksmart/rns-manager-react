import { connect } from 'react-redux';
import { parse } from 'query-string';
import { BidComponent } from '../components';
import { bid } from '../operations';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain,
  loading: state.bid.loading
});

const mapDispatchToProps = dispatch => ({
  bid: (domain, value) => dispatch(bid(domain, value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BidComponent);
