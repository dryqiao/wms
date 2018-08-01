'use strict';

const Service = require('egg').Service;

class EqtService extends Service {
    async index() {
        return this.ctx.model.Eqt.find()
    }
    async create(req) {
        return this.ctx.model.Eqt.create(req)
    }
}

module.exports = EqtService;