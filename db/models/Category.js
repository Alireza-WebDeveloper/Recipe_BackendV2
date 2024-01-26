const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = model("Category", categorySchema);