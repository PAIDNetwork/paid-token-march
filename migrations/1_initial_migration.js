const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const PaidToken = artifacts.require("PaidToken");

module.exports = async function (deployer) {
  const instance = await deployProxy(PaidToken, [], { deployer });

  const wallets = [
    '0x67F5B9e57EaE4f5f32E98BB7D7D1fb8F90AcFb45',
    '0xeB747e306FBb7Bb9617043F9e4d62cEFC1dc8c1C',
    '0xe7B9e79A316E32491D7FF842926FdEd1C62Ef92E',
    '0xBa6A6fe967175Bb996fB4fF8A248e2478c1A0c95',
    '0xC7E130b45d3739314fFE83578c645B5296EDE6E3',
    '0x230E8F9aB9EB0935D2570Cfad195E55801fD845B',
    '0x188a6a740bede0735Fa4fB41fF5E977274DD6eD0',
    '0x2c0a336bE063CC68Efc7f9C58a79272C1E61bC3f'
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
