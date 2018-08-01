module.exports = app => {
    const mongoose = app.mongoose
    const EqtSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        create_at: {
            type: Date,
            default: Date.now
        },
    })
    return mongoose.model('Eqt', EqtSchema)
}