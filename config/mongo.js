var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/budget';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function(){
	console.log('Connected to database');
});
mongoose.connection.on('error', function(err){
	console.log('Database connection error: '+ err);
});
mongoose.connection.on('disconnected', function(){
	console.log('Database connection disconnected');
});
process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log('Database connection disconnected due to app termination');
		process.exit(0);
	});
});

require('../app/models/budget')();
