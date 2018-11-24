/**
 * Define all the given routes in this application
 *
 */


// Define the handlers
const handlers = {};

// Ping handler for application testing
handlers.ping = (data, callback) => {
	callback(200)
};

// Hello World Handler
handlers.hello = (data, callback) => {
	callback(200, {
				 data: {
					 message: 'Hello World!',
				 }
			 }
	)
};

// Not found handler
handlers.notFound = (data, callback) => {
	callback(404, {
				 data: {
					 message: 'Route not found',
				 }
			 }
	);
};

// all available routes
const router = {
	'ping' : handlers.ping,
	'hello' : handlers.hello,
	'404': handlers.notFound,
};

module.exports = router;
