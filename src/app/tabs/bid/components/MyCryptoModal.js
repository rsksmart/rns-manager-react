import React, { Component } from 'react';
import { Modal, FormControl } from 'react-bootstrap';
import { keccak256 as sha3 } from 'js-sha3';

export class MyCryptoModal extends Component {
  constructor (props) {
    super(props);

    this.state = { shaBid: '' };

    this.changeShaBid = this.changeShaBid.bind(this);
  }

  changeShaBid (event) {
    this.setState({ shaBid: event.target.value });
  }

  render () {
    const { showMyCrypto, changeShowMyCrypto, name, value, salt } = this.props;
    const { shaBid } = this.state;

    return (
      <Modal size='lg' show={showMyCrypto} onHide={changeShowMyCrypto}>
        <Modal.Header closeButton>
          <h3>Bid for <code>{name}</code> on MyCrypto</h3>
        </Modal.Header>
        <Modal.Body>
          <ol>
            <li>Go to My Crypto contract interaction on your <a target='_blank' rel='noopener noreferrer' href='https://mycrypto.com/contracts/interact' class='modal-link'>browser</a> or native app.</li>
            <li>Select <b>RSK MainNet</b> network on the top right selector.</li>
            <li>
              First we are going to seal the bid:
              <ol>
                <li>Select <b>RNS Registrar</b> contract on <i>Existing Contract</i> selector.</li>
                <li>Access!</li>
                <li>On <i>Read / Write Contract</i> select <b>shaBid</b>.</li>
                <li>
                  Copy this values and paste them in MyCrypto fields:
                  <ul>
                    <li>
                      <div>
                        on <i>_hash bytes32</i>
                      </div>
                      <code>0x{sha3(name.split('.')[0])}</code>
                    </li>
                    <li><i>_owner address</i>: the domain's owner. You may want to use your wallet address.</li>
                    <li>
                      <div>
                        on <i>_value byte256</i>
                      </div>
                      <code>{value * 10**18}</code>
                    </li>
                    <li>
                      <div>
                        on <i>_salt bytes32</i>
                      </div>
                      <code>{salt}</code>
                    </li>
                  </ul>
                </li>
                <li>Read!</li>
              </ol>
            </li>
            <b>Remember you must save all this data to unseal the bid on reveal phase!</b>
            <li>
              Copy the response here:
              <FormControl value={shaBid} onChange={this.changeShaBid} type='text' placeholder='0x...' />
              <i id='invalid-shabid-mycrypto'>The hash is invalid. Copy and paste it again please.</i>
            </li>
            <li>On MyCrypto, select <b>RIF</b> contract on <i>Existing Contract</i> selector.</li>
            <li>Access!</li>
            <li>On <i>Read / Write Contract</i> select <b>transferAndCall</b>.</li>
            <li>
              Copy this values and paste them in MyCrypto fields:
              <ul>
                <li>
                  <div>
                    on <i>_to address</i>
                  </div>
                  <code>0x2acc95758f8b5f583470ba265eb685a8f45fc9d5</code>
              </li>
              <li>
                  <div>
                    on <i>_value uint256</i> (or a higher value)
                  </div>
                  <code>{value * 10**18}</code>
              </li>
              <li>
                  <div>
                    on <i>_data bytes</i>
                  </div>
                  <code>{!shaBid ? '...' : `0x1413151f${shaBid.slice(2)}00000000000000000000000000000000000000000000000000000000`}</code>
                </li>
              </ul>
            </li>
            <li>Choose your checkout method.</li>
            <li>Check the gas according to <a href='https://stats.rsk.co/'>RSK stats</a>.</li>
            <li>Write!</li>
          </ol>
        </Modal.Body>
      </Modal>
    );
  }
};
