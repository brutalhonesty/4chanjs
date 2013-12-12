var chan = require('../index.js');
var random = chan.board('b');
random.catalog(function(err, pages){
    if(err) {
    	console.log(err);
    	return;
    }
    console.log(pages);
});