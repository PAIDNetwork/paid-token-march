"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDeployment = exports.TransactionMinedTimeout = exports.waitAndValidateDeployment = exports.resumeOrDeploy = void 0;
const util_1 = require("util");
const debug_1 = __importDefault(require("./utils/debug"));
const provider_1 = require("./provider");
const sleep = util_1.promisify(setTimeout);
async function resumeOrDeploy(provider, cached, deploy) {
    if (cached !== undefined) {
        const { txHash } = cached;
        if (txHash === undefined) {
            // Nothing to do here without a txHash.
            // This is the case for deployments migrated from OpenZeppelin CLI.
            return cached;
        }
        // If there is a deployment with txHash stored, we look its transaction up. If the
        // transaction is found, the deployment is reused.
        debug_1.default('found previous deployment', txHash);
        const tx = await provider_1.getTransactionByHash(provider, txHash);
        if (tx !== null) {
            debug_1.default('resuming previous deployment', txHash);
            return cached;
        }
        else if (!(await provider_1.isDevelopmentNetwork(provider))) {
            // If the transaction is not found we throw an error, except if we're in
            // a development network then we simply silently redeploy.
            throw new InvalidDeployment(cached);
        }
        else {
            debug_1.default('ignoring invalid deployment in development network', txHash);
        }
    }
    const deployment = await deploy();
    debug_1.default('initiated deployment', deployment.txHash);
    return deployment;
}
exports.resumeOrDeploy = resumeOrDeploy;
async function waitAndValidateDeployment(provider, deployment) {
    const { txHash, address } = deployment;
    const startTime = Date.now();
    if (txHash !== undefined) {
        // Poll for 60 seconds with a 5 second poll interval.
        // TODO: Make these parameters configurable.
        const pollTimeout = 60e3;
        const pollInterval = 5e3;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime >= pollTimeout) {
                // A timeout is NOT an InvalidDeployment
                throw new TransactionMinedTimeout(deployment);
            }
            debug_1.default('verifying deployment tx mined', txHash);
            const tx = await provider_1.getTransactionByHash(provider, txHash);
            if ((tx === null || tx === void 0 ? void 0 : tx.blockHash) !== null && (tx === null || tx === void 0 ? void 0 : tx.blockHash) !== undefined) {
                debug_1.default('succeeded verifying deployment tx mined', txHash);
                break;
            }
            debug_1.default('waiting for deployment tx mined', txHash);
            await sleep(pollInterval);
        }
    }
    debug_1.default('succeeded verifying deployment', txHash);
    if (await provider_1.hasCode(provider, address)) {
        return;
    }
    throw new InvalidDeployment(deployment);
}
exports.waitAndValidateDeployment = waitAndValidateDeployment;
class TransactionMinedTimeout extends Error {
    constructor(deployment) {
        super(`Timed out waiting for transaction ${deployment.txHash}`);
        this.deployment = deployment;
    }
}
exports.TransactionMinedTimeout = TransactionMinedTimeout;
class InvalidDeployment extends Error {
    constructor(deployment) {
        var _a;
        super(`Invalid deployment with address ${deployment.address} and txHash ${(_a = deployment.txHash) !== null && _a !== void 0 ? _a : 'unknown'}`);
        this.deployment = deployment;
    }
}
exports.InvalidDeployment = InvalidDeployment;
//# sourceMappingURL=deployment.js.map