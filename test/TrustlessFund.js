const { accounts, contract } = require('@openzeppelin/test-environment');
const [ owner, beneficiary, user ] = accounts;
const { expect } = require('chai');
const {
  constants,
  expectEvent,
  expectRevert
} = require('@openzeppelin/test-helpers');

const TrustlessFund = contract.fromArtifact('TrustlessFund');

describe('TrustlessFund', () => {
  beforeEach(async () => {
    this.fund = await TrustlessFund.new(1, beneficiary, owner, {from: owner});
  });

  describe('Deposits', () => {
    it('returns correct amount of deposited ETH', async () => {
      await this.fund.deposit('100', constants.ZERO_ADDRESS, {from: owner, value: '100'});
      const token = await this.fund.tokens(constants.ZERO_ADDRESS);
      const balance = await token.balance.toString();
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

    // Add additional test for ERC20s
  });

  describe('Withdrawals', () => {
    beforeEach(async () => {
      await this.fund.deposit('100', constants.ZERO_ADDRESS, {from: owner, value: '100'});
    });

    it('successfully withdraws eth', async () => {
      await this.fund.withdraw('50', constants.ZERO_ADDRESS, {from: beneficiary});
      const token = await this.fund.tokens(constants.ZERO_ADDRESS);
      const balance = await token.balance.toString();
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
        'not enough balance'
      );
    });

    describe('Locked', () => {
      let lockedFund;
      beforeEach(async () => {
        // Much greater than current time
        lockedFund = await TrustlessFund.new(15869055290, beneficiary, owner, {from: owner});
        await lockedFund.deposit('100', constants.ZERO_ADDRESS, {from: owner, value: '100'});
      });

      it('reverts if withdraw period not expired', async () => {
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
  });
});