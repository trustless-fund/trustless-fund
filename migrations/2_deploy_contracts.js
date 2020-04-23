var TrustlessFundFactoryV2 = artifacts.require("./TrustlessFundFactoryV2.sol");

module.exports = function(deployer) {
  deployer.deploy(TrustlessFundFactoryV2);
};
