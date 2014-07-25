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
			'MSC_MAID': 'maid'			
		}
	}
}

async.mapSeries( Object.keys( Exchanges ), 
	function( exchange, doneExchange ) {
		async.map( Object.keys( Exchanges[ exchange ].currencies ),
			function( baseCurrency, doneBaseCurrency ) {
				async.map( Object.keys( Exchanges[ exchange ].currencies ),
					function( tradedCurrency, doneTradedCurrency ) {
						Exchanges[ exchange ].interface.orderBook( 
							Exchanges[ exchange ].currencies[ baseCurrency ], 
							Exchanges[ exchange ].currencies[ tradedCurrency ], 
							function( error, result ) {
								doneTradedCurrency( null, result );
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
		console.log( allResults );
	}
);



