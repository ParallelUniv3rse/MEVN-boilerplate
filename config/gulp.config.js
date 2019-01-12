const config = require('./general.config');
const path = require('path');

/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

module.exports = {
  server: {
    nodemon: {
      script: path.join(config.paths.server, 'app.js'),
      // nodeArgs: ['--inspect'],
      ext: 'js json',
      stdout: false,
      ignore: ['views'],
      watch: [config.paths.server],
      env: {
        BABEL_ENV: 'server',
        NODE_ENV: 'development',
      },
    },
  },
  copyFiles: [
    'src/assets/img/**/*.*',
    'src/assets/fonts/**/*.*',
  ],
};
