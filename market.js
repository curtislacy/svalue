var request = require( 'request' );
var _ = require( 'lodash' );
var async = require( 'async' );

function Poloniex() {};
Poloniex.prototype.orderBook = function( baseCurrency, tradedCurrency, done ) { // BTC_MAID
	return baseCurrency != tradedCurrency && baseCurrency && tradedCurrency ?
		request.get( 'https://poloniex.com/public?command=returnOrderBook&currencyPair=' + baseCurrency + '_' + tradedCurrency + '&depth=50', 
			function( error, message, response ) {
				if( error )
					done( error );
				else
				{
					var result = JSON.parse( response );
					done( result.error, result.error ? null : result );
				}
			}
		) : 
		done( new Error( 'Two currencies must be provided.' ));
};
Poloniex.prototype.translateOrderBook = function( orderBook ) {
	function translate( side ) {
		return _.map( side, function( item ) {
			return {
				'price': item[0],
				'amount': item[1]
			}
		})
	}

	return { 
		'ask': _.sortBy( translate( orderBook.asks ), 'price' ),
		'bid': _.sortBy( translate( orderBook.bids ), function( a ) { return -a.price; } )
	};
}

function MasterXchange() {};
MasterXchange.prototype.orderBook = function( baseCurrency, tradedCurrency, done ) { 
	return baseCurrency != tradedCurrency && baseCurrency === 'BTC' && tradedCurrency ?
		request.get( 'https://masterxchange.com/api/v2/orderbook.php?currency=' + tradedCurrency, 
			function( error, message, response ) {
				done( error, error ? null : JSON.parse( response ));
			}
		) :
		done( new Error( 'Two currencies must be provided, and baseCurrency must be BTC' ));
};
MasterXchange.prototype.translateOrderBook = function( orderBook ) {

	var result = {
		ask: [],
		bid: []
	};

	_.reduce( orderBook, function( ball, flake ) {
		if( flake.type === 'buy' ) ball.bid.push( _.mapValues( _.pick( flake, [ 'price', 'amount' ]), parseFloat ));
		else if( flake.type === 'sell' ) ball.ask.push( _.mapValues( _.pick( flake, [ 'price', 'amount' ]), parseFloat ));
		return ball;
	}, result );

	return {
		'ask': _.sortBy( result.ask, 'price' ),
		'bid': _.sortBy( result.bid, function( a ) { return -a.price; } ),
	};
}

var Exchanges = {
	'Poloniex': {
		'interface': new Poloniex(),
		'currencies' : {
			'BTC': 'BTC',
			'MSC': 'MSC',
			'MSC_MAID': 'MAID',
			'XCP_GOLDDTT': 'GOLD',
			'MSC_XAP': 'XAP'
		}
	},
	'MasterXchange': {
		'interface': new MasterXchange(),
		'currencies': {
			'BTC': 'BTC',
			'MSC': 'msc',
			'MSC_MAID': 'maid',
			'MSC_XAP': 'xap'
		}
	}
}

function sumOrders( data, amount ) {
	if( amount == 0 )
		return 0;

	var totalPrice = 0;
	var accumulator = 0;

	for( var n = 0; ( n < data.length ) && ( accumulator < amount ); n++ )
	{
		var orderAmount = data[ n ].amount < amount - accumulator ? data[ n ].amount : amount - accumulator;
		totalPrice += orderAmount * data[ n ].price;
		accumulator += orderAmount;
	}

	return accumulator >= orderAmount ? totalPrice : 'Not Available';
}

function liquidValue( orderBook, amount ) {
	return sumOrders( orderBook.bid, amount );
}

function purchasePrice( orderBook, amount ) {
	return sumOrders( orderBook.ask, amount );
}

async.reduce( Object.keys( Exchanges ), {},
	function( memo, exchangeName, doneExchange ) {
		var exchange = Exchanges[ exchangeName ];
		async.reduce( Object.keys( exchange.currencies ), memo,
			function( memo, baseCurrency, doneBaseCurrency ) {
				async.reduce( Object.keys( exchange.currencies ), memo,
					function( memo, tradedCurrency, doneTradedCurrency ) {
						exchange.interface.orderBook( 
							exchange.currencies[ baseCurrency ], 
							exchange.currencies[ tradedCurrency ], 
							function( error, result ) {
								if( !error && result )
								{
									if( !memo[ exchangeName ]) memo[ exchangeName ] = {};
									if( !memo[ exchangeName ][ baseCurrency ])
										memo[ exchangeName ][ baseCurrency ] = {};
									memo[ exchangeName ][ baseCurrency ][ tradedCurrency ] = 
										exchange.interface.translateOrderBook( result );
								}
								doneTradedCurrency( null, memo );
							} );
					},
					function( error, baseCurrencyResults ) {
						doneBaseCurrency( null, baseCurrencyResults );
					});
			},
			function( error, exchangeResults ) {
				doneExchange( error, error ? null : exchangeResults );
			});
	},
	function( error, allResults ) {

		console.log( '1/10 oz Gold Eagle Sale Market' );
		for( var n=0; n<=10; n++ )
			console.log( n + ' GOLDDTT: ' + liquidValue( allResults.Poloniex.BTC.XCP_GOLDDTT, n ) + ' BTC' );

		console.log();

		console.log( 'MaidSafeCoin Sale Markets' );
		for( var n=1; n < 300000; n *= 2 )
			console.log( n + ' MAID: ' + 
				liquidValue( allResults.MasterXchange.BTC.MSC_MAID, n ) + ' BTC(MX), ' +  
				liquidValue( allResults.Poloniex.BTC.MSC_MAID, n ) + ' BTC(PX)' );

		console.log();

		console.log( 'APICoin Sale Markets' );
		for( var n=1; n < 300000; n *= 2 )
			console.log( n + ' XAP: ' + 
				liquidValue( allResults.MasterXchange.BTC.MSC_XAP, n ) + ' BTC(MX), ' +  
				liquidValue( allResults.Poloniex.BTC.MSC_XAP, n ) + ' BTC(PX)' );

		console.log();

		console.log( 'MaidSafeCoin Arbitrage Opportunity (1)?')
		for( var n=1; n < 300000; n *= 2 )
			console.log( n + ' MAID: ' + 
				purchasePrice( allResults.MasterXchange.BTC.MSC_MAID, n ) + ' BTC(MX Buy), ' +  
				liquidValue( allResults.Poloniex.BTC.MSC_MAID, n ) + ' BTC(PX Sale)' );

		console.log();
		console.log( 'MaidSafeCoin Arbitrage Opportunity (2)?')
		for( var n=1; n < 300000; n *= 2 )
			console.log( n + ' MAID: ' + 
				liquidValue( allResults.MasterXchange.BTC.MSC_MAID, n ) + ' BTC(MX Sale), ' +  
				purchasePrice( allResults.Poloniex.BTC.MSC_MAID, n ) + ' BTC(PX Buy)' );
	}
);



