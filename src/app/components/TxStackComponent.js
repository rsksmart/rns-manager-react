import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class TxStackComponent extends Component {
  render () {
    const { transactions } = this.props;

    return transactions.map(tx => (
      <Alert key={tx.id} variant='success'>
        {tx.txHash}<br />
        {!tx.mined ? 'Pending...' : 'Confirmed'}
      </Alert>
      )
    )
  }
}

export default TxStackComponent;
