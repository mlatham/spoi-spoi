function Card(name, cost, rarity, types, subTypes, set) 
{
	// TODO: these replacements help create a clean set
	var replacements = [
		[ 'felhideminotaur.jpg', 'fellhideminotaur.jpg' ],
		[ 'purphorossemissary.jpg', 'purphorosemissary.jpg' ],
		[ 'unravelthe%C3%A6ther.jpg', 'unraveltheaether.jpg' ],
		[ 'http://mythicspoiler.com/ths/cards/forest.jpg', 'http://mythicspoiler.com/ths/cards/forest1.jpg' ],
		[ 'http://mythicspoiler.com/ths/cards/mountain.jpg', 'http://mythicspoiler.com/ths/cards/mountain1.jpg' ],
		[ 'http://mythicspoiler.com/ths/cards/swamp.jpg', 'http://mythicspoiler.com/ths/cards/swamp1.jpg' ],
		[ 'http://mythicspoiler.com/ths/cards/plains.jpg', 'http://mythicspoiler.com/ths/cards/plains1.jpg' ],
		[ 'http://mythicspoiler.com/ths/cards/island.jpg', 'http://mythicspoiler.com/ths/cards/island1.jpg' ],
	];

	for (var i = 0; i < replacements.length; i++)
	{
		var replacement = replacements[i];

		if (name.indexOf(replacement[0]) >= 0)
		{
			name = name.replace(replacement[0], replacement[1]);

			break;
		}
	}

	this.name = name;

	this.cost = cost;
	if (this.cost)
	{
		this.cost = cost.toUpperCase();
	}

	this.subTypes = subTypes;
	if (this.subTypes)
	{
		this.subtypes = subTypes.toLowerCase();
	}

	this.rarity = rarity.toLowerCase();
	if (this.rarity)
	{
		this.rarity = rarity.toLowerCase();
	}

	this.types = types.toLowerCase();
	if (this.types)
	{
		this.types = types.toLowerCase();
	}

	this.set = set.toLowerCase();
	if (this.set)
	{
		this.set = set.toLowerCase();
	}

	var strippedName = name.replace(/([~!@#$%^&*()_+-=`{}\[\]\|\\:;'<>,.\/? ])+/g, '');
	this.imageUrl = 'http://mythicspoiler.com/' + set + '/cards/' + strippedName.toLowerCase() + ".jpg";
	
	// parse rarity
	if (rarity.indexOf('uncommon') >= 0)
	{
		this.uncommon = true;
		this.rarityOrdinal = 1;
	}
	else if (rarity.indexOf('common') >= 0)
	{
		this.common = true;
		this.rarityOrdinal = 0;
	}
	else if (rarity.indexOf('rare') >= 0)
	{
		this.rare = true;
		this.rarityOrdinal = 2;
	}
	else if (rarity.indexOf('mythic') >= 0)
	{
		this.mythicRare = true;
		this.rarityOrdinal = 3;
	}
	else
	{
		console.log("Unknown rarity");
	}

	this.typeOrdinal = -1;

	// parse type
	if (this.types.indexOf('creature') >= 0)
	{
		this.creature = true;
		if (this.typeOrdinal < 6)
		{
			this.typeOrdinal = 6;
		}
	}
	if (this.types.indexOf('planeswalker') >= 0)
	{
		this.planeswalker = true;
		if (this.typeOrdinal < 5)
		{
			this.typeOrdinal = 5;
		}
	}
	if (this.types.indexOf('enchantment') >= 0)
	{
		this.enchantment = true;
		if (this.typeOrdinal < 4)
		{
			this.typeOrdinal = 4;
		}
	}
	if (this.types.indexOf('instant') >= 0)
	{
		this.instant = true;
		if (this.typeOrdinal < 3)
		{
			this.typeOrdinal = 3;
		}
	}
	if (this.types.indexOf('sorcery') >= 0)
	{
		this.sorcery = true;
		if (this.typeOrdinal < 3)
		{
			this.typeOrdinal = 3;
		}
	}
	if (this.types.indexOf('artifact') >= 0)
	{
		this.artifact = true;
		if (this.typeOrdinal < 2)
		{
			this.typeOrdinal = 2;
		}
	}
	if (this.types.indexOf('land') >= 0)
	{
		this.land = true;
		if (this.typeOrdinal < 1)
		{
			this.typeOrdinal = 1;
		}
	}

	var colorCount = 0;
	var cmc = 0;

	// calculate color and CMC
	for (var i = 0; i < cost.length; i++)
	{
		var character = cost.charAt(i);
		if (character === 'W')
		{
			if (!this.white)
			{
				this.white = true;
				this.colorOrdinal = 0;
				colorCount++;
			}
			cmc++;
		}
		else if (character === 'R')
		{
			if (!this.red)
			{
				this.red = true;
				this.colorOrdinal = 1;
				colorCount++;
			}
			cmc++;
		}
		else if (character === 'U')
		{
			if (!this.blue)
			{
				this.blue = true;
				this.colorOrdinal = 2;
				colorCount++;
			}
			cmc++;
		}
		else if (character === 'B')
		{
			if (!this.black)
			{
				this.black = true;
				this.colorOrdinal = 3;
				colorCount++;
			}
			cmc++;
		}
		else if (character === 'G')
		{
			if (!this.green)
			{
				this.green = true;
				this.colorOrdinal = 4;
				colorCount++;
			}
			cmc++;
		}
		else
		{
			// add in the colorless cost
			cmc += parseInt(character);
		}
	}

	if (colorCount == 0)
	{
		this.colorless = true;
		this.colorOrdinal = 6;
	}
	else if (colorCount > 1)
	{
		this.multicolored = true;
		this.colorOrdinal = 5;
	}

	this.cmc = cmc;
}

Card.prototype.clone = function()
{
	var card = new Card(
		this.name,
		this.cost,
		this.rarity,
		this.types,
		this.subTypes,
		this.set);

	return card;
}