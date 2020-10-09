
const path = require( 'path' );
const express = require( 'express' );
const socketIO = require( 'socket.io' );

// import LED control API
const { LED } = require( './led-control' );

// create an express app
const app = express();

// send `index.html` from the current directory
// when `http://<ip>:3000/` route is accessed using `GET` method
app.get( '/', ( request, response ) => {
  response.sendFile( path.resolve( __dirname, 'web-app/index.html' ), {
    headers: {
      'Content-Type': 'text/html',
    }
  } );
} );

// send asset files
app.use( '/assets/', express.static( path.resolve( __dirname, 'web-app' ) ) );
app.use( '/assets/', express.static( path.resolve( __dirname, 'node_modules/socket.io-client/dist' ) ) );

// server listens on `3000` port
const server = app.listen( 3000, () => console.log( 'Express server started!' ) );

// create a WebSocket server
const io = socketIO( server );

// listen for connection
io.on( 'connection', ( client ) => {
  console.log( 'SOCKET: ', 'A client connected', client.id );

  // listen to `led-toggle` event
  client.on( 'led-toggle', ( data ) => {
    console.log( 'Light Tuned On.' );
    LED( data.r, data.g, data.b ); // toggle LEDs
  } );

} );
