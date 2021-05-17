
const ico = artifacts.require("PaidTokenV4");
const { assert } = require("chai");

const increaseTime = function(duration) {
	const id = Date.now()

	return new Promise((resolve, reject) => {
	  web3.currentProvider.sendAsync({
		jsonrpc: '2.0',
		method: 'evm_increaseTime',
		params: [duration],
		id: id,
	  }, err1 => {
		if (err1) return reject(err1)

		web3.currentProvider.sendAsync({
		  jsonrpc: '2.0',
		  method: 'evm_mine',
		  id: id+1,
		}, (err2, res) => {
		  return err2 ? reject(err2) : resolve(res)
		})
	  })
	})
  }

  contract('ICO test', async (accounts) => {
	  it("shoud init init with contract balance of 594717455710000000000000000 tokens", async () => {
		  let ins = await ico.deployed();

		  let bal = await ins.balanceOf(accounts[0]);

		  assert.equal(bal, 594717455710000000000000000);
	  })


	  it("should block transfer", async () => {
		  let ins = await ico.deployed();

		  try{
			  await ins.transfer("0x123", "3");
			  assert(true, "");
		  } catch(e) {
			  return;
		  }

		  assert(false, "transfer is not blocked");
	  })

	  it("should block transferFrom", async () => {
		  let ins = await ico.deployed();

		  try{
			  await ins.transferFrom(ins.address, "0x123", "3");
			  assert(true, "");
		  } catch(e) {
			  return;
		  }

		  assert(false, "transferFrom is not blocked");
	  })

	  it("should block approve", async () => {
		  let ins = await ico.deployed();

		  try{
			  await ins.approve("0x123", "3");
			  assert(true, "");
		  } catch(e) {
			  return;
		  }

		  assert(false, "approve is not blocked");
	  })


	  it("should transfer tokens", async () => {
		  let ins = await ico.deployed();

		  var acc = accounts[0];
		  var acc2 = accounts[2];

		  await ins.transfer(acc2, '455710000000000000000', {from: acc});

		  let bal1 = await ins.balanceOf(acc);

		  let bal2 = await ins.balanceOf(acc2);

		  console.log("Balance 1: ", bal1.toString());
		  console.log("Balance 2: ", bal2.toString());
		  assert.equal(bal1.valueOf(), 594717000000000000000000000, "The transfer didn't happen");
		  assert.equal(bal2.valueOf(), 455710000000000000000, "The transfer didn't happen");
	  })
  })
