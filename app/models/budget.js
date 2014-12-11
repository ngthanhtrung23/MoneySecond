var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){
	var Budgets = new Schema({
		account_number: {type: String, default: null},
		budget: {type: Number, default: 0},
		amount_spent: {type: Number, default: 0},
		email: {type: String, default: 'Anonymous@gmail.com'}
	}, {versionKey:false});
	mongoose.model('Budgets', Budgets);
};