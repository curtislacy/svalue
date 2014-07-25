var request = require( 'request' ),
	r = require( 'ramda' ),
	l = require( 'lambdajs' ),
	future = require( 'data.future' ),
	httpClient = require('net.http-client');

//console.log( httpClient );
var q = httpClient.get();

q( 'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_GOLD&depth=50' ).fork(
	function( error ) {
		console.log( error );
	},
	function( result ) {
		console.log( result );
	}
);

//'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_GOLD&depth=50'

