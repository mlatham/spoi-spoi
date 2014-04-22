var cardSets = [];
var random;

// add spoiler URLs, mythic spoiler set names (for images), and booster count.
var spoilerUrls = [ 
	[ 'http://www.mtgsalvation.com/spoilers/138-journey-into-nyx', 	"nyx", 2 ],
	[ 'http://www.mtgsalvation.com/spoilers/134-born-of-the-gods', 	'bng', 1 ],
	[ 'http://www.mtgsalvation.com/spoilers/132-theros', 			'ths', 2 ]
	// [ 'http://www.mtgsalvation.com/innistrad-spoiler.html', 'isd' ],
	// [ 'http://www.mtgsalvation.com/dark-ascension-spoiler.html', 'dka' ],
	// [ 'http://www.mtgsalvation.com/avacyn-restored-spoiler.html', 'avr' ]
	];

// if there is no random number seed, generate one
var seed = getParameterByName('seed');

if (!seed)
{
	// generate a new seed
	seed = Math.floor(Math.random() * 999999999);

	// navigate to the url with the random number seed
	window.location.href = (window.location.href +  "?seed=" + seed);
}
else
{
	// create the random generator
	random = new SeedRandom(parseInt(seed));

	// begin parsing
	parseCardSet(0);
}

function getParameterByName(name)
{
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function parseCardSet(urlIndex)
{
	var url = spoilerUrls[urlIndex][0];
	var set = spoilerUrls[urlIndex][1];

	$.ajax({
	    dataType: 'html',
	    url: url,
	    success: function (data)
	    {
	    	var $html = $.parseHTML( data );

	    	// scrape html
	    	var cardSet = parseCards($html, set);

	    	// add the card set
	    	cardSets.push(cardSet);

	    	// move onto the next card set
	    	urlIndex++;

	    	// recurse
	    	if (urlIndex < spoilerUrls.length)
	    	{
	    		parseCardSet(urlIndex);
	    	}
	    	else
	    	{
	    		main();
	    	}
	    }});

	}

function parseCards(data, set)
{
	var cardSet = new CardSet(set, random);

	$('.t-spoiler', data).each(function(index) 
	{
		// parse header
		var headerElement = $( '.t-spoiler-header', $(this) );

		var manaElement = $( '.t-spoiler-mana', headerElement );
		var headerH2Element = $( 'h2', headerElement );

		// parse the card name
		var nameElement = headerH2Element.eq(0).eq(0);
		var name = nameElement.text().trim();

		// parse the mana cost
		var cost = manaElement.text().trim().replace(/\s/g, '');
		console.log('cost: ' + cost);

		// parse the type
		var typeElement = $( '.t-spoiler-type', $(this) ); 

		// type
		var typesAndSubtypes = typeElement.text().trim().split(' - ');
		var types = typesAndSubtypes[0];  
		var subTypes = typesAndSubtypes[1];

		// rarity
		var rarity = 'common';
		var classList = $( '.mtg-set-icon', $(this) ).attr('class').split(/\s+/);
		$.each( classList, function(index, item)
		{
			if (item.indexOf("uncommon") != -1)
			{
				rarity = "uncommon";
			}
			else if (item.indexOf("common") != -1)
			{
				rarity = "common";
			}
			else if (item.indexOf("rare") != -1)
			{
				rarity = "rare";
			}
			else if (item.indexOf("mythic") != -1)
			{
				rarity = "mythic";
			}
		});

		// create the card
		var card = new Card(name, cost, rarity, types, subTypes, set);
		cardSet.push(card);
	});

	return cardSet;
}

function renderH1(text)
{
	var cardsDiv = $( '#cards' );
	var html = '<h1>' + text + '</h1>';
	cardsDiv.append(html);
}

function renderVisualTable(cards)
{
	var cardsDiv = $( '#cards' );
	var cardsHtml = '<table width="100%">';

	var i = 0;

	while (i < cards.length)
	{
		cardsHtml += '<tr>';

		var column = 0;

		while (i < cards.length
			&& column < 5)
		{
			var card = cards[i];

			cardsHtml += '<td width="20%"><';
			cardsHtml += 	'<img width="100%" src="' + card.imageUrl + '"></img>';
			cardsHtml += '</td>';

			// increment counters
			column++;
			i++;
		}

		cardsHtml += '</tr>';
	}

	cardsHtml += '</table>';

	cardsDiv.append(cardsHtml);
}

function sortPool(pool)
{
	var sortFunction = function (a, b)
	{
		if (a.colorOrdinal != b.colorOrdinal) { return a.colorOrdinal - b.colorOrdinal; }
		if (a.typeOrdinal != b.typeOrdinal) { return a.typeOrdinal - b.typeOrdinal; }
		if (a.rarityOrdinal != b.rarityOrdinal) { return a.rarityOrdinal - b.rarityOrdinal; }
		if (a.cmc != b.cmc) { return a.cmc - b.cmc };
		if (a.name < b.name)
			return -1;
		if (a.name > b.name)
			return 1;
		return 0;
	};

	pool.sort(sortFunction);
}

function main()
{
	var pool = [];

	for (var i = 0; i < cardSets.length; i++)
	{
		var boosterCount = spoilerUrls[i][2];

		var cardSet = cardSets[i];

		// sort the card set (shouldn't matter)
		cardSet.sort();

		for (var j = 0; j < boosterCount; j++)
		{
			// generate a booster pack
			var booster = cardSet.getBooster();

			// add each card
			for (var k = 0; k < booster.length; k++)
			{
				pool.push(booster[k]);
			}
		}
	}

	// sort the pool
	sortPool(pool);

	// render the visual table
	renderVisualTable(pool);

	// print set metrics
	var maxCreatureCMC = 0;

	for (var i = 0; i < cardSets.length; i++)
	{
		var cardSet = cardSets[i];

		if (maxCreatureCMC < cardSet.maxCreatureCMC)
		{
			maxCreatureCMC = cardSet.maxCreatureCMC;
		}
	}

	// get top play options at each CMC
}