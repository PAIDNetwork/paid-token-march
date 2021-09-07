const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");

const PaidTokenBSCV4 = artifacts.require("PaidTokenBSCV4");
const PaidTokenV4 = artifacts.require("PaidTokenV4");

const EXISTING_BSCTESTNET_CONTRACT_ADDRESS =
  "0xe1de1dc4de074e9c8bbf5e2d66cfdb4f0b2cb61a"; //there has to be updated this address, since this one is from Rinkeby 

module.exports = async function(deployer, network) {
  let oldAdress = EXISTING_BSCTESTNET_CONTRACT_ADDRESS;
  if (network != "bsctestnet") {
    oldAdress = await PaidTokenV4.address;
  }

  const instance = await upgradeProxy(oldAdress, PaidTokenBSCV4, {
    deployer,
  });
  console.log("Upgraded", instance.address);
};
