const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const routes     = require('./routes');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const app = express();

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
