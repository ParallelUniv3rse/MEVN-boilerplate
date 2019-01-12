import express from 'express';
import path from 'path';
import VueRouter from '../../src/router/index';

const router = express.Router();

module.exports = (app) => {
  app.use('/', router);
};

router.get('*', (req, res, next) => {
  const matchResult = VueRouter.match(req.originalUrl);

  if (matchResult.matched[0].path !== '*') {
    res.sendFile(path.resolve(`${__dirname}/../views/index.html`));
  } else {
    next();
  }
});
