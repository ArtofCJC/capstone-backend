const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attractionSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true }
)

const Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction