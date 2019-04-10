import React from 'react';
import { txTypes } from './types';
import { Link } from 'react-router-dom';
import AddToCalendar from 'react-add-to-calendar';
import { revealPeriod } from '../../config/contracts';

const unsealEvent = (domain, registrationDate) => ({
  title: `Unseal bid for ${domain}`,
  description: `Go to https://manager.rns.rsk.co/unseal?domain=${domain} to unseal your bid!`,
  location: '',
  startTime: new Date((registrationDate - revealPeriod) * 1000).toString(),
  endTime: new Date(registrationDate * 1000).toString()
});

const finalizeEvent = (domain, registrationDate) => ({
  title: `Finalize auction for ${domain}`,
  description: `Go to https://manager.rns.rsk.co/finalize?domain=${domain} to finalize the auciton!`,
  location: '',
  startTime: new Date(registrationDate * 1000).toString(),
  endTime: new Date((registrationDate + 86400) * 1000).toString()
});


export const txDisplay = params => {
  if (!params) return null;
  switch (params.type) {
    case txTypes.START_AUCTION: return (
      <p>Auction for {params.domain} started! <Link to={`/bid?domain=${params.domain}`}>Make your bid</Link></p>
    )
    case txTypes.BID_AUCTION: return (
      <React.Fragment>
        <p>
          Bid emitted for {params.domain}.<br />
          Don't forget to unseal the bid!
        </p>
        {
          params.registrationDate && <AddToCalendar event={unsealEvent(params.domain, params.registrationDate)} />
        }
      </React.Fragment>
    )
    case txTypes.UNSEAL_AUCTION: return (
      <React.Fragment>
        <p>
          Unsealed bid for {params.domain}.<br />
          Don't forget to finalize the auction!
        </p>
        {
          params.registrationDate && <AddToCalendar event={finalizeEvent(params.domain, params.registrationDate)} />
        }
      </React.Fragment>
    )
    case txTypes.FINALIZE_AUCTION: return (
      <p>
        Auction finalized. You are {params.domain} owner!<br />
        <Link to={`/publicResolver?domain=${params.domain}`}>Set an addr resolution</Link> for your new domain.
      </p>
    )
    case txTypes.SET_OWNER: return (
      <p>
        New owner for {params.domain}: {params.owner}
      </p>
    )
    case txTypes.SET_RESOLVER: return (
      <p>
        New resolver for {params.domain}: {params.resolver}
      </p>
    )
    case txTypes.SET_TTL: return (
      <p>
        New TTL for {params.domain}: {params.ttl}
      </p>
    )
    case txTypes.SET_SUBNOODE_OWNER: return (
      <p>
        New owner for {`${params.child}.${params.parent}`}: {params.owner}
      </p>
    )
    default: return null;
  }
}