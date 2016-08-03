var mongoose = require('mongoose');
var Promise = require('es6-promise');

var initPromise = new Promise(function(resolve,reject){
	mongoose.connect(config.mongodb.url,function(err){
        if(!err)
            resolve(initPromise);
        else
            reject(err);
        })
});

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
exports.initPromise = initPromise;