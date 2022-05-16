const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Product = new Schema({
    Product_Name: {
        type: String
    },
    Product_Type: {
        type: String
    },
    Product_Catergory: {
        type: String
    },
    Product_Description: {
        type: String
    },
    Product_Price: {
        type: String
    },
    Product_Image:{
        type:String
    }
});

module.exports = mongoose.model('Product', Product);