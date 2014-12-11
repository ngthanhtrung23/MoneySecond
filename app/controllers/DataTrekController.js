var request = require('request');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var cache = [];
function dataTrekQuery(sql, callback, cacheable) {
    if(cacheable){
        if (cache.hasOwnProperty(sql)) {
            console.log('this request is cached!');
            var user_data = cache[sql];
            callback(user_data);
            return;
        }
    }
    request.post(
        'https://io/DataTrek/trek/',
        {form: {
            system: 'stage2dev348',
            schema: 'CLOC',
            sql: sql,
            unique_id: 'B4EB0D765BF24ACE0F40CF0C5F1BDB2E_1401357587612',
        }},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                user_data = JSON.parse(body);
                if(cacheable){
                    cache[sql] = user_data['data'];
                }
                callback(user_data['data']);
            }
        }
    );
}

exports.userData = function (req, res) {
    console.log("Retrieving user personal info");
    var reqBody = req.body;
    var account_number = reqBody.account_number;
    var sql = "select PRIMARY_EMAIL_NAME, FIRST_NAME, LAST_NAME from WUSER where ACCOUNT_NUMBER = '" + account_number+ "'";
    dataTrekQuery(sql,
        function (data) {
            res.json({
                email:data[1][0],
                first_name: data[1][1],
                last_name: data[1][2],
            });
        }, true);
}

exports.monthlyExpense = function (req, res) {
    console.log();
}
