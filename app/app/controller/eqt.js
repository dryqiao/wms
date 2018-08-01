'use strict';

const Controller = require('egg').Controller;

class EqtController extends Controller {
    async index() {
        let res = await this.service.eqt.index()
        this.ctx.body = {
            c: 1,
            data: res
        }
        this.ctx.status = 200
    }
    async create() {
        const {
            ctx,
            service
        } = this
        const result = await service.eqt.create(ctx.request.body)
        ctx.body = {
            c: 1,
            data: result
        }
        ctx.status = 200
    }
}

module.exports = EqtController;