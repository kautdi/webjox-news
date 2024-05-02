const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
    сategoryId: {type: Number},
    name: {type: String},
})

module.exports = model('Category', CategorySchema);
