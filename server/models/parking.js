const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const parkSchema = new Schema({
    name: String,
    latitude: String,
    longitude: String,
    price: Number,
    nbplace: Number,
    capteur: Array  
  
});

module.exports = mongoose.model('parking', parkSchema, 'parking');

