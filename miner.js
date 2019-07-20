const PREFIX_CHAR = '0';


class Miner
{
	constructor( block, difficulty, mine_rate = 1000 ) //default mine rate is 1000 nonce per stack tick
	{
		this.is_mining  = true;
		this.block 		= block;
		this.mine_rate	= mine_rate; 
		this.difficulty = difficulty;
	}

	throttle(rate)
	{
		this.mine_rate = rate;
	}

	stop()
	{
		this.is_mining = false;
	}

	mine()
	{
		console.log("Mining block "+this.block.index+" ...");

		return new Promise((resolve,reject)=>
		{
			const pushToEventLoop= (f)=>
			{
				setTimeout(f,0);
			}

			const mineOne = ()=>
			{
				let result = this.mineBlock();
				if(this.is_mining && !result)
					pushToEventLoop( mineOne );

				if(result)
				{
					console.log("Block mined "+this.block.hash);
					resolve();
				}
			}
			mineOne();
		});
	}

	mineBlock()
	{
		const difficulty = this.difficulty;
		const block 	 = this.block;

		let counter = 0;

		for(let i=0; i< this.mine_rate; i++)
		{
			block.nonce ++;
			block.hash = block.getHash();
			if( block.hash.substring(0,difficulty) == Array(difficulty+1).join( PREFIX_CHAR ))
				return true;
		}

		return false;
	}
}

module.exports.Miner = Miner;