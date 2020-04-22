const { accounts, contract, web3 } = require('@openzeppelin/test-environment');
const [ owner, beneficiary, user ] = accounts;
const { expect } = require('chai');
const {
  constants,
  expectEvent,
  expectRevert
} = require('@openzeppelin/test-helpers');

const TrustlessFund = contract.fromArtifact('TrustlessFund');
const Token = contract.fromArtifact('Token');

describe('TrustlessFund', () => {
  beforeEach(async () => {
    this.fund = await TrustlessFund.new(1, beneficiary, owner, {from: owner});
  });

  describe('Deposits', () => {
    it('returns correct amount of deposited ETH', async () => {
      await this.fund.deposit('100', constants.ZERO_ADDRESS, {from: owner, value: '100'});
      const balance = await web3.eth.getBalance(this.fund.address);
      expect(balance).to.equal('100');
    });

    it('reverts if not supplied with correct amount of ETH', async () => {
      await expectRevert(
        this.fund.deposit('100', constants.ZERO_ADDRESS, {from: owner, value: '50'}),
        'incorrect amount'
      );
    });

    it('emits the deposit event', async () => {
      const receipt = await this.fund.deposit('100', constants.ZERO_ADDRESS, {from: owner, value: '100'});
      expectEvent(receipt, 'Deposit', {
        _from: owner,
        _value: '100',
        _token: constants.ZERO_ADDRESS
      });
    });

    describe('Deploy token', () => {
      beforeEach(async () => {
        this.token = await Token.new({from: owner});
        await this.token.mint(owner, 1000, {from: owner});
      });

      it('returns correct amount of deposited ERC20', async () => {
        await this.token.approve(this.fund.address, '100', {from: owner});
        await this.fund.deposit('100', this.token.address, {from: owner});
        const balance = await this.token.balanceOf(this.fund.address);
        const userBalance = await this.token.balanceOf(owner);
        expect(balance.toString()).to.equal('100');
        expect(userBalance.toString()).to.equal('900');
      });

      it('reverts if insufficient ERC20 balance', async () => {
        await this.token.approve(this.fund.address, '1100', {from: owner});
        await expectRevert(
          this.fund.deposit('1100', this.token.address, {from: owner}),
          "ERC20: transfer amount exceeds balance"
        );
      });
    });
  });

  describe('Withdrawals', () => {
    beforeEach(async () => {
      await this.fund.deposit('100', constants.ZERO_ADDRESS, {from: owner, value: '100'});
    });

    it('successfully withdraws eth', async () => {
      await this.fund.withdraw('50', constants.ZERO_ADDRESS, {from: beneficiary});
      const balance = await web3.eth.getBalance(this.fund.address);
      expect(balance).to.equal('50');
    });

    it('reverts if msg.sender is not beneficiary', async () => {
      await expectRevert(
        this.fund.withdraw('50', constants.ZERO_ADDRESS, {from: user}),
        'only the beneficiary can perform this function'
      );
    });

    it('reverts if not enough balance', async () => {
      await expectRevert(
        this.fund.withdraw('101', constants.ZERO_ADDRESS, {from: beneficiary}),
        "Transfer failed."
      );
    });

    it('emits withdraw event', async () => {
      const receipt = await this.fund.withdraw('100', constants.ZERO_ADDRESS, {from: beneficiary});
      expectEvent(receipt, 'Withdraw', {
        _to: beneficiary,
        _value: '100',
        _token: constants.ZERO_ADDRESS
      });
    });

    describe('Deploy token', () => {
      beforeEach(async () => {
        this.token = await Token.new({from: owner});
        await this.token.mint(owner, 1000, {from: owner});
        await this.token.approve(this.fund.address, '100', {from: owner});
        await this.fund.deposit('100', this.token.address, {from: owner});
      });

      it('returns correct amount of deposited ERC20', async () => {
        await this.fund.withdraw('50', this.token.address, {from: beneficiary});
        const balance = await this.token.balanceOf(this.fund.address);
        const userBalance = await this.token.balanceOf(beneficiary);
        expect(balance.toString()).to.equal('50');
        expect(userBalance.toString()).to.equal('50');
      });

      it('reverts if insufficient ERC20 balance', async () => {
        await expectRevert(
          this.fund.withdraw('110', this.token.address, {from: beneficiary}),
          "ERC20: transfer amount exceeds balance."
        );
      });

      it('reverts ERC20 withdrawal if msg.sender not beneficiary', async () => {
        await expectRevert(
          this.fund.withdraw('50', this.token.address, {from: user}),
          'only the beneficiary can perform this function'
        );
      });
    });

    describe('Locked', () => {
      let lockedFund;
      beforeEach(async () => {
        // Much greater than current time
        lockedFund = await TrustlessFund.new(15869055290, beneficiary, owner, {from: owner});
        await lockedFund.deposit('100', constants.ZERO_ADDRESS, {from: owner, value: '100'});
      });

      it('reverts if timelock period not expired', async () => {
        await expectRevert(
          lockedFund.withdraw('100', constants.ZERO_ADDRESS, {from: beneficiary}),
          'contract is still locked'
        );
      });
    });
  });

  describe('Increase Time', () => {
    it('reverts decreased expiration', async () => {
      await expectRevert(
        this.fund.increaseTime(0, {from: owner}),
        'can only increase expiration'
      );
    });

    it('reverts if not owner', async () => {
      await expectRevert(
        this.fund.increaseTime(2, {from: beneficiary}),
        'Ownable: caller is not the owner'
      );
    });

    it('emits increasetime event', async () => {
      const receipt = await this.fund.increaseTime(3, {from: owner});
      expectEvent(receipt, 'IncreaseTime', {
        _newExpiration: '3'
      });
    });
  });

  describe('Update Beneficiary', () => {
    it('reverts if not owner', async () => {
      await expectRevert(
        this.fund.updateBeneficiary(user, {from: beneficiary}),
        'Ownable: caller is not the owner'
      );
    });

    it('reverts if same beneficiary', async () => {
      await expectRevert(
        this.fund.updateBeneficiary(beneficiary, {from: owner}),
        'same beneficiary'
      );
    });

    it('reverts if burn address', async () => {
      await expectRevert(
        this.fund.updateBeneficiary(constants.ZERO_ADDRESS, {from: owner}),
        'cannot set as burn address'
      );
    });

    it('emits updatebeneficiary event', async () => {
      const receipt = await this.fund.updateBeneficiary(user, {from: owner});
      expectEvent(receipt, 'UpdateBeneficiary', {
        _newBeneficiary: user
      });
    });
  });
});