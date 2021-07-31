const { upgradeProxy } = require("@openzeppelin/truffle-upgrades");

const PaidTokenV5 = artifacts.require("PaidTokenV5");
const EXISTING_RINKEBY_CONTRACT_ADDRESS =
  "0x532197ec38756b9956190b845d99b4b0a88e4ca9";

module.exports = async function(deployer, network) {
  if (network != "testnet") {
    console.log("Contract not upgraded");
    return;
  }

  const instance = await upgradeProxy(
    EXISTING_RINKEBY_CONTRACT_ADDRESS,
    PaidTokenV5,
    {
      deployer,
    }
  );
  console.log("Upgraded", instance.address);
};
