import React from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import { keccak256 as sha3 } from 'js-sha3';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';

export const MyCryptoModal = multilanguage(props => {
  const { strings, name } = props;

  return (
    <Modal size='lg' show={props.showMyCrypto} onHide={props.changeShowMyCrypto}>
      <Modal.Header closeButton>
        <h3>{strings.mycrypto_search_title}</h3>
        <code>{name}</code>
      </Modal.Header>
      <Modal.Body>
        <ol>
          <li>{strings.mycrypto_select_network}</li>
          <li>{strings.mycrypto_go_to_interact}</li>
          <li>{strings.mycrypto_select_registrar}</li>
          <li>{strings.mycrypto_access}</li>
          <li>{strings.mycrypto_on_read_write_select} <b>state</b></li>
          <li>
              <div>
                {strings.my_crypto_copy_paste_on} <i>node bytes32</i>
              </div>
              <code>0x{sha3(name.split('.')[0])}</code>
          </li>
          <li>{strings.mycrypto_read}</li>
        </ol>
        <Table striped bordered>
          <thead>
            <tr>
            <th>{strings.read}</th>
            <th>{strings.state}</th>
            <th>{strings.next_action}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td><strong>0</strong></td>
            <td>{strings.open}</td>
            <td><Link to={`/start?domain=${props.name}`}>{strings.process_step_1}</Link></td>
            </tr>
            <tr>
            <td><strong>1</strong></td>
            <td>{strings.auction}</td>
            <td><Link to={`/bid?domain=${props.name}`}>{strings.process_step_2}</Link></td>
            </tr>
            <tr>
            <td><strong>2</strong></td>
            <td>{strings.owned}</td>
            <td><Link to={`/finalize?domain=${props.name}`}>{strings.process_step_4}</Link></td>
            </tr>
            <tr>
            <td><strong>4</strong></td>
            <td>{strings.reveal}</td>
            <td><Link to={`/unseal?domain=${props.name}`}>{strings.process_step_3}</Link></td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={() => window.open('https://mycrypto.com/contracts/interact', '_blank')}>{strings.go_to_mycrypto}</Button>
      </Modal.Footer>
    </Modal>
  )
});
