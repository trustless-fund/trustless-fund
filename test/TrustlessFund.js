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
      const tokens = await this.fund.tokens(constants.ZERO_ADDRESS);
      const balance = await tokens.balance.toString();
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
});