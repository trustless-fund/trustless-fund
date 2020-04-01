pragma solidity 0.5.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

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
    * @notice Tracks token balance and whether it exists in
              the lookup table.
  */
  struct Token {
    uint balance;
    bool exists;
  }

  /**
    * @notice Token look up table for front-end access.
  */
  address[] public tokenLUT;

  /**
    * @notice Maps token address to token struct.
  */
  mapping(address => Token) public tokens;

  /*** EVENTS ***/

  /**
    * @notice Emits when a deposit is made.
  */
  event Deposit(address indexed _from, uint _value, address indexed _token);

  /**
    * @notice Emits when a withdrawal is made.
  */
  event Withdraw(address indexed _to, uint _value, address indexed _token);

  /**
    * @notice Emits when the expiration is increased.
  */
  event IncreaseTime(uint _newExpiration);

  /**
    * @notice Emits when the beneficiary is updated.
  */
  event UpdateBeneficiary(address indexed _newBeneficiary);

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

  /**
    * @dev Returns the length of the tokenLUT array.
  */
  function getTokenSize() public view returns(uint) {
    return tokenLUT.length;
  }

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
      tokens[_token].balance += _amount;
      if(tokens[_token].exists == false) {
        tokens[_token].exists = true;
        tokenLUT.push(_token);
      }
      emit Deposit(msg.sender, _amount, _token);
    }
    else {
      IERC20 token = IERC20(_token);
      require(token.transferFrom(msg.sender, address(this), _amount), 'transfer failed');
      tokens[_token].balance += _amount;
      if(tokens[_token].exists == false) {
        tokens[_token].exists = true;
        tokenLUT.push(_token);
      }
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
      require(tokens[_token].balance >= _amount, 'not enough balance');
      tokens[_token].balance -= _amount;
      (bool success, ) = msg.sender.call.value(_amount)("");
      require(success, "Transfer failed.");
      emit Withdraw(msg.sender, _amount, _token);
    } else {
      IERC20 token = IERC20(_token);
      require(tokens[_token].balance >= _amount, 'not enough balance');
      tokens[_token].balance -= _amount;
      require(token.transfer(msg.sender, _amount), 'transfer failed');
      emit Withdraw(msg.sender, _amount, _token);
    }
  }

  /**
    * @dev Increase the time until expiration. Only the owner can perform this.
    * @param _newExpiration New date time in seconds when timelock expires.
  */
  function increaseTime(uint _newExpiration) public onlyOwner() {
    require(_newExpiration > expiration, 'can only increase expiration');
    expiration = _newExpiration;
    emit IncreaseTime(_newExpiration);
  }

  /**
    * @dev Update the beneficiary address. Only the owner can perform this.
    * @param _newBeneficiary New beneficiary address.
  */
  function updateBeneficiary(address _newBeneficiary) public onlyOwner() {
    require(_newBeneficiary != beneficiary, 'same beneficiary');
    require(_newBeneficiary != address(0), 'cannot set as burn address');
    beneficiary = _newBeneficiary;
    emit UpdateBeneficiary(_newBeneficiary);
  }
}