const { accounts, contract } = require('@openzeppelin/test-environment');
const [ owner, beneficiary, user ] = accounts;
const { expect } = require('chai');
const {
  BN,
  constants,
  expectEvent,
  expectRevert
} = require('@openzeppelin/test-helpers');

const TrustlessFundFactory = contract.fromArtifact('TrustlessFundFactory');

describe('TrustlessFundFactory', () => {
  beforeEach(async () => {
    this.factory = await TrustlessFundFactory.new({from: owner});
  });

  describe('Funds', () => {
    beforeEach(async () => {
      await this.factory.createFund(1, beneficiary, {from: owner});
      await this.factory.createFund(1, beneficiary, {from: owner});
    });

    it('deploys a trustlessfund contract', async () => {
      await expect(() => {
        this.factory.createFund(1, beneficiary, {from: owner})}
      ).to.not.throw();
    });

    it('retrieves a fund address given its id', async () => {
      const fundAddress = await this.factory.getFund(0);
      expect(fundAddress.length).to.equal(42);
    });

    it('returns the id of all funds created by a user', async () => {
      const fundIds = await this.factory.getUserFunds(owner);
      expect(fundIds.toString()).to.equal('0,1');
    });

    it('emits the createfund event', async () => {
      const receipt = await this.factory.createFund(1, beneficiary, {from: owner});
      expectEvent(receipt, 'CreateFund', {
        expiration: '1',
        beneficiary,
        owner
      });
    });

    describe('Set fee', () => {
      beforeEach(async () => {
        await this.factory.setFee(100, {from: owner});
      });

      it('reverts fund creation if fee not paid', async () => {
        await expectRevert(
          this.factory.createFund(1, beneficiary, {from: owner}),
          'must pay fee'
        )
      });

      it('creates fund if fee is paid', async () => {
        await expect(() => {
          this.factory.createFund(1, beneficiary, {from: owner, value: 100})}
        ).to.not.throw();
      });
    });
  });
});