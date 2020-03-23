var TrustlessFundFactory = artifacts.require("./TrustlessFundFactory.sol");
var TrustlessFund = artifacts.require("./TrustlessFund.sol");

// TODO: Don't deploy TrustlessFund (it is being used for testing purposes)

module.exports = function(deployer) {
  deployer.deploy(TrustlessFundFactory);
  deployer.deploy(TrustlessFund, 1, '0x1Cf53EfE220E9AC1CF74Cc3dF5785805cccb681d', '0x1Cf53EfE220E9AC1CF74Cc3dF5785805cccb681d');
};
