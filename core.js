const BlockChain = require( "./blockchain").BlockChain;

const BikeCoin = new BlockChain();


const miner = BikeCoin.spawnMiner();
miner.mine();