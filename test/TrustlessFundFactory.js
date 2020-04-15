const { accounts, contract } = require('@openzeppelin/test-environment');
const [ owner, beneficiary, user ] = accounts;
const { expect } = require('chai');
const {
  constants,
  expectEvent,
  expectRevert
} = require('@openzeppelin/test-helpers');

const TrustlessFundFactory = contract.fromArtifact('TrustlessFundFactory');

describe('TrustlessFundFactory', () => {
  beforeEach(async () => {
    this.factory = await TrustlessFundFactory.new();
  });

  describe('Funds', () => {
    it('deploys a trustlessfund contract', async () => {
      await expect(() => {
        this.factory.createFund(1, beneficiary, {from: owner})}
      ).to.not.throw();
    });
  });
});