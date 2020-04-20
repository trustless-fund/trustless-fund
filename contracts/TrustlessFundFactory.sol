pragma solidity 0.5.16;

import './TrustlessFund.sol';

contract TrustlessFundFactory {
  /*** STORAGE VARIABLES ***/

  /**
    * @notice Maps unique IDs to funds.
  */
  mapping(uint => address) funds;

  /**
    * @notice Maps user address to their corresponding funds.
  */
  mapping(address => uint[]) userFunds;

  /**
    * @notice Get the next fund ID.
  */
  uint public nextId;

  /*** EVENTS ***/

  /**
    * @notice Emits when a fund is created.
  */
  event CreateFund(
    uint expiration,
    address indexed beneficiary,
    address indexed owner
  );

  /*** PURE/VIEW FUNCTIONS ***/

  /**
    * @dev Given an id, return the corresponding fund address.
    * @param _id The id of the fund.
  */
  function getFund(uint _id) public view returns(address) {
    return funds[_id];
  }

  /**
    * @dev Given a user address, return all owned funds.
    * @param _user The address of the user.
  */
  function getUserFunds(address _user) public view returns(uint[] memory) {
    return userFunds[_user];
  }

  /*** OTHER FUNCTIONS ***/

  /**
    * @dev Deploy a TrustlessFund contract.
    * @param _expiration Date time in seconds when timelock expires.
    * @param _beneficiary Address permitted to withdraw funds after unlock.
  */
  function createFund(uint _expiration, address _beneficiary) public {
    require(funds[nextId] == address(0), 'id already in use');
    require(_beneficiary != address(0), 'beneficiary is burn address');
    TrustlessFund fund = new TrustlessFund(_expiration, _beneficiary, msg.sender);
    funds[nextId] = address(fund);
    userFunds[msg.sender].push(nextId);
    nextId++;
    emit CreateFund(_expiration, _beneficiary, msg.sender);
  }
}