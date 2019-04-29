import React from 'react';
import { Modal, Table } from 'react-bootstrap';
import { keccak256 as sha3 } from 'js-sha3';
import { Link } from 'react-router-dom';

export const MyCryptoModal = props => (
  <Modal size='lg' show={props.showMyCrypto} onHide={props.changeShowMyCrypto}>
    <Modal.Header closeButton>
      <h3>Search <code>{props.name}</code> status on MyCrypto</h3>
    </Modal.Header>
    <Modal.Body>
      <ol>
        <li>Go to My Crypto contract interaction on your <a target='_blank' href='https://mycrypto.com/contracts/interact' rel='noopener noreferrer' className='modal-link'>browser</a> or native app.</li>
        <li>Select <b>RSK MainNet</b> network on the top right selector.</li>
        <li>Select <b>RNS Registrar</b> contract on <i>Existing Contract</i> selector.</li>
        <li>Access!</li>
        <li>On <i>Read / Write Contract</i> select <b>state</b></li>
        <li>
            <div>
              Copy and paste this hash on <i>node bytes32</i>
            </div>
            <code>0x{sha3(props.name.split('.')[0])}</code>
        </li>
        <li>Read!</li>
      </ol>
      <Table striped bordered>
        <thead>
          <tr>
          <th>Number</th>
          <th>State</th>
          <th>Next action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td><strong>0</strong></td>
          <td>Open</td>
          <td><Link to={`/start?domain=${props.name}`}>Start auction</Link></td>
          </tr>
          <tr>
          <td><strong>1</strong></td>
          <td>Auction</td>
          <td>Bid in the auction</td>
          </tr>
          <tr>
          <td><strong>2</strong></td>
          <td>Owned</td>
          <td>Finalize the auction</td>
          </tr>
          <tr>
          <td><strong>4</strong></td>
          <td>Reveal</td>
          <td>Unseal your bid</td>
          </tr>
        </tbody>
      </Table>
    </Modal.Body>
  </Modal>
);
