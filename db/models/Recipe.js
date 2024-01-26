const {Schema, model} = require('mongoose');

const recipeSchema = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    requirements: {
        type: [
            {
                itemName: {
                    type: String,
                    required: true
                },
                itemNumber: {
                    type: Number,
                    required: true
                },
                itemUnit: {
                    type: String,
                    required: true
                }
            }
        ],
        required: true
    },
    categories: {
        type: [String],
        default: []
    },
    images: {
        type: [String],
        default: []
    },
    rate: {
        type: Number,
        default: 0
    },
    rateNumber: {
        type: Number,
        default: 0
    },
    body:{
        type:String,
        default:0
    },
    steps:{
        type:[{
            stepName:{
                type:String,
                required:true
            },
            stepBody:{
                type:String,
                required:true
            }
        }],
        default:[]
    }
});

module.exports = model("Recipe", recipeSchema);