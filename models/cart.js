const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    product_id:{
        type: String,
        required: true //this should be left no blank or null
    },
    product:{
        type: String,
        required: true //this should be left no blank or null
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
},{
timestamps: true
});


module.exports = mongoose.model('Cart', CartSchema);