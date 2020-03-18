pragma solidity 0.5.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"

contract TrustlessFund {
  uint expiration;
  address beneficiary;
  address owner;

  constructor(uint _expiration, address _beneficiary, address _owner) public {
    expiration = _expiration;
    beneficiary = _beneficiary;
    owner = _owner;
  }

  /**
    * @dev Returns the address of the current owner.
  */
  function owner() public view returns (address) {
    return owner;
  }

  function approveToken(address _token, uint _amount) public {
    ERC20 token = ERC20(_token);
    require(token.approve(address(this), _amount), 'failed approval');
  }

  function tokenAllowance(address _token, address _owner) public view returns (uint) {
    ERC20 token = ERC20(_token);
    return token.allowance(_owner, address(this));
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

  /**
    * @dev Throws if called by any account other than the owner.
  */
  modifier onlyOwner() {
    require(owner == msg.sender, "Ownable: caller is not the owner");
    _;
  }
}