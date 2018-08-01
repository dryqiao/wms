'use strict'

const Controller = require('egg').Controller

class StockController extends Controller {
    async index() {
        const { ctx, service } = this
        const result = await service.stock.index(ctx.request.body)
        ctx.body = {
            c:1,
            data: result
        }
        ctx.status = 200
      }
  async create() {
     const { ctx, service } = this
        const result = await service.stock.create(ctx.request.body)
        ctx.body = {
            c:1,
            data: result
        }
        ctx.status = 200
    }
    async show() {
        const {ctx, service} = this
        const result = await service.stock.findByName(ctx.params.id)
        ctx.body = {
            c:1,
            data: result
        }
        ctx.status = 200

    }
}

module.exports = StockController
