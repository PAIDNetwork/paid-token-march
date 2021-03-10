const PaidToken = artifacts.require("PaidTokenV3");
const csv = require('csv-parser');
const fs = require('fs');
const BN = require('bn.js');
require('dotenv').config();

module.exports = async function (deployer) {
    const instance = await PaidToken.deployed();
    
    //// REMOVE ////
    //await instance.pause(false)
    //// REMOVE ////

    let addresses = [];
    fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', async (row) => {
        await instance.addAllocations([row.address], [row.amount], row.vesting, {from: process.env.FROM});
        const _transfer = await instance.transfer(row.address, row.unlockedToken);
        addresses.push({'address':row.address,'vesting':row.vesting});
        console.log('transfer',_transfer);
    })
    .on('end', async () => {
        for(let i = 0; i < addresses.length; i++){
            const row = addresses[i];
            const checkAddress = row.address;
            const balance = await instance.balanceOf(checkAddress);
            const transferableAmount = await instance.getTransferableAmount(checkAddress);
            const restAmount = await instance.getRestAmount(checkAddress);
            const _balance = JSON.parse(balance)/1e18;
            const _transferableAmount = JSON.parse(transferableAmount)/1e18;
            const _restAmount = JSON.parse(restAmount)/1e18;
        
            console.log('address',checkAddress,'balance',_balance,'transferableAmount',_transferableAmount,'restAmount',_restAmount,'vesting',row.vesting); 
        }
    });

}