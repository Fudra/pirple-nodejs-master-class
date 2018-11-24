/**
 * Create and export configuration variables
 *
 */

// Container for all the environments
const environments = {};

// Staging (default) environments
environments.staging = {
	port: {
		http: 3000,
		https: 3001,
	},
	env_name: 'stating',
};

// Production environments
environments.production = {
	port: {
		http: 5000,
		https: 5001,
	},
	env_name: 'production',
};

// Determinate which environment was passed as a command-line argument
const currentEviroment = typeof(process.env.NODE_ENV) === 'string'
	? process.env.NODE_ENV.toLowerCase()
	: '';

// Check that the current environment is one of the environment above, if not, default to staging
const enviromentToExport = typeof(environments[currentEviroment]) === 'object'
	? environments[currentEviroment]
	: environments.staging;


// Export the module
module.exports = enviromentToExport;