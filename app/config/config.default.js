'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532852521618_5958';

  // add your config here
  config.middleware = [];

  config.mongoose = {
    url: 'mongodb://118.24.157.90:27017/wms',
    options: {
      autoReconnect: true
    },
  };
  config.security = {
    domainWhiteList: ['http://localhost:8081'],
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };
  return config;
};