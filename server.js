/* Get reference to main module defined in app.js */
var app = require('./app');

/* Set port */
var port = process.env.PORT || 3000;

/* Start server to listen on set port */
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + port);
});
