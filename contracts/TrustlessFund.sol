pragma solidity 0.5.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
// import "@openzeppelin/contracts/utils/Address.sol";

contract TrustlessFund is Ownable {
  using SafeMath for uint;

  /*** STORAGE VARIABLES ***/

  /**
    * @notice Date time in seconds when timelock expires.
  */
  uint public expiration;

  /**
    * @notice Address permitted to withdraw funds after unlock.
  */
  address public beneficiary;

  /**
    * @notice Token balances.
  */
  mapping(address => uint) balances;

  /*** EVENTS ***/

  /**
    * @notice Emits when a deposit is made.
  */
  event Deposit(address indexed _from, uint _value, address indexed _token);

  /**
    * @notice Emits when a withdrawal is made.
  */
  event Withdraw(address indexed _to, uint _value, address indexed _token);

  // Increase Time

  // Update Beneficiary

  /*** MODIFIERS ***/

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
    transferOwnership(_owner);
  }

  /*** VIEW/PURE FUNCTIONS ***/



  /*** OTHER FUNCTIONS ***/

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
      emit Deposit(msg.sender, _amount, _token);
    }
    else {
      IERC20 token = IERC20(_token);
      require(token.transferFrom(msg.sender, address(this), _amount), 'transfer failed');
      balances[_token] += _amount;
      emit Deposit(msg.sender, _amount, _token);
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
      emit Withdraw(msg.sender, _amount, _token);
    } else {
      IERC20 token = IERC20(_token);
      require(token.balanceOf(address(this)) >= _amount, 'not enough balance');
      balances[_token] -= _amount;
      require(token.transfer(msg.sender, _amount), 'transfer failed');
      emit Withdraw(msg.sender, _amount, _token);
    }
  }

  /**
    * @dev Increase the time until spender. Only the owner can perform this.
    * @param _newExpiration New date time in seconds when timelock expires.
  */
  function increaseTime(uint _newExpiration) public onlyOwner() {
    require(_newExpiration > expiration, 'can only increase expiration');
    expiration = _newExpiration;
  }

  /**
    * @dev Update the beneficiary address. Only the owner can perform this.
    * @param _newBeneficiary New beneficiary address.
  */
  function updateBeneficiary(address _newBeneficiary) public onlyOwner() {
    require(_newBeneficiary != beneficiary, 'same beneficiary');
    beneficiary = _newBeneficiary;
  }
}