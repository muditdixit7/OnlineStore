var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Promise = require('es6-promise').Promise;
var config = require('../../configuration/config.js');
var productErrors = require('../../routes/errors/productErrors.js');
mongoose.Promise = Promise;

exports.initPromise = function () {
    var promise = new Promise(function (resolve, reject) {
        var mongoUri = process.env.MONGODB_URI || config.mongodb.url
        mongoose.connect(mongoUri, function (err) {
            if (!err)
                resolve();
            else
                reject(err);
        })
    })
    return promise;
};

var productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },

    shippingDetails: {
        deimensions: {
            height: { type: String, required: true },
            width: { type: String, required: true },
        },
        weight: String
    },

    manufacturingDetails: {
        modelNumber: { type: String, required: true },
        releaseDate: { type: Date, required: true }
    },

    quantity: { type: Number, required: true },

    pricing: {
        price: { type: Number, required: true }
    }

}, {
        collection: 'products'
    });

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
                    var product = data._doc;
                    resolve(product);
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
                response.products = data.docs;
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
                var product = data._doc;
                resolve(product);
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
                resolve();
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
                    var product = data._doc;
                    resolve(product);
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
        pricing: productObj.pricing,
        manufacturingDetails: productObj.manufacturingDetails,
        shippingDetails: productObj.shippingDetails,
        quantity: productObj.quantity
    })
    return product
}

exports.productModel = productModel;