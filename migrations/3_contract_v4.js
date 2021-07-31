const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");

const PaidTokenV4 = artifacts.require("PaidTokenV4");
const EXISTING_RINKEBY_CONTRACT_ADDRESS =
  "0xe1de1dc4de074e9c8bbf5e2d66cfdb4f0b2cb61a";

module.exports = async function(deployer, network) {
  if (network != "rinkeby") {
    console.log("Contract not upgraded");
    return;
  }

  const instance = await upgradeProxy(
    EXISTING_RINKEBY_CONTRACT_ADDRESS,
    PaidTokenV4,
    {
      deployer,
    }
  );
  console.log("Upgraded", instance.address);
};
