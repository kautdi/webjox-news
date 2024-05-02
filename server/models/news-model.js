const {Schema, model} = require('mongoose');

const NewsSchema = new Schema({
    img: {type: String},
    title: {type: String, required: true},
    description:{type: String},
    status: {type: Boolean},
    categoryId: {type: String}
})

module.exports = model('News', NewsSchema);
