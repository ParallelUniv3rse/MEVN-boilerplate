import express from 'express';
import glob from 'glob';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compress from 'compression';
import path from 'path';

module.exports = (app, config) => {
  app.locals.ENV = process.env.NODE_ENV;

  // app.set('views', './views');
  // app.set('view engine', 'html');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(`${config.paths.dist}`));

  const controllers = glob.sync(`${__dirname}/controllers/*.js`);
  for (const controller of controllers) {
    import(controller).then(controller => controller(app));
  }

  // 404 handler
  app.use((req, res, next) => {
    res.status(404);
    res.sendFile(path.resolve(`${__dirname}/views/index.html`));
  });

  // error handler
  app.use((err, req, res, next) => {
    // render the error page
    res.status(err.status || 500);
    res.send(`${err.status} - Error`);
  });

  return app;
};
