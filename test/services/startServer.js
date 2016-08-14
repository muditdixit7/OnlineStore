//run mocha test/services/*.js to initiate the service tests
before(function(done) {
	var pr = require('../../server.js').startServer();
	pr.then(function() {
        console.log("done");
		done();
	},function(){
        console.log("not done");
		done();
    });
});