import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { multilanguage } from 'redux-multilanguage';
import { TabWithSearchComponent } from '../../../components';
import { MetamaskButtonContainer } from '../../../containers';
import MyCryptoModal from './MyCryptoModal';

class FinalizeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { showMyCrypto: false };

    this.changeShowMyCrypto = this.changeShowMyCrypto.bind(this);
  }

  changeShowMyCrypto() {
    this.setState(state => ({ showMyCrypto: !state.showMyCrypto }));
  }

  render() {
    const {
      strings, domain, finalize, loading, viewMyCrypto,
    } = this.props;
    const { showMyCrypto } = this.state;

    return (
      <TabWithSearchComponent>
        <h2>
          {strings.finalize_auction_for}
          {' '}
          <code>{domain}</code>
        </h2>
        {
          viewMyCrypto
            ? <Button onClick={this.changeShowMyCrypto}>{strings.finalize_auction}</Button>
            : (
              <MetamaskButtonContainer
                onClick={() => finalize(domain)}
              >
                {strings.finalize_auction}
              </MetamaskButtonContainer>
            )
        }
        {
          viewMyCrypto
          && (
            <MyCryptoModal
              changeShowMyCrypto={this.changeShowMyCrypto}
              showMyCrypto={showMyCrypto}
              name={domain}
            />
          )
        }
        {loading && '...'}
      </TabWithSearchComponent>
    );
  }
}

FinalizeComponent.propTypes = {
  strings: propTypes.shape({
    finalize_auction_for: propTypes.string.isRequired,
    finalize_auction: propTypes.string.isRequired,
  }).isRequired,
  domain: propTypes.string.isRequired,
  finalize: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
  viewMyCrypto: propTypes.bool.isRequired,
};

export default multilanguage(FinalizeComponent);
