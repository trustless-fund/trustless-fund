var TrustFundFactory = artifacts.require("./TrustFundFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(TrustFundFactory);
};
