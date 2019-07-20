const sha256 = require('sha256');

class Block
{
	constructor(
		index,
		data,
		prevHash
	)
	{
		this.index = index;
		this.timestamp = Date.now();
		this.data = data;
		this.prevHash = prevHash;
		this.nonce = 0;
		this.thisHash = this.getHash();

		this.transactions = [];

		this.root = this.roo
	}

	getHash()
	{
		return sha256( 
			this.index +
			this.timestamp +
			JSON.stringify(this.data) +
			this.prevHash +
			this.nonce
		);
	}
}

function createGenesis()
{
	return new Block(0,"Let there be Bikes",0)
}


module.exports.Block = Block;
module.exports.createGenesis = createGenesis;