const mongoose = require('mongoose')


const apostaSchema = new mongoose.Schema({
    titulo:{
        type: String,
        trim: true,
        required: true
    },
    taxaAposta:{
        type: String,
        trim: true,
        required: true
    },
    descricao:{
        type: String,
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