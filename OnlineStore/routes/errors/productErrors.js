var errorCodes = require('./errorCodes.js');

function InvalidArguementError(additional_details){
	var temp 					   = Error.apply(this, arguments);
	this.stack					   = temp.stack;
	this.name 					   = "InvalidArguementError";
	this.status                    = errorCodes.INVALID_PARAMETERS;
	this.status.additional_details = additional_details;
}

function ProductNotFoundError(pid){
	var temp 		 = Error.apply(this, arguments);
	this.stack		 = temp.stack;
	this.status      = {};
	this.name		 = "ProductNotFoundError";
	this.status.code = errorCodes.PRODUCT_NOTFOUND.code;
	this.status.msg  = errorCodes.PRODUCT_NOTFOUND.msg + " " + pid ;
    this.status.additional_details = [];
}

InvalidArguementError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: InvalidArguementError,
        writable: true,
        configurable: true
    }
});

ProductNotFoundError.prototype = Object.create(Error.prototype, {
    constructor: {
        value: ProductNotFoundError,
        writable: true,
        configurable: true
    }
});

exports.InvalidArguementError = InvalidArguementError;
exports.ProductNotFoundError = ProductNotFoundError;