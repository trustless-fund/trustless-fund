pragma solidity 0.5.8;

import './TrustFund.sol';

contract TrustFundFactory {
  mapping(uint => address) funds;
  uint nextId;

  // Create TrustFund
  // TODO: Allow an array of addresses for multisig emergency exit
  function createFund(uint expiration) public {
    require(funds[nextId] == address(0), 'id already in use');
    TrustFund fund = new TrustFund(expiration);
    funds[nextId] = address(fund);
    nextId++;
  }

  // TODO: Get funds owned by an address

  // TODO: Get a fund by id
}