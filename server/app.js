require('@babel/register');
// from here on all files which are required are transpiled by babel upon require -> use ES6 syntax in them
require('@babel/polyfill');

const express = require('express');
const config = require('../config/general.config');

let app = express();

app = require('./express')(app, config);

app.listen(config.port, () => {
  console.log(`Express server listening on port ${config.port}`);
});

module.exports = app;

