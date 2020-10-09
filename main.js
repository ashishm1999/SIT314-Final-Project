// get button elements
var Room1 = document.getElementById('button-red');
var Room2 = document.getElementById('button-green');
var Room3 = document.getElementById('button-blue');

// initial button states
var Room1_state = false;
var Room2_state = false;
var Room3_state = false;

// check for active connection
var isConnectionActive = false;

// connect to the Web Socket server and AWS load balancer to make it scalable
var connection = io('Project-811986977.eu-central-1.elb.amazonaws.com:3000');
fetch(`http://Project-811986977.eu-central-1.elb.amazonaws.com:3000/${Rooms}?${Data}`);

// when connection is established
connection.on('connect', () => {
  isConnectionActive = true;
  console.log("Light Turn On");
});

connection.on('disconnect', () => {
  isConnectionActive = false;
});

// WebSocket event emitter function
var emitEvent = function (event) {
  if (!isConnectionActive) {
    return alert('Server connection is closed!');
  }
  console.log("Light Turn On");

  // change button state
  if (event.target.id === 'button-red') { Room1_state = !Room1_state; }
  if (event.target.id === 'button-green') { Room2_state = !Room2_state; }
  if (event.target.id === 'button-blue') { Room3_state = !Room3_state; }

  // emit `led` socket event
  connection.emit('led', {
    r: Room1_state,
    g: Room2_state,
    b: Room3_state,
  });
};

// add event listeners on button
Room1.addEventListener('click', emitEvent);
Room2.addEventListener('click', emitEvent);
Room3.addEventListener('click', emitEvent);
