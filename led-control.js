// import `onoff` package
const { Gpio } = require( 'onoff' );
const http= require('http')
 

// configure LED pins
const Room1 = new Gpio( 26, 'out' );
const Room2 = new Gpio( 19, 'out' );
const Room3 = new Gpio( 13, 'out' );

// toggle LED states
exports.LED = ( r, g, b ) => {
  Room1.writeSync( r ? 1 : 0 );
  Room2.writeSync( g ? 1 : 0 );
  Room3.writeSync( b ? 1 :0 );
};
