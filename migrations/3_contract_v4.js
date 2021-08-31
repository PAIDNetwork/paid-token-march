const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");

const PaidTokenV4 = artifacts.require("PaidTokenV4");
const PaidTokenV3 = artifacts.require("PaidTokenV3");

const EXISTING_RINKEBY_CONTRACT_ADDRESS =
  "0xe1de1dc4de074e9c8bbf5e2d66cfdb4f0b2cb61a";

module.exports = async function(deployer, network) {
  let oldAdress = EXISTING_RINKEBY_CONTRACT_ADDRESS
  if (network!= "rinkeby") {
    oldAdress = await PaidTokenV3.address
  }

  const instance = await upgradeProxy(
    oldAdress,
    PaidTokenV4,
    {
      deployer,
    }
  );
  console.log("Upgraded", instance.address);
};
