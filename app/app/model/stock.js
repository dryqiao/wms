module.exports = app => {
    const mongoose = app.mongoose
    const stockSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        amount: {
            type: Number,
            required: true
        },
        last_at: {
            type: Date,
            default: Date.now
        },
    })
    return mongoose.model('Stock', stockSchema)
}
