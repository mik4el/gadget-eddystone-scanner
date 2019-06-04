var EddystoneBeaconScanner = require('eddystone-beacon-scanner')
var request = require('request');
const assert = require('assert');

EddystoneBeaconScanner.on('found', function(beacon) {
  console.log('found Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));
  postBeaconToWebService(beacon);
});

EddystoneBeaconScanner.on('updated', function(beacon) {
  console.log('updated Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));
  postBeaconToWebService(beacon);
});

EddystoneBeaconScanner.on('lost', function(beacon) {
  console.log('lost Eddystone beacon:\n', JSON.stringify(beacon, null, 2));
});

var token = null;
var last_token_sent_at = 0;

setTimeout(function () {
	console.log('Kill after 60s...'); 
	process.exit(1);
}, 60*1000); 

function postBeaconToWebService(beacon) {
	if (token === null) {
		console.log("No token...");
		return
	} 
	var now = new Date();
	if (now.getTime() - last_token_sent_at > 1000) {
		var then = new Date();
		gadget_slug = "eddystone-scanner";
	    post_url = process.env.GADGET_DATA_POSTER_URL + '/backend/api/v1/gadgets/' + gadget_slug + '/data/';
	    payload = {
	        'data': beacon,
	        'timestamp': then.toISOString()
	    };
	    var options = {
			url: post_url,
			method: "POST",
	    	json: payload,
	    	headers: { 'Authorization': 'Bearer ' + token }
		};
		request(options, postBeaconToWebServiceCallback);	
		last_token_sent_at = then.getTime();
	}
	
}

function postBeaconToWebServiceCallback(error, response, body) {
	if (!error && response.statusCode == 201) {
		console.log("Beacon posted...");
	} else {
		console.log("Could not post beacon...", body);	
		process.exit(1);
	}	
}

function getWebServiceToken() {
	console.log("Getting token...")
	var options = {
		url: process.env.GADGET_DATA_POSTER_URL + '/backend/api-token-auth/',
		method: "POST",
    	json: { 'username': process.env.GADGET_DATA_POSTER_USERNAME, 'password': process.env.GADGET_DATA_POSTER_PASSWORD }
	};
	request(options, getWebServiceTokenCallback);
}

function getWebServiceTokenCallback(error, response, body) {
	if (!error && response.statusCode == 200) {
		token = body.token;
		EddystoneBeaconScanner.startScanning(true);
		console.log("Started scanning...");	
	} else {
		console.log("Could not get token...", body);
		process.exit(1);
	}
}

assert(process.env.GADGET_DATA_POSTER_URL);
assert(process.env.GADGET_DATA_POSTER_USERNAME);
assert(process.env.GADGET_DATA_POSTER_PASSWORD);

getWebServiceToken();
