import React, { Component } from 'react';
import { Modal, FormControl } from 'react-bootstrap';
import { keccak256 as sha3 } from 'js-sha3';
import { multilanguage } from 'redux-multilanguage';
import { LinkToMyCryptoInteractComponent } from '../../../components';

class MyCryptoModalComponent extends Component {
  constructor (props) {
    super(props);

    this.state = { shaBid: '' };

    this.changeShaBid = this.changeShaBid.bind(this);
  }

  changeShaBid (event) {
    this.setState({ shaBid: event.target.value });
  }

  render () {
    const { strings, showMyCrypto, changeShowMyCrypto, name, value, salt } = this.props;
    const { shaBid } = this.state;

    return (
      <Modal size='lg' show={showMyCrypto} onHide={changeShowMyCrypto}>
        <Modal.Header closeButton>
          <h3>{strings.mycrypto_bid_title}</h3>
          <code>{name}</code>
        </Modal.Header>
        <Modal.Body>
          <ol>
          <li>{strings.mycrypto_select_network}</li>
          <li>{strings.mycrypto_go_to_interact}</li>
            <li>
              {strings.mycrypto_seal_the_bid}
              <ol>
                <li>{strings.mycrypto_select_registrar}</li>
                <li>{strings.mycrypto_access}</li>
                <li>{strings.mycrypto_on_read_write_select} <b>shaBid</b>.</li>
                <li>
                  {strings.mycrypto_copy_paste_values}
                  <ul>
                    <li>
                      <div>
                        <i>_hash bytes32</i>
                      </div>
                      <code>0x{sha3(name.split('.')[0])}</code>
                    </li>
                    <li>
                      <i>_owner address</i>: {strings.mycrypto_bid_select_owner}
                    </li>
                    <li>
                      <div>
                        <i>_value byte256</i>
                      </div>
                      <code>{value * 10**18}</code>
                    </li>
                    <li>
                      <div>
                        <i>_salt bytes32</i>
                      </div>
                      <code>{salt}</code>
                    </li>
                  </ul>
                </li>
                <li>{strings.mycrypto_read}</li>
              </ol>
            </li>
            <b>{strings.mycrypto_remember_to_save_bid_data}</b>
            <li>
              {strings.mycrypto_copy_response}
              <FormControl value={shaBid} onChange={this.changeShaBid} type='text' placeholder='0x...' />
            </li>
            <li>{strings.mycrypto_select_rif}</li>
            <li>{strings.mycrypto_access}</li>
            <li>{strings.mycrypto_on_read_write_select} <b>transferAndCall</b>.</li>
            <li>
              {strings.mycrypto_copy_paste_values}
              <ul>
                <li>
                  <div>
                    <i>_to address</i>
                  </div>
                  <code>0x2acc95758f8b5f583470ba265eb685a8f45fc9d5</code>
                </li>
                <li>
                    <div>
                      <i>_value uint256</i> (or a higher value)
                    </div>
                    <code>{value * 10**18}</code>
                </li>
                <li>
                  <div>
                    <i>_data bytes</i>
                  </div>
                  <code>{!shaBid ? '...' : `0x1413151f${shaBid.slice(2)}00000000000000000000000000000000000000000000000000000000`}</code>
                </li>
              </ul>
            </li>
            <li>{strings.mycrypto_choose_checkout}</li>
            <li>{strings.mycrypto_check_gas} <a href='https://stats.rsk.co/' target='_blank' rel='noopener noreferrer'>RSK stats</a>.</li>
            <li>{strings.mycrypto_write}</li>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <LinkToMyCryptoInteractComponent />
        </Modal.Footer>
      </Modal>
    );
  }
};

export const MyCryptoModal = multilanguage(MyCryptoModalComponent);
