const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const route     = require('./route');
const session    = require('express-session');
const passport   = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const axios      = require('axios');
mongoose.connect(process.env.MONGODB_URI);

const TWITCH_CLIENT_ID = '1v21lbgumahuvy0u0hokxxs5531iwl';
const TWITCH_SECRET    = 'NgPVDwh8qP8vhumHrhwUQ1EK1zPeGuWItg8baSUwDbM=';
const SESSION_SECRET   = 'Never underestimate the power of the scouts code';
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



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
