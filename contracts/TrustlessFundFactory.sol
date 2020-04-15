pragma solidity 0.5.16;

import './TrustlessFund.sol';
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract TrustlessFundFactory is Ownable {
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

  /**
    * @notice The fee, in wei, charged to open a contract.
              Note: This will remain 0 indefinitely.
  */
  uint public fee;

  /**
    * @notice The total amount of fees, in wei, collected.
  */
  uint public feesAccrued;

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

  /**
    * @dev Returns the fee, in wei, to open a contract.
  */
  function getFee() public view returns(uint) {
    return fee;
  }

  /*** OTHER FUNCTIONS ***/

  /**
    * @dev Deploy a TrustlessFund contract.
    * @param _expiration Date time in seconds when timelock expires.
    * @param _beneficiary Address permitted to withdraw funds after unlock.
  */
  function createFund(uint _expiration, address _beneficiary) public payable {
    require(funds[nextId] == address(0), 'id already in use');
    require(msg.value == fee, 'must pay fee');
    TrustlessFund fund = new TrustlessFund(_expiration, _beneficiary, msg.sender);
    feesAccrued += fee;
    funds[nextId] = address(fund);
    userFunds[msg.sender].push(nextId);
    nextId++;
    emit CreateFund(_expiration, _beneficiary, msg.sender);
  }

  /**
    * @dev Sets the fee, in wei, to open a contract.
    * @param _newFee The new fee, in wei.
  */
  function setFee(uint _newFee) public onlyOwner() {
    fee = _newFee;
  }

  /**
    * @dev Collect accrued fees.
    * @param _amount The amount to collect, in wei.
  */
  function collectFees(uint _amount) public onlyOwner() {
    require(feesAccrued > 0, 'no fees accrued');
    require(_amount < feesAccrued, 'not enough fees accrued');
    feesAccrued -= _amount;
    (bool success, ) = msg.sender.call.value(_amount)("");
    require(success, "Transfer failed.");
  }
}