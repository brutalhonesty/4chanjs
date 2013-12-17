var request = require('request');

var baseUrl = "http://a.4cdn.org";
var api = {};

var requestOptions = {
	json:true, 
	headers: {
		'if-modified-since': (new Date()).toUTCString()
	}
};

api.boards = function(cb) {
	var uri = [baseUrl, "boards.json"].join("/");

	request(uri, requestOptions, function(err, res, body){
		if (err) return cb(err);
		cb(null, body.boards);
	});

	return api;
};

api.board = function(board) {
	var subapi = {};
	subapi._board = board;
	
	subapi.image = function(name, ext) {
		name = parseInt(name, 10);
		if(typeof(name) !== 'number' || isNaN(name)) {
			return null;
		} else if(typeof(ext) !== 'string') {
			return null;
		}
		var file = name + ext;
		return ["http://i.4cdn.org", board, "src", file].join("/");
	};
	subapi.imageCache = function(name, ext) {
		name = parseInt(name, 10);
		if(typeof(name) !== 'number' || isNaN(name)) {
			return null;
		} else if(typeof(ext) !== 'string') {
			return null;
		}
		var file = name + ext;
		return ["http://i.4chanlink.org", board, "src", file].join("/");
	};

	subapi.catalog = function(cb) {
		var uri = [baseUrl, board, "catalog.json"].join("/");

		request(uri, requestOptions, function(err, res, body){
			if (err) return cb(err);
			cb(null, body);
		});

		return api;
	};

	subapi.threads = function(cb) {
		var uri = [baseUrl, board, "threads.json"].join("/");

		request(uri, requestOptions, function(err, res, body){
			if (err) return cb(err);
			cb(null, body);
		});

		return api;
	};

	subapi.page = function(num, cb) {
		var uri = [baseUrl, board, num+".json"].join("/");

		request(uri, requestOptions, function(err, res, body){
			if (err) return cb(err);
			cb(null, body.threads);
		});

		return api;
	};

	subapi.thread = function(num, cb) {
		var uri = [baseUrl, board, "res", num+".json"].join("/");

		request(uri, requestOptions, function(err, res, body){
			if (err) return cb(err);
			cb(null, body.posts);
		});

		return api;
	};

	return subapi;
};

module.exports = api;