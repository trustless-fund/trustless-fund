var TrustlessFundFactory = artifacts.require("./TrustlessFundFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(TrustlessFundFactory);
};
