var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Promise = require('es6-promise').Promise;
var config = require('../../configuration/config.js');
var productErrors = require('../../routes/errors/productErrors.js');
mongoose.Promise = Promise;

exports.initPromise = function () {
    var promise = new Promise(function (resolve, reject) {
    mongoose.connect(config.mongodb.url, function (err) {
            if (!err)
                resolve();
            else
                reject(err);
        })
    })
    return promise;
};

var productSchema = new mongoose.Schema({
    title: String,
    name: String,
    desc: String,

    shippingDetails: {
        deimensions: {
            height: String,
            width: String,
            Weight: String,
        },
        weight: String
    },

    assets: {
        imgs: []
    },

    manufactureDetails: {
        modelNumber: String,
        releaseDate: Date
    },

    quantity: Number,

    pricing: {
        price: Number
    }

}, {
        collection: 'products'
    })

productSchema.plugin(mongoosePaginate);

var productModel = mongoose.model('products', productSchema);

exports.getProductById = function (pid, options) {
    var promise = new Promise(function (resolve, reject) {
        productModel.findById(pid, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                if (data === null) {
                    var err = new productErrors.ProductNotFoundError(pid);
                    reject(err);
                }
                else {
                    var result = {};
                    result.product = data._doc;
                    resolve(result);
                }
            }

        });
    });
    return promise;
}

exports.getProducts = function (options) {
    var pageSize = 10;
    var pageNumber = 1;
    var promise = new Promise(function (resolve, reject) {
        if (options.psize)
            pageSize = options.psize;

        if (options.pnum)
            pageNumber = options.pnum;

        productModel.paginate({}, {
            page: pageNumber,
            limit: pageSize
        }, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                var response = {};
                response.products = data._doc;
                response.paging = {
                    pageNumber: data.page,
                    pageSize: data.limit,
                    totalPages: data.pages
                };
                resolve(response);
            }
        });
    });
    return promise;
}

exports.saveProduct = function (productObj, options) {
    var product = createMongoObjectFromRequestObj(productObj);
    var promise = new Promise(function (resolve, reject) {
        product.save(function (err, data) {
            if (err)
                reject(err);
            else {
                var result = {};
                result.product = data._doc;
                resolve(result);
            }
        });
    });
    return promise;
}

exports.deleteProduct = function (pid, options) {
    var promise = new Promise(function (resolve, reject) {
        productModel.remove({ _id: pid }, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
    return promise;
}

exports.updateProduct = function (pid, updatedObj, options) {
    var promise = new Promise(function (resolve, reject) {
        productModel.findByIdAndUpdate(pid, updatedObj, function (err, data) {
            if (err)
                reject(err);
            else {
                if (data === null) {
                    var err = new productErrors.ProductNotFoundError(pid);
                    reject(err);
                }
                else {
                    var result = {};
                    result.product = data._doc;
                    resolve(result);
                }
            }
        });
    });
    return promise;
}

createMongoObjectFromRequestObj = function name(productObj) {
    var product = new productModel({
        _id: mongoose.Types.ObjectId(),
        title: productObj.title,
        name: productObj.name,
        desc: productObj.desc,
        //imageUrl : productObj.url
    })
    return product
}

exports.productModel = productModel;