# Paid Networks ERC20 ver 3

This repo is intended to reinforce security protocols on the process to accept or refuse transactions due to it sensitive nature

## Problem in hand

Currently, by the time a transaction is made, it is made by the approval of a single key which is an automated process made thru the PAID token contract. 

So we attack the problematic by implementing a MultiSig feature on the wallet handling

## Documentation
Multisig: Smart contracts property that enable various keys to unlock a transaction.
As well known, a transfer of tokens is held by letting the parties to have access to those tokens when the source (Alice) set a new lock on them to the target (Bob). This task can also be done by the involvement of several keys into a single transaction. Rest asure the releasing of those token, not only a single key but to several keys

# How to start

## Quick install

# Roadmap
Roadmap to make transactions handling more accurately
Contracts:
    - Organized the code to be more flexible, understandable and robust
    - Minting is made thru OpenZeppelin library which make more accurate calculations
    - Usage of PresetMinterPauser which is a collection of solidity smart contracts, faster and more organize implementations/executions