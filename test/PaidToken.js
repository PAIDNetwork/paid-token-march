const PaidToken = artifacts.require("PaidTokenV3");
require('dotenv').config();

const releaseTime = 1611588600000;
const oneDay = 86400000;
const _oneDay = 86400000;

const advanceBlockAtTime = (time) => {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send(
            {
                jsonrpc: "2.0",
                method: "evm_mine",
                params: [time / 1000],
                id: new Date().getTime() / 1000,
            },
            (err, _) => {
                if (err) {
                    return reject(err);
                }

                const newBlockHash = web3.eth.getBlock("latest").hash;

                return resolve(newBlockHash);
            },
        );
    });
};

before(async () => {
    await advanceBlockAtTime(releaseTime);
});

contract("PaidToken", accounts => {
    /* const wallets = [accounts[3], accounts[4], accounts[5], accounts[6], accounts[7], accounts[8], accounts[9]];
    const totalAmounts = ['1000000000000000000000000', '1000000000000000000000000', '1000000000000000000000000', '1000000000000000000000000', '1000000000000000000000000', '1000000000000000000000000', '1000000000000000000000000']; */
    const wallets = [
        process.env.ALLOCATION_2, 
        process.env.ALLOCATION_3, 
        process.env.ALLOCATION_5, 
        process.env.ALLOCATION_6, 
        process.env.ALLOCATION_7
    ];
    const totalAmounts = [
        process.env.AMOUNT_2,
        process.env.AMOUNT_3,
        process.env.AMOUNT_5, 
        process.env.AMOUNT_6,
        process.env.AMOUNT_7
    ];
    // it('upgrade', async () => {
    //   const paidToken = await deployProxy(PaidToken);
    //   assert.equal(await paidToken.getReleaseTime(), 1611588600, "not same")
    // });

    // it('pause', () => {
    //     return PaidToken.deployed()
    //         .then(async (instance) => {
    //             await instance.pause(true)
    //             console.log(await instance.paused());
    //         })
    // });

    // it('unpause', () => {
    //     return PaidToken.deployed()
    //         .then(async (instance) => {
    //             await instance.pause(false)
    //             console.log(await instance.paused());
    //         })
    // });

    // it("shouldn't set wallets", () => {
    //     const wallets = [accounts[0]];
    //     const totalAmounts = ['10000000000000000000000000000'];

    //     return PaidToken.deployed()
    //         .then(async instance => {

    //             try {
    //                 await instance.addAllocations(wallets, totalAmounts, '0', {from: accounts[0]})
    //             } catch (err) {
    //                 assert.equal(err.reason, 'Max total supply over');
    //             }
    //         })
    // });
    // it("should set wallets", async () => {
    //     const instance = await PaidToken.deployed();

    //     for (const i in wallets) {
    //         const wallet = wallets[i]
    //         const amount = totalAmounts[i]

    //         const a = await instance.addAllocations([wallet], [amount], i.toString(), {from: '0x67F5B9e57EaE4f5f32E98BB7D7D1fb8F90AcFb45'});
    //     }
    // });

    /* it("should put "+totalAmounts[0]+" token account 0", async () => {
        const instance = await PaidToken.deployed();
        const wallet = wallets[0]
        const amount = totalAmounts[0]

        await instance.approve(wallet, amount, {from: process.env.FROM});
        console.log(wallets[0]);
        const balance = await instance.balanceOf.call(wallets[0]);
        assert.equal(balance.toString(), totalAmounts[0], "test problem");
    }); */

    /* it("shouldn't send token", async () => {
        console.log(accounts);
        const instance = await PaidToken.deployed();
        await instance.approve(accounts[6], totalAmounts[0], {from: wallets[0]})
        instance.pause(false);

        try {
            await instance.transferFrom(wallets[0], accounts[7], totalAmounts[0], {from: accounts[6]});
        } catch (err) {
            assert.equal(err.reason, 'Wait for vesting day!');
        }

        try {
            await instance.transfer(wallets[0], totalAmounts[0], {from: accounts[6]});
        } catch (err) {
            assert.equal(err.reason, 'Wait for vesting day!');
        }
    }); */

    /* it("should put 1000000000000000000000000 token account 1", () => {
        return PaidToken.deployed()
            .then(instance => instance.balanceOf.call(accounts[3]))
            .then((balance) => {
                assert.equal(balance.toString(), '1000000000000000000000000', "test problem");
            });
    });

    it("should put 1000000000000000000000000 token account 2", () => {
        return PaidToken.deployed()
            .then(instance => instance.balanceOf.call(accounts[4]))
            .then((balance) => {
                assert.equal(balance.toString(), '1000000000000000000000000', "test problem");
            });
    });

    it("should put 1000000000000000000000000 token account 3", () => {
        return PaidToken.deployed()
            .then(instance => instance.balanceOf.call(accounts[5]))
            .then((balance) => {
                assert.equal(balance.toString(), '1000000000000000000000000', "test problem");
            });
    });

    it("should put 1000000000000000000000000 token account 4", () => {
        return PaidToken.deployed()
            .then(instance => instance.balanceOf.call(accounts[6]))
            .then((balance) => {
                assert.equal(balance.toString(), '1000000000000000000000000', "test problem");
            });
    });

    it("should put 1000000000000000000000000 token account 5", () => {
        return PaidToken.deployed()
            .then(instance => instance.balanceOf.call(accounts[7]))
            .then((balance) => {
                assert.equal(balance.toString(), '1000000000000000000000000', "test problem");
            });
    });

    it("should put 1000000000000000000000000 token account 6", () => {
        return PaidToken.deployed()
            .then(instance => instance.balanceOf.call(accounts[8]))
            .then((balance) => {
                assert.equal(balance.toString(), '1000000000000000000000000', "test problem");
            });
    });

    it("should put 1000000000000000000000000 token account 7", () => {
        return PaidToken.deployed()
            .then(instance => instance.balanceOf.call(accounts[9]))
            .then((balance) => {
                assert.equal(balance.toString(), '1000000000000000000000000', "test problem");
            });
    });

    it("should get months", () => {
        return PaidToken.deployed()
            .then(async (instance) => instance.getMonths.call(0, 0))
            .then((months) => {
                assert.equal(months.toNumber(), 1, "test problem");
            })
    });*/

    /* it("should increase 30 days", async () => {
        await advanceBlockAtTime(releaseTime + 30 * oneDay);

        return PaidToken.deployed()
            .then(async (instance) =>  instance.getMonths.call(0, 0))
            .then((months) => {
                assert.equal(months.toNumber(), 2, "test problem");
            })
    }); */

    /*it("should increase 45 days", async () => {
        await advanceBlockAtTime(releaseTime + 45 * oneDay);

        return PaidToken.deployed()
            .then(async (instance) =>  instance.getMonths.call(0, 0))
            .then((months) => {
                assert.equal(months.toNumber(), 2, "test problem");
            })
    });

    it("should increase 60 days", async () => {
        await advanceBlockAtTime(releaseTime + 60 * oneDay);

        return PaidToken.deployed()
            .then(instance => instance.getMonths.call(0, 0))
            .then((months) => {
                assert.equal(months.toNumber(), 3, "test problem");
            })
    });*/

    it("transfer logs", async () => {
        const instance = await PaidToken.deployed();
        await advanceBlockAtTime(releaseTime + (2 * 30) * oneDay);
        const types = {
            0: '30 Days to unblock & 1.66% for 60 months',
            1: '180 Days to unblock & 1.66% for 60 months',
            2: '360 Days to unblock & 1.66% for 60 months',
            3: '0 Days 100 Percent',
            4: '30 Days to unblock & 4.16% for 24 months',
            5: '30 Days to unblock & 11.11% for 9 months',
            6: '0 Days to unblock, get 10% initial & 15% for 6 months',
            7: '0 Days to unblock, get 25% initial & 25% for 3 months'
        };

        let amounts = {
            0:0,
            1:process.env.AMOUNT_2,
            2:process.env.AMOUNT_3,
            3:0,
            4:process.env.AMOUNT_5,
            5:process.env.AMOUNT_6,
            6:process.env.AMOUNT_7,
            7:0            
        }

        for (let x = 3; x < 10; x ++) {
            let lastTransferableAmount = '';
            for (let i = 0; i < 70; i ++) {
                const day = 1613347200000 + (i * 30) * _oneDay;
                await advanceBlockAtTime(releaseTime + (i * 30) * oneDay);

                let timestamp = await instance.getTimestamp.call()
                let transferable = await instance.getTransferableAmount.call(accounts[x])
                let rest = await instance.getRestAmount.call(accounts[x])
                let canTransfer = await instance.canTransfer.call(accounts[x], transferable)

                if (lastTransferableAmount !== transferable.toString()) {

                    console.log(`${types[x]} ${x}. account`, new Date(day), new Date(timestamp.toNumber() * 1000), (i + 1) + '. month', (i * 30) + 
                        '. day', 'Transferable amount: ' + transferable.toString(), 'Rest: ' + rest, 'Can transfer: ' + canTransfer.toString());
                    lastTransferableAmount = transferable.toString();
                } else {
                    continue;
                }
            }
        }
    }); 
});
