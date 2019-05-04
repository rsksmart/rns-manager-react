import React from 'react';
import { Modal } from 'react-bootstrap';
import { keccak256 as sha3 } from 'js-sha3';
import { multilanguage } from 'redux-multilanguage';
import { LinkToMyCryptoInteractComponent } from '../../../components';

export const MyCryptoModal = multilanguage(props => {
  const { strings, showMyCrypto, changeShowMyCrypto, name, value, salt } = props;

  return (
    <Modal size='lg' show={showMyCrypto} onHide={changeShowMyCrypto}>
      <Modal.Header closeButton>
          <h3>{strings.mycrypto_unseal_title}</h3>
          <code>{name}</code>
        </Modal.Header>
      <Modal.Body>
        <ol>
          <li>{strings.mycrypto_select_network}</li>
          <li>{strings.mycrypto_go_to_interact}</li>
          <li>{strings.mycrypto_select_registrar}</li>
          <li>{strings.mycrypto_access}</li>
          <li>{strings.mycrypto_on_read_write_select} <b>unsealBid</b>.</li>
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
                <div>
                  <i>_value uint256</i>
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
});
