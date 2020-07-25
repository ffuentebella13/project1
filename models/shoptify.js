const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
        required: true
      },
    product:{
        type: String,
        required: true //this should be left no blank or null
    },
    price:{
        type: Number,
        required: true
    },
    stocks:{
        type: String,
        required: true
    },
    category:{
        type: String,
        enum: ['BEVERAGE','CANNED','HEALTH','GADGET','FROZEN'],
        default: 'FROZEN'
    },
    description:{
        type: String,
        required: true
    }
    
}, {
    timestamps: true,
    toJSON: {
      getters: true
    }
});

//Query Helpers
ProductSchema.query.beverage = function(){
    return this.where({
        status: 'BEVERAGE'
    })
    };
 ProductSchema.query.canned = function(){
    return this.where({
        status: 'CANNED'
    })
    };
ProductSchema.query.health = function(){
    return this.where({
        status: 'HEALTH'
    })
    };
ProductSchema.query.gadget = function(){
    return this.where({
        status: 'GADGET'
    })
    };   
ProductSchema.query.frozen = function(){
    return this.where({
        status: 'FROZEN'
    })
     };   

ProductSchema.virtual('synopsis')
.get(function (){
    const text = this.description;
    return text
    .replace(/(<([^>]+)>)/ig,"")
    .substring(0, 120);
});




module.exports = mongoose.model('Products', ProductSchema);