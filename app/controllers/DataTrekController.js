var request = require('request');
var account_number = '2066400437456043270';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var cache = [];
exports.dataTrekQuery = function (sql, schema, callback, cacheable) {
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
                user_data = JSON.parse(body);
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
        var expenses = [], i;

        for(i = 0; i < 12; ++i) {
            expenses.push(0);
        }
        var counter = 0;

        for(i = 0; i < 12; ++i) {
            var sql = 'select sum(amount) from  wtransaction '
            + ' where account_number = ' + account_number
            + ' and amount<0'
            + ' and time_created >= ' + dates[i]
            + ' and time_created < ' + dates[i+1];
            console.log("sql = " + sql);
            dataTrekQuery(sql, 'MONEY', function (data) {
                console.log("data = " + data);
                counter += 1;
                if (counter == 12) {
                    res.json({
                        expense: expenses,
                    });
                }
            });
        }
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
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Red"
        },
        {
            value: 50,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Green"
        },
        {
            value: 100,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Yellow"
        }
        ]);
    }

    exports.incomeCategory = function (req, res) {
        res.json([
        {
            value: 300,
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Red"
        },
        {
            value: 50,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Green"
        },
        {
            value: 100,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Yellow"
        }
        ]);
    }
