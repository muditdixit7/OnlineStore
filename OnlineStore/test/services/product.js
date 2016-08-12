var chai = require('chai');
var Client = require('node-rest-client').Client;
var should = chai.should();

var client = new Client();


describe('Product service', function () {
    describe('Get products', function () {
        it('should fetch a list of products', function (done) {
            client.get("http://localhost:3000/getProducts",function(data,response){
                console.log(data);
                done();
            })
        });
    });
});
