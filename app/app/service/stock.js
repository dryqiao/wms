const Service = require('egg').Service

class stockService extends Service {
    async index() {
        let res = await this.ctx.model.Stock.find()
        return res
    }
    async createStock(req) {
        return this.ctx.model.Stock.create(req)
    }
    async updateStock(req) {
        return this.ctx.model.Stock.update({
            name: req.name
        },req)
    }
    async create(req) {
        let res_log = null
        let res_stock = null
        let stock = await this.ctx.model.Stock.findOne({
            name: req.name
        })
        if (!stock) {
            if (req.in_stock) {
                res_stock = this.createStock(req),
                    res_log = this.service.log.create(req)
                console.log(res_log);
            } else {
                return '库存不能小于0!'
            }
        } else {
            let _amount = stock.amount + req.amount * (req.in_stock ? 1 : -1)
            if (_amount < 0) {
                return '库存不能小于0!'
            } else {
                res_stock = await this.updateStock({
                    name: req.name,
                    amount: _amount
                })
                res_log = await this.service.log.create(req)
            }
        }
        return [res_stock, res_log]
    }
    async findByName(name) {
        let res_stock = await this.ctx.model.Stock.find({
            name: name
        })
        return res_stock
    }
}

module.exports = stockService