const Service = require('egg').Service

class logService extends Service {
    async index() {
        let res = await this.ctx.model.Log.find()
        return res
    }
    async create(req) {
        let res = await this.ctx.model.Log.create(req)
        return res
    }
    async findByName(name) {
        let res = await this.ctx.model.Log.find({
            name: name
        })
        return res
    }
}

module.exports = logService