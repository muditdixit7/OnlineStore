var mongoose = require('mongoose')

function init(config){
	mongoose.connect(config.mongodb.url);
}

var productSchema = new mongoose.Schema({
    title : string,
    name : string,
    desc : string,
    imageUrl : string 
},{collection : 'products'})

var locationModel = mongoose.model('products',productSchema);


locationModel.listAllProducts = function (params) {
    
}

locationModel.updateProduct = function (params) {
    
}

locationModel.deleteProduct = function (params) {
    
}

locationModel.updateProduct = function (params) {
    
}


exports.locationModel = locationModel; 
exports.init = init;