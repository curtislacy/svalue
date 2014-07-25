var r = require('ramda');

console.log( 
	r.compose( 
		r.fork( r.divide, r.sum, r.size ), 
		r.reduce( function( snowball, flake ) {
			var n = parseInt( flake );

			if( !isNaN( n ) )
				return snowball.concat( n );
			else
				return snowball;
		}, [] )
	)( process.argv )
);