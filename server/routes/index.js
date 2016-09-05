"use strict";

const TodoRoutes = require('../api/todo/routes/todo-routes');

const StaticDispatcher = require('../commons/static/index');


module.exports = class Routes {
  static init(app, router) {
    TodoRoutes.init(router);

    router
      .route('/')
      // .route('*')
      .get(StaticDispatcher.sendIndex);

    app.use('/', router);
    app.use('/api/heroes', function (req, res, next) {
      console.log('Going to call next() from main end-point to heroes services with: ', req.originalUrl);
      next();
    // }, require('../api/heroes/index'));
    }, require('../api/heroes'));
  }
}
