const { deployProxy } = require('@openzeppelin/truffle-upgrades');
// handle migrations
const PaidToken = artifacts.require("PaidToken");
const PaidTokenV2 = artifacts.require("PaidTokenV2");
const PaidTokenV3 = artifacts.require("PaidTokenV3");
//Allocation Accounts
const allocation1 = process.env.ALLOCATION_1
const allocation2 = process.env.ALLOCATION_2
const allocation3 = process.env.ALLOCATION_3
const allocation4 = process.env.ALLOCATION_4
const allocation5 = process.env.ALLOCATION_5
const allocation6 = process.env.ALLOCATION_6
const allocation7 = process.env.ALLOCATION_7
const allocation8 = process.env.ALLOCATION_8
//Initial Mint Account
const account1 = process.env.ACCOUNT_1
const account2 = process.env.ACCOUNT_2
const account3 = process.env.ACCOUNT_3

module.exports = async function (deployer) {
// @TODO: The three types of migrations to be carried out are placed, two in testnet,
// to test the complete deployment and update cycle, and then only one in mainnet,
// since it is the one that will be carried out definitively

// Testnet Approach Stage #1
// const instance = await deployProxy(PaidToken, [], { deployer });

// Testnet Approach Stage #2
// const existing = await PaidTokenV.deployed();
 // const instance = await upgradeProxy(existing.address, PaidTokenV2,[account1, account2, account3] ,{ deployer });

// Testnet Approach Stage #3
// const existing = await PaidTokenV2.deployed();
// const instance = await upgradeProxy(existing.address, PaidTokenV3,[account1, account2, account3] ,{ deployer });

  // Mainnet Approach Stage #4
  const existing = await PaidTokenV2.deployed();
  const instance = await upgradeProxy(existing.address, PaidTokenV3,[account1, account2, account3] ,{ deployer });

  const wallets = [
    allocation1,
    allocation2,
    allocation3,
    allocation4,
    allocation5,
    allocation6,
    allocation7,
    allocation8
  ]

  for (const i in wallets) {
    await instance.addAllocations([wallets[i]], ['1000000000000000000000000'], i.toString());
  }

  // await instance.addAllocations(['0x67F5B9e57EaE4f5f32E98BB7D7D1fb8F90AcFb45'], ['100000000000000000000000000'], '0'); // 30 Days 1.66 Percent
  // await instance.addAllocations(['0x96c123033801BCBeFb5Bf6B17A5E7E71c1f17D97'], ['100000000000000000000000000'], '1'); // 180 Days 1.66 Percent
  // await instance.addAllocations(['0x700c0293E3Ab1ac287bbB728373fe7D44963532d'], ['100000000000000000000000000'], '2'); // 360 Days 4.66 Percent
  // await instance.addAllocations(['0x54a6a4E5AC96b4c12C9761214712829c15875621'], ['100000000000000000000000000'], '3'); // 30 Days 4.66 Percent
  // await instance.addAllocations(['0x49a4A2B6f1E4eF243daD91aF28eF4c3C32eE9F24'], ['100000000000000000000000000'], '4'); // 0 Days 100 Percent
  // await instance.addAllocations(['0x796c455Fdfd1C58C7DfE13D30BF2ad96f32Cc2a6'], ['100000000000000000000000000'], '5'); // 30 Days 11.11 Percent
  // await instance.addAllocations(['0x2979c00883DC0E79aa3c465E909f6f6794408351'], ['100000000000000000000000000'], '6'); // 0 Days 10 initial 15 monthly Percent
  // await instance.addAllocations(['0xfD848ecA5480F6A3549F437Ac9c441B440bAAdA4'], ['50000000000000000000000000'], '7'); // 0 Days 25 initial 25 monthly Percent
};
