const config = require('environmentconfig')({
	dir: __dirname,
	file: 'config.test.cson',
	environment: 'test',
	environments: [
		'test'
	]
});

module.exports = config