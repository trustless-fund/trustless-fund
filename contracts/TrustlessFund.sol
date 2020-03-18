pragma solidity 0.5.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"

contract TrustlessFund {
  uint expiration;
  address beneficiary

  constructor(uint _expiration, address _beneficiary) public {
    expiration = _expiration;
    beneficiary = _beneficiary;
  }

  function approve(address _token, uint _amount) public {
    // token.approve(address(this), _amount)
  }

  function deposit(uint _amount, address _token) public payable {
    if(_token == 0) {
      require(msg.value == _amount, 'incorrect amount');
      // Update user balance
    }
    else {
      ERC20 token = ERC20(_token);
      token.transferFrom(msg.sender, address(this), _amount);
      // Update user balance
    }
  }
}