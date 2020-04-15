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

  describe('Fees', () => {
    beforeEach(async () => {
      await this.factory.setFee(30, {from: owner});
      await this.factory.createFund(1, beneficiary, {from: owner, value: 30});
    });

    it('sets and gets the fee', async () => {
      await this.factory.setFee(50, {from: owner});
      const fee = await this.factory.getFee();
      expect(fee.toString()).to.equal('50');
    });

    it('reverts if not owner setting fee', async () => {
      await expectRevert(
        this.factory.setFee(50, {from: user}),
        "Ownable: caller is not the owner"
      );
    });

    it('collects accrued fees', async () => {
      await this.factory.collectFees(20, {from: owner});
      const accruedFees = await this.factory.feesAccrued();
      expect(accruedFees.toString()).to.equal('10');
    });

    it('reverts if not owner collecting fees', async () => {
      await expectRevert(
        this.factory.collectFees(30, {from: user}),
        "Ownable: caller is not the owner"
      )
    });

    it('reverts if amount greater than accrued fees', async () => {
      await expectRevert(
        this.factory.collectFees(31, {from: owner}),
        'not enough fees accrued'
      );
    });
  });
});