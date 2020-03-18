pragma solidity 0.5.8;

import './TrustlessFund.sol';

contract TrustlessFundFactory {
  /*** STORAGE VARIABLES ***/

  mapping(uint => address) funds;
  uint public nextId;

  /*** PURE/VIEW FUNCTIONS ***/

  /**
    * @dev Given an id, return the corresponding fund address.
    * @param _id The id of the fund.
  */
  function getFund(uint _id) public view returns(address) {
    return funds[id];
  }

  /*** OTHER FUNCTIONS ***/

  /**
    * @dev Deploy a TrustlessFund contract.
    * @param _expiration Date time in seconds when timelock expires.
    * @param _beneficiary Address permitted to withdraw funds after unlock.
  */
  function createFund(uint _expiration, address _beneficiary) public {
    require(funds[nextId] == address(0), 'id already in use');
    TrustlessFund fund = new TrustlessFund(_expiration, _beneficiary, msg.sender);
    funds[nextId] = address(fund);
    nextId++;
  }

  // TODO: Get funds owned by an address
}