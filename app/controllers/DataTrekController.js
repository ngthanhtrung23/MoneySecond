var request = require('request');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

function dataTrekQuery(sql, callback) {
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
                callback(user_data['data']);
            }
        }
    );
}

exports.userData = function (req, res) {
    console.log("Retrieving user personal info");
    var user_email = "";
    dataTrekQuery("select PRIMARY_EMAIL_NAME, FIRST_NAME, LAST_NAME from WUSER where ACCOUNT_NUMBER = '1538099150765695489'",
        function (data) {
            user_email = data[1][0];
            res.json({
                email: user_email,
                first_name: data[1][1],
                last_name: data[1][2],
            });
        }
    );
}

exports.monthlyExpense = function (req, res) {
    console.log();
}
