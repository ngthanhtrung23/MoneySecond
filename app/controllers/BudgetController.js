var mongoose = require('mongoose');

exports.insert = function(req, res){
	var Budget = mongoose.model('Budgets');
	var budget = new Budget();
	budget.save(function(err){
		if(err){
			console.log('Error when inserting new budget');
			res.send('Error');
		}
		else{
			console.log('New budget inserted');
			res.send("OK");
		}
	});
}

exports.getAll = function(req, res){
	var Budget = mongoose.model('Budgets');
	Budget.find({}, function(err, docs){
		res.json(docs);
	});
}