'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.resources('stock','/stock',controller.stock)
  router.resources('eqt','/eqt',controller.eqt)
  router.resources('log','/log',controller.log)
};
