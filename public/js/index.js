function dataTrekCall(query, database, stage) {
    $.post(
        'https://io/DataTrek/trek/',
        {
            system: stage,
            schema: database,
            sql: query,
            unique_id: 'B4EB0D765BF24ACE0F40CF0C5F1BDB2E_1401357587612',
        },
        function (data, status, xhr) {
            console.log('data = ' + data);
            console.log('status = ' + status);
        },
        'json'
    );
}

$(document).ready(function () {
    console.log("Call data trek...");
    dataTrekCall(
        "select PRIMARY_EMAIL_NAME from WUSER where ACCOUNT_NUMBER = '1538099150765695489'",
        'CLOC',
        'stage2dev348'
    );
});
