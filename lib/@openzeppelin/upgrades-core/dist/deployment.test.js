"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const util_1 = require("util");
const deployment_1 = require("./deployment");
const stub_provider_1 = require("./stub-provider");
const sleep = util_1.promisify(setTimeout);
ava_1.default('deploys new contract', async (t) => {
    const provider = stub_provider_1.stubProvider();
    const deployment = await deployment_1.resumeOrDeploy(provider, undefined, provider.deploy);
    t.true(provider.isContract(deployment.address));
    t.is(provider.deployCount, 1);
});
ava_1.default('resumes existing deployment with txHash', async (t) => {
    const provider = stub_provider_1.stubProvider();
    const first = await deployment_1.resumeOrDeploy(provider, undefined, provider.deployPending);
    const second = await deployment_1.resumeOrDeploy(provider, first, provider.deployPending);
    t.is(first, second);
    t.is(provider.deployCount, 1);
});
ava_1.default('resumes existing deployment without txHash', async (t) => {
    const provider = stub_provider_1.stubProvider();
    const first = await provider.deploy();
    delete first.txHash;
    const second = await deployment_1.resumeOrDeploy(provider, first, provider.deployPending);
    t.is(first, second);
    t.is(provider.deployCount, 1);
});
ava_1.default('errors if tx is not found', async (t) => {
    const provider = stub_provider_1.stubProvider();
    const fakeDeployment = {
        address: '0x1aec6468218510f19bb19f52c4767996895ce711',
        txHash: '0xc48e21ac9c051922f5ccf1b47b62000f567ef9bbc108d274848b44351a6872cb',
    };
    await t.throwsAsync(deployment_1.resumeOrDeploy(provider, fakeDeployment, provider.deploy));
});
ava_1.default('redeploys if tx is not found on dev network', async (t) => {
    const provider = stub_provider_1.stubProvider(31337); // Hardhat Network chainId
    const fakeDeployment = {
        address: '0x1aec6468218510f19bb19f52c4767996895ce711',
        txHash: '0xc48e21ac9c051922f5ccf1b47b62000f567ef9bbc108d274848b44351a6872cb',
    };
    const deployment = await deployment_1.resumeOrDeploy(provider, fakeDeployment, provider.deploy);
    t.true(provider.isContract(deployment.address));
    t.is(provider.deployCount, 1);
});
ava_1.default('validates a mined deployment with txHash', async (t) => {
    const provider = stub_provider_1.stubProvider();
    const deployment = await deployment_1.resumeOrDeploy(provider, undefined, provider.deploy);
    await deployment_1.waitAndValidateDeployment(provider, deployment);
    t.is(provider.getMethodCount('eth_getTransactionByHash'), 1);
    t.is(provider.getMethodCount('eth_getCode'), 1);
});
ava_1.default('validates a mined deployment without txHash', async (t) => {
    const provider = stub_provider_1.stubProvider();
    const deployment = await deployment_1.resumeOrDeploy(provider, undefined, provider.deploy);
    delete deployment.txHash;
    await deployment_1.waitAndValidateDeployment(provider, deployment);
    t.is(provider.getMethodCount('eth_getTransactionByHash'), 0);
    t.is(provider.getMethodCount('eth_getCode'), 1);
});
ava_1.default('waits for a deployment to mine', async (t) => {
    const timeout = Symbol('timeout');
    const provider = stub_provider_1.stubProvider();
    const deployment = await deployment_1.resumeOrDeploy(provider, undefined, provider.deployPending);
    const result = await Promise.race([deployment_1.waitAndValidateDeployment(provider, deployment), sleep(100).then(() => timeout)]);
    t.is(result, timeout);
    provider.mine();
    await deployment_1.waitAndValidateDeployment(provider, deployment);
});
//# sourceMappingURL=deployment.test.js.map