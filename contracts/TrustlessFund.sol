pragma solidity 0.5.8;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol"
import "@openzeppelin/contracts/math/SafeMath.sol"

contract TrustlessFund {
  using SafeMath for uint;

  /*** STORAGE VARIABLES ***/

  uint expiration;
  address beneficiary;
  address owner;

  mapping(address => uint) balances;

  /*** EVENTS ***/



  /*** MODIFIERS ***/

  /**
    * @dev Throws if called by any account other than the owner.
  */
  modifier onlyOwner() {
    require(owner == msg.sender, "Ownable: caller is not the owner");
    _;
  }

  /**
    * @dev Throws if the contract has not yet reached its expiration.
  */
  modifier isExpired() {
    require(expiration < block.timestamp, 'contract is still locked');
    _;
  }

  /**
    * @dev Throws if msg.sender is not the beneficiary.
  */
  modifier onlyBeneficiary() {
    require(msg.sender == beneficiary, 'only the beneficiary can perform this function');
    _;
  }

  /**
    * @param _expiration Date time in seconds when timelock expires.
    * @param _beneficiary Address permitted to withdraw funds after unlock.
    * @param _owner The contract owner.
  */
  constructor(uint _expiration, address _beneficiary, address _owner) public {
    expiration = _expiration;
    beneficiary = _beneficiary;
    owner = _owner;
  }

  /*** VIEW/PURE FUNCTIONS ***/

  /**
    * @dev Returns the address of the current owner.
  */
  function getOwner() public view returns (address) {
    return owner;
  }

  /**
    * @dev Returns the contract's spending allowance of a user's tokens.
    * @param _token The token address.
    * @param _spender The user to check the spending allowance for.
  */
  function tokenAllowance(address _token, address _spender) public view returns (uint) {
    IERC20 token = IERC20(_token);
    return token.allowance(_spender, address(this));
  }

  /*** OTHER FUNCTIONS ***/

  /**
    * @dev Approves an ERC20 token to be spent by the contract.
           Returns true if successful.
      @param _token Address of the token to be approved.
      @param _amount Amount approved for transfer.
  */
  function approveToken(address _token, uint _amount) public returns (bool) {
    IERC20 token = IERC20(_token);
    require(token.approve(address(this), _amount), 'failed approval');
    return true;
  }

  /**
    * @dev Allows a user to deposit ETH or an ERC20 into the contract.
           If _token is 0 address, deposit ETH.
    * @param _amount The amount to deposit.
    * @param _token The token to deposit.
  */
  function deposit(uint _amount, address _token) public payable {
    if(_token == address(0)) {
      require(msg.value == _amount, 'incorrect amount');
      balances[_token] += _amount;
    }
    else {
      IERC20 token = IERC20(_token);
      require(token.transferFrom(msg.sender, address(this), _amount), 'transfer failed');
      balances[_token] += _amount;
    }
  }

  /**
    * @dev Withdraw funds to msg.sender, but only if the timelock is expired 
           and msg.sender is the beneficiary.
           If _token is 0 address, withdraw ETH.
    * @param _amount The amount to withdraw.
    * @param _token The token to withdraw.
  */
  function withdraw(uint _amount, address _token) public isExpired() onlyBeneficiary() {
    if(_token == address(0)) {
      require(address(this).balance >= _amount, 'not enough balance');
      balances[_token] -= _amount;
      (bool success, ) = msg.sender.call.value(_amount)("");
      require(success, "Transfer failed.");
    } else {
      require(token.balanceOf(address(this)) >= _amount, 'not enough balance');
      IERC20 token = IERC20(_token);
      token.transfer(address(this), msg.sender, _amount);
      balances[_token] -= _amount;
    }
  }
}