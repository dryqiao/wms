module.exports = app => {
    const mongoose = app.mongoose
    const LogSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        operater: {
            type: String,
        },
        in_stock: {
            type: Boolean,
            required: true
        },
        create_at: {
            type: Date,
            default: Date.now
        },
    })
    return mongoose.model('Log', LogSchema)
}
