var mongoose = require('mongoose');
var Promise = require('es6-promise').Promise;

var config = require('../../configuration/config.js');

//var initPromise = new Promise(function(resolve,reject){
 	mongoose.connect(config.mongodb.url)//,function(err){
//         if(!err)
//             resolve(initPromise);
//         else
//             reject(err);
//         })
// });

var productSchema = new mongoose.Schema({
    title : String,
    name : String,
    desc : String,
    imageUrl : String 
},{collection : 'products'})

var  productModel = mongoose.model('products',productSchema);

exports.listProducts = function (options) {
    var promise = new Promise(function(resolve,reject){
        product.find(options)//for filtering pupose "option" is used.
        .then(function success(products){
            resolve(products);
        }
        ,function error(err){
            reject(err);
        })
    });
    
}

exports.saveProduct = function (productObj,options) {
    var product = createMongoObjectFromRequestObj(productObj);
    var promise = new Promise(function(resolve,reject){
        product.save()
        .then(function success(data){
            resolve(data);
        }
        ,function error(err){
            reject(err);
        })
    });
}

exports.deleteProduct = function (pid) {
    
}

exports.updateProduct = function (params) {
    
}

createMongoObjectFromRequestObj = function name(productObj) {
    var product = new productModel({
        title : productObj.title,
        name : productObj.name,
        desc:productObj.desc,
        imageUrl : productObj.url
    })
    return product
}

exports.productModel = productModel;