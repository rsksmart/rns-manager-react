import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { ExpiredDomainComponent } from '../components';
import getDomainState from '../../search/operations';

const mapStateToProps = state => ({
  domain: state.auth.name,
  expires: state.newAdmin.domainInfo.expires,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (domain) => {
    dispatch(getDomainState(domain.replace('.rsk', '')));
    dispatch(push('/'));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClick: () => dispatchProps.handleClick(stateProps.domain),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ExpiredDomainComponent);
