function CardSet(set) 
{
	this.set = set;
	this.all = [];

	this.mythicRares = [];
	this.uncommons = [];
	this.commons = [];
	this.rares = [];
	
	this.planeswalkers = [];
	this.enchantments = [];
	this.creatures = [];
	this.sorceries = [];
	this.artifacts = [];
	this.instants = [];
	this.lands = [];

	this.red = [];
	this.blue = [];
	this.white = [];
	this.black = [];
	this.green = [];
	this.colorless = [];
	this.multicolored = [];
}

CardSet.prototype.getBooster = function()
{
	var booster = [];

	// TODO: foil chances

	// 1/8 odds of pulling a mythic rare
	if ((Math.random() * 8) < 1)
	{
		var cardIndex = Math.floor((Math.random() * this.mythicRares.length));
		var card = this.mythicRares[cardIndex];
		if (card == undefined)
		{
			console.log("mythic rare undefined");	
		}
		booster.push(card);
	}
	// Otherwise, pull one rare
	else
	{
		var cardIndex = Math.floor((Math.random() * this.rares.length));
		var card = this.rares[cardIndex];
		if (card == undefined)
		{
			console.log("rare undefined");	
		}
		booster.push(card);
	}

	// Pull 3 uncommons
	for (var j = 0; j < 3; j++)
	{
		var cardIndex = Math.floor((Math.random() * this.uncommons.length));
		var card = this.uncommons[cardIndex];
		if (card == undefined)
		{
			console.log("uncommon undefined");
		}
		booster.push(card);
	}

	// Pull 10 commons
	for (var j = 0; j < 10; j++)
	{
		var cardIndex = Math.floor((Math.random() * this.commons.length))
		var card = this.commons[cardIndex];
		if (card == undefined)
		{
			console.log("common undefined");
		}
		booster.push(card);
	}

	return booster;
}

CardSet.prototype.sort = function()
{
	var sortFunction = function (a, b)
	{
		if (a.colorOrdinal != b.colorOrdinal) { return a.colorOrdinal - b.colorOrdinal; }
		if (a.typeOrdinal != b.typeOrdinal) { return a.typeOrdinal - b.typeOrdinal; }
		if (a.rarityOrdinal != b.rarityOrdinal) { return a.rarityOrdinal - b.rarityOrdinal; }
		return a.cmc - b.cmc;
	};

	this.all.sort(sortFunction);

	this.mythicRares.sort(sortFunction);
	this.uncommons.sort(sortFunction);
	this.commons.sort(sortFunction);
	this.rares.sort(sortFunction);
	
	this.planeswalkers.sort(sortFunction);
	this.enchantments.sort(sortFunction);
	this.creatures.sort(sortFunction);
	this.sorceries.sort(sortFunction);
	this.artifacts.sort(sortFunction);
	this.instants.sort(sortFunction);
	this.lands.sort(sortFunction);
}

CardSet.prototype.push = function(card)
{
	this.all.push(card);

	// place color
	if (card.multicolored)
	{
		this.multicolored.push(card);
	}
	else if (card.colorless)
	{
		this.colorless.push(card);
	}
	else
	{
		if (card.white)
		{
			this.white.push(card);
		}
		else if (card.red)
		{
			this.red.push(card);
		}
		else if (card.blue)
		{
			this.blue.push(card);
		}
		else if (card.green)
		{
			this.green.push(card);
		}
		else if (card.black)
		{
			this.black.push(card);
		}
	}

	// place rarity
	if (card.mythicRare)
	{
		this.mythicRares.push(card);
	}
	else if (card.rare)
	{
		this.rares.push(card);
	}
	else if (card.uncommon)
	{
		this.uncommons.push(card);
	}
	else if (card.common)
	{
		// omit basic lands
		if (!card.land)
		{
			this.commons.push(card);
		}
	}

	// place type
	if (card.planeswalker)
	{
		this.planeswalkers.push(card);
	}
	if (card.enchantment)
	{
		this.enchantments.push(card);
	}
	if (card.creature)
	{
		this.creatures.push(card);
	}
	if (card.sorcery)
	{
		this.sorceries.push(card);
	}
	if (card.instant)
	{
		this.instants.push(card);
	}
	if (card.artifact)
	{
		this.artifacts.push(card);
	}
	if (card.land)
	{
		this.lands.push(card);
	}
}