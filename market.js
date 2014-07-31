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
		if( flake.type === 'buy' ) ball.bid.push( _.pick( flake, [ 'price', 'amount' ]));
		else if( flake.type === 'sell' ) ball.ask.push( _.pick( flake, [ 'price', 'amount' ]));
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
		console.log( allResults.MasterXchange.BTC.MSC_MAID );
	}
);



