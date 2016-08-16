var chai = require('chai');
var Client = require('node-rest-client').Client;
var should = chai.should();

var validCreateRequest = require('../mockData/validCreateRequest.js');
var invalidCreateRequest = require('../mockData/invalidCreateRequest.js');
var updateRequest = require('../mockData/updateRequest.js');

var productId = null;
var client = new Client();


describe('Product service', function () { 
    describe('Get products', function () {
        it('should fetch a list of products', function (done) {
            var args = {
              headers: {"x-access-token" : "x-access-token" }
            };
            client.get("http://localhost:3000/getProducts",function(data,response){
                should.exist(data.products);
                data.status.should.have.a.property("code").that.equals(200);
				data.status.should.have.a.property("msg").that.equals("Success");
                done();
            })
        });
          it('should fetch a list of products', function (done) {
              var args = {
              headers: {"x-access-token" : "x-access-token" }
            };
                client.get("http://localhost:3000/getProducts?psize=5&pnum=1",function(data,response){
                should.exist(data.products);
                data.status.should.have.a.property("code").that.equals(200);
				data.status.should.have.a.property("msg").that.equals("Success");
                done();
            })
        });
          it('should fetch a list of products', function (done) {
              var args = {
              headers: {"x-access-token" : "x-access-token" }
            };
                client.get("http://localhost:3000/getProducts?psize=5&pnum=1",function(data,response){
                should.exist(data.products);
                data.status.should.have.a.property("code").that.equals(200);
				data.status.should.have.a.property("msg").that.equals("Success");
                done();
            })
        });
    });
    describe('Get product by id', function () {
        it('should fetch a product of specified id', function (done) {
            var args = {
              headers: {"x-access-token" : "x-access-token" }
            };
            client.get("http://localhost:3000/getProductById/57b1944f08a1f455232b860c",function(data,response){
                should.exist(data.product);
                data.product.should.have.a.property("title");
                data.product.should.have.a.property("name");
                data.product.should.have.a.property("desc");
                data.product.should.have.a.property("shippingDetails");
                data.product.should.have.a.property("manufacturingDetails");
                data.status.should.have.a.property("code").that.equals(200);
				data.status.should.have.a.property("msg").that.equals("Success");
                done();
            })
        });
          it('should not fetch a product', function (done) {
              var args = {
              headers: {"x-access-token" : "x-access-token" }
            };
                client.get("http://localhost:3000/getProductById/57a7868d75433",function(data,response){
                should.not.exist(data.product);
                data.status.should.have.a.property("code").that.equals(2001);
				data.status.should.have.a.property("msg").that.equals("Invalid parameters provided. Have a look at additional details");
                done();
            })
        });
          it('should fetch a product of specified id', function (done) {
              var args = {
              headers: {"x-access-token" : "x-access-token" }
            };
                client.get("http://localhost:3000/getProductById/57b1945b08a1f455232b860e",function(data,response){
                should.exist(data.product);
                data.product.should.have.a.property("title");
                data.product.should.have.a.property("name");
                data.product.should.have.a.property("desc");
                data.product.should.have.a.property("shippingDetails");
                data.product.should.have.a.property("manufacturingDetails");              
                data.status.should.have.a.property("code").that.equals(200);
				data.status.should.have.a.property("msg").that.equals("Success");
                done();
            })
        });
    });

    describe('Create product', function () {
        it('should successfully create a prdouct', function (done) {
            var args = {
              data: validCreateRequest,
              headers: { "Content-Type": "application/json" , "x-access-token" : "x-access-token" }
            };
            client.post("http://localhost:3000/createProduct",args,function(data,response){
                should.exist(data.product);
                data.product.should.have.a.property("title");
                data.product.should.have.a.property("name");
                data.product.should.have.a.property("desc");
                data.product.should.have.a.property("shippingDetails");
                data.product.should.have.a.property("manufacturingDetails");
                data.status.should.have.a.property("code").that.equals(200);
				data.status.should.have.a.property("msg").that.equals("Success");

                productId = data.product._id/*The product which is created will be the same being deleted*/;

                done();
            })
        });
          it('shoudl fail to successfully create a product', function (done) {
              
              var args = {
              data: invalidCreateRequest,
              headers: { "Content-Type": "application/json" , "x-access-token" : "x-access-token" }
              };
              
              client.post("http://localhost:3000/createProduct",args,function(data,response){
                should.not.exist(data.product);
                data.status.should.have.a.property("code").that.equals(2001);
				data.status.should.have.a.property("msg").that.equals("Invalid parameters provided. Have a look at additional details");
                done();
            })
        });
    });
    describe('Update product', function () {
        it('should successfully update the prdouct', function (done) {
            var args = {
              data: updateRequest,
              path:{pid : productId},
              headers: { "Content-Type": "application/json" , "x-access-token" : "x-access-token" }
            };
            client.post("http://localhost:3000/updateProduct/${pid}",args,function(data,response){
                should.exist(data.product);
                data.product.should.have.a.property("title");
                data.product.should.have.a.property("name");
                data.product.should.have.a.property("desc");
                data.product.should.have.a.property("shippingDetails");
                data.product.should.have.a.property("manufacturingDetails");
                data.status.should.have.a.property("code").that.equals(200);
				data.status.should.have.a.property("msg").that.equals("Success");

                productId = data.product._id/*The product which is created will be the same being deleted*/;

                done();
            })
        });
          it('shoudl fail to successfully create a product', function (done) {
              
              var args = {
              data: invalidCreateRequest,
              path :{pid : "4938742hdgh"},
              headers: { "Content-Type": "application/json" , "x-access-token" : "x-access-token" }
              };
              
              client.post("http://localhost:3000/updateProduct/${pid}",args,function(data,response){
                should.not.exist(data.product);
                data.status.should.have.a.property("code").that.equals(2001);
				data.status.should.have.a.property("msg").that.equals("Invalid parameters provided. Have a look at additional details");
                done();
            })
        });
    });

    describe('Delete product', function () {
        it('should successfully delete the prdouct against specified product Id', function (done) {
            var args = {
              path : {pid : productId /*The product which was created is the same being deleted*/ },
              headers: { "Content-Type": "application/json" , "x-access-token" : "x-access-token" }
            };
            client.delete("http://localhost:3000/deleteProduct/${pid}",args,function(data,response){
                should.exist(data.status);
                data.status.should.have.a.property("code").that.equals(200);
				data.status.should.have.a.property("msg").that.equals("Success");
                done();
            })
        });
          it('should fail in product id validation', function (done) {
             
              var args = {
                  path : {pid : "57a7868d75433"},
                  headers: { "Content-Type": "application/json" , "x-access-token" : "x-access-token" }
              };
              
              client.delete("http://localhost:3000/deleteProduct/${pid}",function(data,response){
              
                should.not.exist(data.product);
                data.status.should.have.a.property("code").that.equals(2001);
				data.status.should.have.a.property("msg").that.equals("Invalid parameters provided. Have a look at additional details");
                done();
            })
        });
    });
});
