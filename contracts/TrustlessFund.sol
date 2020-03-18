pragma solidity 0.5.8;

contract TrustlessFund {
  uint expiration;

  constructor(uint _expiration) public {
    expiration = _expiration;
  }

  // function deposit(uint _amount) public payable {
  //   require(msg.value == _amount, 'incorrect amount');

  // }
}