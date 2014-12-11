var mongoose = require('mongoose');
var DataTrekController = require('./DataTrekController.js');
var account_number = '2066400437456043270';
var async = require('async');
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
	// var account_number = reqBody.account_number;
	// console.log(account_number);
	var newBudget = reqBody.budget;
	// var email = reqBody.email;
	var Budget = mongoose.model('Budgets');
	async.series([function(callback){
		getAmountSpentCurrentMonth(callback);
	}], function(err, results){
		console.log(results);
		var budget = new Budget({account_number: account_number, budget:newBudget, amount_spent: results[0]});
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
	// var account_number = req.params.id;
	console.log("account_number = " + account_number);
	Budget.findOne({'account_number': account_number}, function(err, budget){
		if(err){
			console.log("ERROR FETCHING BUDGET!");
			callbacks[1](err);
		} else {
            if (budget == null) {
                var Budget = mongoose.model('Budgets');
                async.series([function(callback){
                    getAmountSpentCurrentMonth(callback);
                }], function(err, results){
                    console.log(results);
                    var budget = new Budget({account_number: account_number, budget:50000, amount_spent: results[0]});
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
                });
            }
            else{ 
            	refreshAmountSpent(budget, callbacks[0]);
            }
        }
	});
}

exports.updateBudget = function(req, res){
	var callbacks = renderJsonCallback(res);
	var reqBody = req.body;
	// var account_number = reqBody.account_number;
	var budget = reqBody.budget;
	var Budget = mongoose.model('Budgets');
    console.log("Updating, new value = " + budget);
	Budget.update({account_number: account_number}, {budget: budget}, {multi: true}, function(err, numberAffected, raw){
		if(err){
			callbacks[1](err);
		}else{
			console.log('Successfully update '+numberAffected+' documents');
			callbacks[0]({'numOfRecordUpdated' : numberAffected});
		}
	})
}
function refreshAmountSpent(budget, callback){
	async.series([function(callback){
		updateAmountSpent(callback);
	}], function(err, results){
		var amount_spent = results[0];
		budget.amount_spent = amount_spent;
		callback(budget);
	});
}
function updateAmountSpent(callback){
	var Budget = mongoose.model('Budgets');
	async.series([function(callback){
		getAmountSpentCurrentMonth(callback);
	}], function(err, results){
		var amount_spent = results[0];
		Budget.update({account_number: account_number}, {amount_spent:amount_spent}, {multi:true}, function(err, numberAffected, raw){
			if(err){
				callback(err);
			}else{
				console.log('Successfully updated amount spent for ' + numberAffected + ' documents');
				callback(null, amount_spent);
			}
	});
	});
	
}

function getAmountSpentCurrentMonth(callback){
	var dates = [
        1388534400, // 1
        1391212800, // 2
        1393632000, // 3
        1396310400, // 4
        1398902400, // 5
        1401580800, // 6
        1404172800, // 7
        1406851200, // 8
        1409529600, // 9
        1412121600, // 10
        1414800000, // 11
        1417392000, // 12
        1420070400, // 1 - 2015
        ];
    var sql1 = "select sum(amount) from  wtransaction where account_number = " +account_number+" and amount<0 and time_created >= 1417392000 and time_created < 1420070400";
    var sql2 = "select sum(amount) from  wtransaction_p2 where account_number = " +account_number+" and amount<0 and time_created >= 1417392000 and time_created < 1420070400";
    var sql3 = "select sum(amount) from wcctrans where currency_code = 'AUD' and account_number = "+account_number+" and time_created >= 1417392000 and time_created < 1420070400";
    async.parallel({
    	transaction1: function(callback){
    		DataTrekController.dataTrekQuery(sql1, 'MONEY', callback, false);
    	},
    	transaction2: function(callback){
    		DataTrekController.dataTrekQuery(sql2, 'MONEY', callback, false);
    	},
    	transaction3: function(callback){
    		DataTrekController.dataTrekQuery(sql3, 'MONEY', callback, false);
    	}
    }, function(err, results){
    	if(err){
    		res.json('ERROR');
    		console.log("Error when trying to query transaction");
    	}else{
    		var transaction1 = results.transaction1[1][0];
    		var transaction2 = results.transaction2[1][0];
    		var transaction3 = results.transaction3[1][0];
    		console.log('Transaction 1: '+ transaction1);
    		console.log('Transaction 2: '+ transaction2);
    		console.log('Transaction 3: ' + transaction3);
    		var totalSpentThisMonth = transaction3 - transaction2 - transaction1;
    		callback(null, totalSpentThisMonth);
    	}      	
    });
}