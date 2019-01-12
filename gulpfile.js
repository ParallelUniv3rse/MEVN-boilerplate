const path = require('path');
const del = require('del');
const chalk = require('chalk');
const dedent = require('dedent-js');
const yargs = require('yargs');
const gulp = require('gulp');
const rollup = require('rollup');
const GulpClass = require('classy-gulp');
const config = require('./config/general.config');

/**
 * Gulp plugins starting with "gulp-<name>" are loaded automatically under gPlugins.<name>
 *     You can rename them or call functions on required plugins via options object passed to gulp-load-plugins:
 *     {
 *     rename: {},
 *     postRequireTransforms: {}
 *     }
 * Others are manually appended via the second array.
 */
const gPlugins = {
  ...require('gulp-load-plugins')(),
  ...{
    browserSync: require('browser-sync').create(),
  },
};
const gOptions = {
  ...require('./config/gulp.config'),
  ...{
    analyzeBundles: !!(yargs.argv.analyze),
  },
};

class Flow extends GulpClass {
  constructor() {
    super();
    /**
     * A friendly greeting for you, you beautiful ;)
     */
    console.log(chalk.blue(dedent(`
        * Hey! I'm gulp. ༼つಠ益ಠ༽つ ─=≡ΣO))
        * Your personal workflow magician.
        `)));
  }

  defineTasks() {
    /**
     * All tasks which are accessible via "gulp <taskName>" are defined here.
     */
    return {
      server: gulp.series(this.server, this.startBrowserSync),
      build: gulp.parallel(this.copyFiles, this.rollup),
      default: gulp.series('build', 'server', this.watch),
    };
  }

  /**
   * Runs everything we need to do with Vue. Compiles Vue templates including SCSS via rollup
   */
  rollup(done) {
    // bundle files into /tmp because rollup gulp plugins don't have support for code splitting
    const rollupOptions = require('./config/rollup.config')({
      analyze: gOptions.analyzeBundles,
    });

    rollup.rollup(rollupOptions)
      .then(bundle => bundle.write(rollupOptions.output));

    // run the rest of the pipeline
    // gulp.src('tmp/**/*.js')
    //   .pipe(gPlugins.plumber())
    //   .pipe(gPlugins.sourcemaps.init({ loadMaps: true }))
    //   // add any more JS transformations here
    //   .pipe(gPlugins.sourcemaps.write('.'))
    //   .pipe(gulp.dest(config.paths.vue.dist));

    // clear the tmp directory
    // del('tmp/**');
    done();
  }

  /**
   * Compiles general project styles. Vue component-specific styles are handled during js compilation.
   */
  styles() {
    return gulp.src([path.join(config.paths.sass.src, '/**/*.scss')])
      .pipe(gPlugins.plumber())
      .pipe(gPlugins.sourcemaps.init())
      .pipe(gPlugins.sass(require('./config/nodesass.config')).on('error', gPlugins.sass.logError))
      .pipe(gPlugins.postcss(require('./config/postcss.config')))
      .pipe(gPlugins.sourcemaps.write('.'))
      .pipe(gulp.dest(config.paths.sass.dist))
      .pipe(gPlugins.browserSync.stream({ match: '**/*.{css|map}' }));
  }

  /**
   * Copies specific files defined in gulp options.
   */
  copyFiles() {
    return gulp.src(gOptions.copyFiles, { base: config.paths.src, allowEmpty: true })
      .pipe(gulp.dest(config.paths.dist));
  }

  /**
   * Watches for changes and automatically performs a given task depending on the type of file changed.
   */
  watch(done) {
    gulp.watch(path.join(config.paths.sass.src, '/**/*.scss'), gulp.series(this.styles, this.reload)); // SCSS recompile & reload
    gulp.watch(path.join(config.paths.server, '**/*.html'), gulp.series(this.reload)); // Express templates
    gulp.watch([
      path.join(config.paths.vue.src, '**/*.vue'),
      path.join(config.paths.vue.src, '**/*.js'),
    ], gulp.series(this.rollup, this.reload)); // Vue + frontend JS
    done();
  }

  /**
   *      ========= "Utility" classes start =========
   */


  /**
   *      ========= BrowserSync =========
   */

  /**
   * Starts the browsersync proxy server
   */
  startBrowserSync(done) {
    gPlugins.browserSync.init(require('./config/browsersync.config'), done);
  }

  /**
   * Reloads the whole page via browsersync
   */
  reload(done) {
    gPlugins.browserSync.reload();
    done();
  }

  /**
   *      ======== Nodemon ========
   */

  /**
   * Initializes a nodemon server
   */
  server() {
    const _this = this;
    const STARTUP_TIMEOUT = 5000;
    return new Promise((resolve, reject) => {
      const server = gPlugins.nodemon(gOptions.server.nodemon);
      let starting = false;

      const onReady = () => {
        starting = false;
        resolve(true);
      };

      /**
       * on.('start') fires when the entry file starts processing - no bueno.
       */
      server.on('start', () => {
        starting = true;
        setTimeout(onReady, STARTUP_TIMEOUT);
      });

      /**
       * Stupid nodemon workaround for when server is ready
       * - the server is ready on the first console.log
       */
      server.on('stdout', (stdout) => {
        process.stdout.write(stdout); // pass the stdout through
        if (starting) {
          onReady();
        }
      });

      server.on('restart', () => {
        console.log(chalk.green(dedent(`
            * 
            *   Restarting nodemon server...
            *
            `)));
        gulp.series(_this.reload);
      });

      server.on('crash', () => {
        console.log(chalk.green(dedent(`
            * 
            *   Nodemon server crashed! Restarting in 5 seconds...
            *
            `)));
        server.emit('restart', 5); // restart the server in 5 seconds
      });
    });
  }
}

/**
 *      Let's get the party started!
 */
gulp.registry(new Flow());
