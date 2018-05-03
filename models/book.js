const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String, 
    rating: Number,
    price: Number
})

module.exports = mongoose.model('Book', bookSchema);