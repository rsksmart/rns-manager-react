import React from 'react';
import { Link } from 'react-router-dom';
import AddToCalendar from 'react-add-to-calendar';
import { Button } from 'react-bootstrap';
import { revealPeriod, multiChainResolver } from '../../config/contracts';
import { txTypes } from './types';


const unsealEvent = (domain, registrationDate, title) => ({
  title: `${title} ${domain}`,
  description: `https://manager.rns.rsk.co/search?domain=${domain}`,
  location: '',
  startTime: new Date((registrationDate - revealPeriod) * 1000).toString(),
  endTime: new Date(registrationDate * 1000).toString(),
});

const finalizeEvent = (domain, registrationDate, title) => ({
  title: `${title} ${domain}`,
  description: `https://manager.rns.rsk.co/search?domain=${domain}`,
  location: '',
  startTime: new Date(registrationDate * 1000).toString(),
  endTime: new Date((registrationDate + 86400) * 1000).toString(),
});

const downloadBid = (domain, value, salt) => {
  const text = `domain: ${domain}\nvalue: ${value}\nsalt: ${salt}`;
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', `bid - ${Date.now().toString()}.txt`);
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();

  document.body.removeChild(element);
};

const displaySetTx = (title, description, action = null) => ({
  title,
  description: `${title}: ${description}`,
  action,
});

export default strings => (params) => {
  if (!params) return null;
  switch (params.type) {
    case txTypes.START_AUCTION: return {
      title: strings.notifications_start_auction_title,
      action: <Link to={`/bid?domain=${params.name}`} className="btn btn-primary">{strings.notifications_start_auction_action}</Link>,
    };
    case txTypes.BID_AUCTION: return {
      title: strings.notifications_bid_title,
      action: (
        <React.Fragment>
          <p>
            {strings.notifications_bid_dont_forget}
            {params.registrationDate && <Button variant="link"><AddToCalendar event={unsealEvent(params.name, params.registrationDate, strings.notifications_bid_event_title)} /></Button>}
          </p>
          <hr />
          <p>
            {strings.notifications_bid_download_message}
            <Button variant="link" onClick={() => downloadBid(params.name, params.value, params.salt)}>{strings.download}</Button>
.
          </p>
        </React.Fragment>
      ),
    };
    case txTypes.UNSEAL_AUCTION: return {
      title: strings.notifications_unseal_title,
      action: (
        <p>
          {strings.notifications_unseal_dont_forget}
          <br />
          {params.registrationDate && <Button variant="link"><AddToCalendar event={finalizeEvent(params.name, params.registrationDate, strings.notifications_unseal_event_title)} /></Button>}
        </p>
      ),
    };
    case txTypes.FINALIZE_AUCTION: return {
      title: strings.notifications_finalize_action,
      action: <Link to={`/publicResolver?action=addr&defaultValue=${params.addr}`} className="btn btn-primary">{strings.notifications_finalize_action}</Link>,
    };
    case txTypes.SET_OWNER: return displaySetTx(strings.notifications_new_owner, params.value);
    case txTypes.SET_RESOLVER: return displaySetTx(
      strings.notifications_new_resolver,
      params.value,
      params.value.toLowerCase() === multiChainResolver
        && (
          <Link
            to="/multiChainResolver?action=chain_addr&defaultValue=btcaddress"
            className="btn btn-primary"
          >
              {strings.set_address}
          </Link>
        ),
    );
    case txTypes.SET_TTL: return displaySetTx(strings.notifications_new_ttl, params.value);
    case txTypes.SET_SUBNOODE_OWNER: return displaySetTx(
      strings.notifications_new_subdomain_owner,
      params.owner,
    );
    case txTypes.SET_ADDR: return displaySetTx(strings.notifications_new_addr, params.value);
    case txTypes.SET_CONTENT: return displaySetTx(strings.notifications_new_content, params.value);
    case txTypes.SET_CHAIN_ADDR: return displaySetTx(strings.notifications_new_chain_addr, `${params.chainId} - ${params.value}`);
    case txTypes.SET_REVERSE_RESOLUTION: return displaySetTx(
      strings.notifications_new_reverse_resolution,
      params.value,
    );
    default: return null;
  }
};
