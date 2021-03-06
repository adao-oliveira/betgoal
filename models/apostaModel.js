const mongoose = require('mongoose')


const apostaSchema = new mongoose.Schema({
    titulo:{
        type: String,
        trim: true,
        required: true
    },
    taxaAposta:{
        type: Number,
        trim: true,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    },
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Aposta", apostaSchema)