const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");

const PaidTokenBSCV4 = artifacts.require("PaidTokenBSCV4");
const PaidTokenV4 = artifacts.require("PaidTokenV4");

const EXISTING_BSCTESTNET_CONTRACT_ADDRESS =
  "0xb2Db221f11C4Ca84682ce17ff0058feBB79C89BE"; 

module.exports = async function(deployer, network) {
  let oldAddress = EXISTING_BSCTESTNET_CONTRACT_ADDRESS;
  if (network != "bsctestnet") {
    oldAddress = await PaidTokenV4.address;
  }

  const instance = await upgradeProxy(oldAddress, PaidTokenBSCV4, {
    deployer,
  });
  console.log("Upgraded", instance.address);
};
