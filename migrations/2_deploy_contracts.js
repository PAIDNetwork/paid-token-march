const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
require('dotenv').config();
// handle migrations
// const PaidToken = artifacts.require("PaidToken");
// const PaidTokenV2 = artifacts.require("PaidTokenV2");
const PaidTokenBSCV4 = artifacts.require("PaidTokenBSCV4");

module.exports = async function (deployer) {
// @TODO: The three types of migrations to be carried out are placed, two in testnet,
// to test the complete deployment and update cycle, and then only one in mainnet,
// since it is the one that will be carried out definitively

// Testnet Approach Stage #1
const instance = await deployProxy(PaidTokenBSCV4, [], { deployer });
await instance.pause();


  // Mainnet Approach Stage #2
  // const instance = await deployProxy(PaidTokenV3, [account1, account2, account3], { deployer });

  // const wallets = [
  //   allocation1,
  //   allocation2,
  //   allocation3,
  //   allocation4,
  //   allocation5,
  //   allocation6,
  //   allocation7,
  //   allocation8
  // ]

  // for (const i in wallets) {
	// 	console.log(wallets[i]);
  //   await instance.addAllocations([wallets[i]], ['1000000000000000000000000'], i.toString());
  // }

  // await instance.addAllocations(['allocation1'], ['amount1'], '0'); // 30 Days 1.66 Percent
  // await instance.addAllocations(['allocation2'], ['amount2'], '1'); // 180 Days 1.66 Percent
  // await instance.addAllocations(['allocation3'], ['amount3'], '2'); // 360 Days 4.66 Percent
  // await instance.addAllocations(['allocation4'], ['amount4'], '3'); // 30 Days 4.66 Percent
  // await instance.addAllocations(['allocation5'], ['amount5'], '4'); // 0 Days 100 Percent
  // await instance.addAllocations(['allocation6'], ['amount6'], '5'); // 30 Days 11.11 Percent
  // await instance.addAllocations(['allocation7'], ['amount7'], '6'); // 0 Days 10 initial 15 monthly Percent
  // await instance.addAllocations(['allocation8'], ['amount8'], '7'); // 0 Days 25 initial 25 monthly Percent
};
