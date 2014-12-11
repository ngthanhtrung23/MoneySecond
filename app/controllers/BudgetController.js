var mongoose = require('mongoose');

function renderJsonCallback (res){
	return[function(data){
		res.json({'status':'success', 'data':data});
	},
	function(err){
		var data = {'status': 'failed'};
		if(err)
			data['errMsg'] = err;
		res.json(data);
	}
	];
}
exports.insert = function(req, res){
	var callbacks = renderJsonCallback(res);
	var reqBody = req.body;
	var account_number = reqBody.account_number;
	console.log(account_number);
	var budget = reqBody.budget;
	var email = reqBody.email;
	var Budget = mongoose.model('Budgets');
	var budget = new Budget({account_number: account_number, budget:budget, email: email});
	budget.save(function(err){
		if(err){
			console.log('Error when inserting new budget');
			callbacks[1](err);
		}
		else{
			console.log('New budget inserted');
			callbacks[0](budget);
		}
	});
}

exports.getAllBudgets = function(req, res){
	var Budget = mongoose.model('Budgets');
	Budget.find({}, function(err, docs){
		res.json(docs);
	});
}

exports.getBudgetByAccountNumber = function(req, res){
	var callbacks = renderJsonCallback(res);
	var Budget = mongoose.model('Budgets');
	var account_number = req.params.id;
	console.log(account_number);
	Budget.findOne({'account_number': account_number}, function(err, budget){
		if(err){
			console.log("ERROR FETCHING BUDGET!");
			callbacks[1](err);
		}else 
			callbacks[0](budget);
	});
}

exports.updateBudget = function(req, res){
	var callbacks = renderJsonCallback(res);
	var reqBody = req.body;
	var account_number = reqBody.account_number;
	var budget = reqBody.budget;
	var Budget = mongoose.model('Budgets');
	Budget.update({account_number: account_number}, {budget: budget}, {multi: true}, function(err, numberAffected, raw){
		if(err){
			callbacks[1](err);
		}else{
			console.log('Successfully update '+numberAffected+' documents');
			callbacks[0]({'numOfRecordUpdated' : numberAffected});
		}
	})
}
exports.updateAmountSpent = function(req, res){
	var callbacks = renderJsonCallback(res);
	var reqBody = req.body;
	var account_number = reqBody.account_number;
	var amount_spent = reqBody.amount_spent;
	var Budget = mongoose.model('Budgets');
	Budget.update({account_number: account_number}, {amount_spent:amount_spent}, {multi:false}, function(err, numberAffected, raw){
		if(err){
			callbacks[1](err);
		}else{
			console.log('Successfully updated amount spent for ' + numberAffected + ' documents');
			callbacks[0]({'numOfRecordUpdated': numberAffected});
		}
	});
}