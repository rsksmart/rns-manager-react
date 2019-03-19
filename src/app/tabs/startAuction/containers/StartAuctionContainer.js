import { StartAuctionComponent } from '../components';
import { parse } from 'query-string';
import { connect } from 'react-redux';
import { startAuction } from '../operations';

const mapStateToProps = state => ({
  domain: parse(state.router.location.search).domain
});

const mapDispatchToProps = dispatch => ({
  startAuction: (domain) => dispatch(startAuction(domain))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartAuctionComponent);
