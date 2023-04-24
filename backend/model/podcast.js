const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    description: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: [String]
    },
    type:{
        required: true,
        type : String
    },
    speaker:{
        required: true,
        type : String
    },
    image:{
        required: true,
        type : String
    },
    content:{
        required: true,
        type : String
    },
    viewcount:{
        required: true,
        type : Number,
        default: 0
    }
},
{ timestamps: true })

module.exports = mongoose.model('podcast', dataSchema)