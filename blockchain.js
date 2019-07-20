const Blocks = require("./blocks");
const Block = Blocks.Block;
const createGenesis = Blocks.createGenesis;

const Miner = require("./miner").Miner;

class BlockChain
{
	constructor()
	{
		this.chain = [ createGenesis() ];
	}

	addBlock(data)
	{
		let index 	  = this.chain.length;
		let prevHash  = this.lastestBlock().hash ;
		let block 	  = new Block( index , data , prevHash );

		this.chain.push(block);
	}

	latestBlock()
	{
		return this.chain[ this.chain.length - 1 ];
	}

	computeDifficulty()
	{
		return 5;
	}

	spawnMiner()
	{
		return new Miner(this.latestBlock(),this.computeDifficulty());
	}

	isChainValid()
	{
		for(var i=0; i < this.chain.length; i++)
		{
			if( this.chain[i].hash !== this.chain[i].getHash() )
				return false;
			if( i > 0 && this.chain[i].prevHash !== this.chain[i-1].hash)
				return false;
		}

		return true;
	}
}


module.exports.BlockChain = BlockChain;