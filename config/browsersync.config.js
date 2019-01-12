const config = require('./general.config');

module.exports = {
  proxy: `http://localhost:${config.port}`,
  port: config.port + 1000,
  notify: true,
};
