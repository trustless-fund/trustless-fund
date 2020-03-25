# Trustless Fund
An advanced timelock for ETH and ERC-20 assets.

**In Progress**

## Features
- 0 Fees
- Non-Custodial
- Unlimited Funds
- Lock Period Increases
- Beneficiary Management

## Contract Interfaces
Contracts will soon be available on: Mainnet, Ropsten and Rinkeby.

### TrustlessFundFactory.sol
Factory to deploy new TrustlessFund contracts.

**function getFund(uint _id) public view returns(address)**
Given an id, return the corresponding fund address.

**function getUserFunds(address _user) public view returns(address[] memory)**
Given a user address, return all owned funds.

**function getFee() public view returns(uint)**
Returns the fee, in wei, to open a contract.

**function createFund(uint _expiration, address _beneficiary) public payable**
Deploy a TrustlessFund contract.

**function setFee(uint _newFee) public onlyOwner()**
Sets the fee, in wei, to open a contract.
This feature can be disabled if the owner renounces ownership.

**function collectFees(uint _amount) public onlyOwner()**
Collect accrued fees.
This feature can be disabled if the owner renounces ownership.

### TrustlessFund.sol
Contract for individual funds.

**function deposit(uint _amount, address _token) public payable**
Allows a user to deposit ETH or an ERC20 into the contract.
If `_token` is 0 address, deposit ETH.

**function withdraw(uint _amount, address _token) public isExpired() onlyBeneficiary()**
Withdraw funds to msg.sender, but only if the timelock is expired and msg.sender is the beneficiary.
If `_token` is 0 address, withdraw ETH.

**function increaseTime(uint _newExpiration) public onlyOwner()**
Increase the time until expiration. Only the owner can perform this.
This feature can be disabled if the owner renounces ownership.

**function updateBeneficiary(address _newBeneficiary) public onlyOwner()**
Update the beneficiary address. Only the owner can perform this.
This feature can be disabled if the owner renounces ownership.

## Contributing
Contributions are always welcome and much appreciated. If you're interested in contributing, take a look at some our issues and get in touch with us on [Discord](https://discord.gg/BFx9EP).