var mongoose = require('mongoose');
var Promise = require('es6-promise').Promise;

var config = require('../../configuration/config.js');

//var initPromise = new Promise(function(resolve,reject){
mongoose.Promise = Promise;
mongoose.connect(config.mongodb.url)//,function(err){
//         if(!err)
//             resolve(initPromise);
//         else
//             reject(err);
//         })
// });

var productSchema = new mongoose.Schema({
    _id : mongoose.Schema.ObjectId,
    title : String,
    name : String,
    desc : String,
    
    shippingDetails :{
        deimensions:{
            height : String,
            width  : String,
            Weight : String,
        },
        weight : String
    },

    assets : {
        imgs :[]
    },

    manufactureDetails : {
        modelNumber : String,
        releaseDate : Date  
    },

    quantity : Number,

    pricing :{
        price : Number
    }

},{collection : 'products'})

var  productModel = mongoose.model('products',productSchema);


exports.getProductById = function (pid,options){
    var promise = new Promise(function(resolve,reject){

	product.find(pid)
		.then(function success(products) {
			resolve(products);
		}, function error(err) {
			reject(err);
		});
    });
    return promise;
}

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
    return promise;    
}

exports.saveProduct = function (productObj,options) {
    var product = createMongoObjectFromRequestObj(productObj);
    var promise = new Promise(function(resolve,reject){
        product.save(function(err,data){
            if(err)
                reject(err);

            resolve(data);   
         });
        //  .then(function success(data){
        //     resolve(data);
        // }
        // ,function error(err){
        //     reject(err);
        // })
    });
    return promise;
}

exports.deleteProduct = function (pid) {
    
}

exports.updateProduct = function (params) {
    
}

createMongoObjectFromRequestObj = function name(productObj) {
    var product = new productModel({
        _id : mongoose.Types.ObjectId(),
        title : productObj.title,
        name : productObj.name,
        desc:productObj.desc,
        //imageUrl : productObj.url
    })
    return product
}

exports.productModel = productModel;