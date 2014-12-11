var request = require('request');
var account_number = '2066400437456043270';
var async = require('async');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var cache = [];
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
function dataTrekQuery(sql, schema, callback, cacheable) {
    if(cacheable){
        if (cache.hasOwnProperty(sql)) {
            console.log('this request is cached!');
            var user_data = cache[sql];
            callback(null, user_data);
            return;
        }
    }
    request.post(
        'https://io/DataTrek/trek/',
        {form: {
            system: 'stage2dev104',
            schema: schema,
            sql: sql,
            unique_id: 'B4EB0D765BF24ACE0F40CF0C5F1BDB2E_1401357587612',
        }},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var user_data = JSON.parse(body);
                if(cacheable){
                    cache[sql] = user_data['data'];
                }
                callback(null, user_data['data']);
            }else{
                callback(error);
            }
        }
    );
}

exports.userData = function (req, res) {
    console.log("Retrieving user personal info");
    var sql = "select PRIMARY_EMAIL_NAME, FIRST_NAME, LAST_NAME from WUSER where ACCOUNT_NUMBER = '" + account_number+ "'";
    dataTrekQuery(sql, 'CLOC',
        function (err, data) {
            if(err){
                res.json("Error!");
                console.log('Error when retreiving user data!');
            }else{
                console.log(data);
                res.json({
                    email:data[1][0],
                    first_name: data[1][1],
                    last_name: data[1][2],
                });
            }
        }, true);
}

exports.monthlyExpense = function (req, res) {
    console.log("Retrieving user monthly expense");
    expenses = [];
    var functions = [];
    for(var i = 0; i < 12; i++) {
        expenses.push(0);
        var func = makeCallbackFunction(i);
        functions.push(func);
    }
    async.parallel(functions, function(err,results){
        res.json({expense: expenses});
        console.log('ok');
    });
}
function makeCallbackFunction(month){
    return function(callback){
        getExpenseByMonth(month, callback);
    }
}
function getExpenseByMonth(month, callback){
    console.log(month);
    var sql1 = "select sum(amount) from  wtransaction where account_number = " +account_number+" and amount<0 and time_created >=" + dates[month]+ " and time_created < " + dates[month+1];
    var sql2 = "select sum(amount) from  wtransaction_p2 where account_number = " +account_number+" and amount<0 and time_created >=" + dates[month]+ " and time_created < " + dates[month+1];
    var sql3 = "select sum(amount) from wcctrans where currency_code = 'AUD' and account_number = "+account_number+" and time_created >=" + dates[month] + "and time_created < " + dates[month+1];
    var cacheable = true;
    if(month == 11)
        cacheable = false;
    async.parallel({
        transaction1: function(callback){
            dataTrekQuery(sql1, 'MONEY', callback, cacheable);
        },
        transaction2: function(callback){
            dataTrekQuery(sql2, 'MONEY', callback, cacheable);
        },
        transaction3: function(callback){
            dataTrekQuery(sql3, 'MONEY', callback, cacheable);
        }
    }, function(err, results){
        if(err){
            console.log("Error when trying to query transaction");
            callback(err);
        }else{
            console.log(results);
            var transaction1;
            var transaction2;
            var transaction3; 
            if(results.transaction1 == undefined)
                transaction1 = 0;
            else
                transaction1 = results.transaction1[1][0];
            if(results.transaction2 == undefined)
                transaction2 = 0;
            else
                transaction2 = results.transaction2[1][0];
            if(results.transaction3 == undefined)
                transaction3 = 0;
            else
                transaction3 = results.transaction3[1][0];
            console.log('Transaction 1: '+ transaction1);
            console.log('Transaction 2: '+ transaction2);
            console.log('Transaction 3: ' + transaction3);
            var totalSpentThisMonth = transaction3 - transaction2 - transaction1;
            console.log("Total spent month "+month + " :" + totalSpentThisMonth); 
            expenses[month] = totalSpentThisMonth;
            callback(null, totalSpentThisMonth);
        }       
    });
}
exports.monthlyIncome = function (req, res) {
    console.log("Retrieving user monthly income");
    res.json({
        income: [20, 50, 30, 70,
        66, 39, 47, 12,
        99, 77, 38, 11],
    });
}

exports.spendCategory = function (req, res) {
    console.log("Retrieving spend category data");
    res.json([
    {
        value: 300,
        color:"#7dac9f",
        highlight: "#8FB9AD",
        label: "Food"
    },
    {
        value: 50,
        color: "#dc7062",
        highlight: "#EA8477",
        label: "Clothes"
    },
    {
        value: 100,
        color: "#66a8d4",
        highlight: "#78B6E0",
        label: "Transport"
    },
    {
        value: 77,
        color: '#e5b060',
        highlight: '#F8C880',
        label: 'Others'
    }
    ]);
}

exports.incomeCategory = function (req, res) {
    console.log("Retrieving income category");
    var sql1 = "select sum(amount) from  wtransaction where account_number = " +account_number+" and amount<0";
    var sql2 = "select sum(amount) from  wtransaction_p2 where account_number = " +account_number+" and amount<0";
    var sql3 = "select sum(amount) from wcctrans where currency_code = 'AUD' and account_number = "+account_number;
    console.log("sql = " + sql1);
    async.parallel({
        transaction1: function(callback){
            dataTrekQuery(sql1, 'MONEY', callback, true);
        },
        transaction2: function(callback){
            dataTrekQuery(sql2, 'MONEY', callback, true);
        },
        transaction3: function(callback){
            dataTrekQuery(sql3, 'MONEY', callback, true);
        }
    }, function(err, results){
        console.log("err = " + err);
        console.log("results = " + results);
        if(err){
        }else{
            var transaction1 = results.transaction1[1][0];
            var transaction2 = results.transaction2[1][0];
            var transaction3 = results.transaction3[1][0];
            console.log('Transaction 1: '+ transaction1);
            console.log('Transaction 2: '+ transaction2);
            console.log('Transaction 3: ' + transaction3);
            res.json([
            {
                value: -parseInt(transaction1, 10),
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Bank"
            },
            {
                value: -parseInt(transaction2, 10),
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Balance"
            },
            {
                value: parseInt(transaction3, 10),
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Card"
            }
            ]);
        }
    });
}
exports.dataTrekQuery = dataTrekQuery;
