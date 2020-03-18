pragma solidity 0.5.8;

import './TrustlessFund.sol';

contract TrustlessFundFactory {
  mapping(uint => address) funds;
  uint public nextId;

  // Create TrustlessFund
  // TODO: Allow an array of addresses for multisig emergency exit
  function createFund(uint expiration) public {
    require(funds[nextId] == address(0), 'id already in use');
    TrustlessFund fund = new TrustlessFund(expiration);
    funds[nextId] = address(fund);
    nextId++;
  }

  // TODO: Get funds owned by an address

  // Get a fund by id
  function getFund(uint id) public returns(address) {
    return funds[id];
  }
}