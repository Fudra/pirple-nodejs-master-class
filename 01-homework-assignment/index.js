/**
 *  Primary file for the API
 *
 */

// Dependencies
const fs = require('fs');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const http = require('http');
const https = require('https');

const config = require('./config');
const router = require('./router');

// Instantiate the HTTP server
const httpServer = http.createServer((request, response) => {
	unifiedServer(request, response);
});

// Start the HTTP server
httpServer.listen(config.port.http, () => {
	console.log(`The server is listening on port ${config.port.http}`);
});

// Instantiate the HTTP server
const httpsServerOptions = {
	'key': fs.readFileSync('./https/key.pem'),
	'cert': fs.readFileSync('./https/cert.pem'),
};

const httpsServer = https.createServer(httpsServerOptions, (request, response) => {
	unifiedServer(request, response);
});

// Start the HTTPS server
httpsServer.listen(config.port.https, () => {
	console.log(`The server is listening on port ${config.port.https}`);
});

// All the server logic
const unifiedServer = (request, response) => {
	// Get the URL and parse it
	const parsedUrl = url.parse(request.url, true);

	// Get the path from the URL
	const path = parsedUrl.pathname;
	const trimmedPath = path.replace(/^\/+|\/+$/g, '');

	// Get the query string as an object
	const queryStringObject = parsedUrl.query;

	// Get the HTTP Method
	const method = request.method.toLowerCase();

	// Get the headers as an object
	const headers = request.headers;

	// Get the payload, if any
	const decoder = new StringDecoder('utf-8');
	let payload = '';

	request.on('data', (data) => payload += decoder.write(data));
	request.on('end', () => {
		payload += decoder.end();

		// choose the handler, the request should go to. If there is no handler found use the notFound handler
		const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : router['404'];

		// construct the data object to send to the handler
		const data = {
			trimmedPath,
			queryStringObject,
			method,
			headers,
			payload,
		};

		// Route the request to the handler specified in the router
		chosenHandler(data, (statusCode, payload) => {

			// Use the status code called back by the handler, or default to 200
			statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

			// Use the payload called back by the handler, or default to object
			payload = typeof(payload) === 'object' ? payload : {};

			//  convert the payload to a string
			const payloadString = JSON.stringify(payload);

			// Return the response
			response.setHeader('Content-Type', 'application/json');
			response.writeHead(statusCode);
			response.end(payloadString);

			// log the resource the user requested
			console.log('Returning the response:', statusCode, payloadString);
		});
	})
};
