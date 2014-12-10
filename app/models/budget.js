var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){
	var Budgets = new Schema({
		name: {type: String, default: "Anonymous"},
		email: {type: String, default: 'Anonymous@gmail.com'} 
	}, {versionKey:false});
	mongoose.model('Budgets', Budgets);
};