const { accounts, contract } = require('@openzeppelin/test-environment');
const [ owner, beneficiary, user ] = accounts;
const { expect } = require('chai');
const TrustlessFund = contract.fromArtifact('TrustlessFund');

describe('TrustlessFund', () => {
  beforeEach(async () => {
    this.fund = await TrustlessFund.new(1, beneficiary, owner, {from: owner});
  });

  describe('Deposits', () => {
    it('displays correct amount of deposited ETH', async () => {
      await this.fund.deposit('100', '0x0000000000000000000000000000000000000000', {from: owner, value: '100'});
      const tokens = await this.fund.tokens('0x0000000000000000000000000000000000000000');
      const balance = await tokens.balance.toString();
      expect(balance).to.equal('100');
    });
  });
});