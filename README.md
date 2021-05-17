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

#### For Testing Start Ganache
---
```
ganache-cli --accounts=11 --account="0x1b0ad9d6e8a97221c35040986ddfe97a94c25fc1bba1462e3c1a2e353f057f7c,100000000000000000000" --account="0x3a975be325e5a3036a50959964eca6196e7f69584af46fe011260911ec559333,100000000000000000000" --account="0xd38554ee3ae59e5bcc56fc1e6e410f63149253dc2985bb1ada95ed6cb4030747,100000000000000000000" --account="0x24a978303c0a5e108375291269256c16c456d20c69984d8c98d3e0a29f3d8856,100000000000000000000" --account="0x36b00c11efcf62d79a80e89ef5818aca7d41197a6ab24d7ef8d3d4d355ccb7f5,100000000000000000000" --account="0xeab12f85e1bfd5ff03b407d8edb41a65aa8553203a80f12f7b42d287dbbcc31e,100000000000000000000" --account="0x653a8335c6281c7f8b7c4e13ed109c43ffcf47e560557e40c1331b0d571b494c,100000000000000000000" --account="0x385f1cd2465f1453dcbfad46bb32f4877b35c224cfc0040e41b404fe3c571743,100000000000000000000" --account="0xd5520f4d78a75a032fabd32e6989d57990199c29b37b172f4c60c6dc0101682c,100000000000000000000" --account="0x08f66f02a5e6ab6685b9dbff2cfb841d97fcad7034e6649976ea62f6223f9e85,100000000000000000000" --account="0x14d21d01b8ec16a656db8265b55ddedaa6babe5dc69cf35b49ce5152e5a82629,100000000000000000000" --account="0x1f40466553f8bdaa6d88aaf5edcb7bd6d9e64ed987948169a7d79d6c2327121e,100000000000000000000"
```
#### Start migration
---
```
truffle migrate --network development
```

#### Start truffle test
---
```
truffle test ./test/PaidToken.js
```
