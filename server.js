const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const route     = require('./route');
const session    = require('express-session');
const passport   = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const axios      = require('axios');
let ws;
mongoose.connect(process.env.MONGODB_URI);

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_SECRET    = process.env.TWITCH_SECRET;
const SESSION_SECRET   = process.env.SESSION_SECRET;
const CALLBACK_URL     = 'https://localhost:3000';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', route);

OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
  var options = {
    url: 'https://api.twitch.tv/kraken/user',
    method: 'GET',
    headers: {
      'Client-ID': TWITCH_CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Authorization': 'OAuth ' + accessToken
    }
  };

  axios(options, function (error, response, body) {
  if (response && response.statusCode == 200) {
    done(null, JSON.parse(body));
  } else {
    done(JSON.parse(body));
  }
});
}

app.get('/auth/twitch', passport.authenticate('twitch', { scope: 'user_read' }));

// Set route for OAuth redirect
app.get('/auth/twitch/callback', passport.authenticate('twitch', { successRedirect: '/', failureRedirect: '/' }));


// function heartbeat() {
//     message = {
//         type: 'PING'
//     };
//     $('.ws-output').append('SENT: ' + JSON.stringify(message) + '\n');
//     ws.send(JSON.stringify(message));
// }
//
// function connect() {
//   var heartbeatInterval = 1000 * 60; //ms between PING's
//   var reconnectInterval = 1000 * 3; //ms to wait before reconnect
//   var heartbeatHandle;
//
//   ws.onmessage = function(event) {
//     message = JSON.parse(event.data);
//     $('.ws-output').append('RECV: ' + JSON.stringify(message) + '\n');
//     if (message.type == 'RECONNECT') {
//         $('.ws-output').append('INFO: Reconnecting...\n');
//         setTimeout(connect, reconnectInterval);
//     }
// };
//
// ws = new WebSocket('wss://pubsub-edge.twitch.tv');


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
