import React from 'react';
import { txTypes } from './types';
import { Link } from 'react-router-dom';

export const txDisplay = params => {
  if (!params) return null;
  switch (params.type) {
    case txTypes.START_AUCTION: return (
      <p>Auction for {params.domain} started! <Link to={`/bid?domain=${params.domain}`}>Make your bid</Link></p>
    )
  }
}