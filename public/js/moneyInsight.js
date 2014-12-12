$(document).ready(function () {
    "use strict";

    getMonthlyExpenseData(function(barData) {
        var myBarChart = new Chart($('#monthy-income-canvas').get(0).getContext("2d")).LineBar(barData, getBarOptions());
    });

    getSpendCategoryData(function(catData) {
        var myPieChart = new Chart($('#category-canvas').get(0).getContext('2d')).Pie(catData, getPieOptions());
        $('#pieLegend').html(myPieChart.generateLegend());
    });

    $.get(
        '/userData',
        {},
        function (data, status, xhr) {
            console.log(data);
            $('#account-last-name').text(data['first_name']);
        }
    );

    $.get(
        '/getBudget',
        {},
        function (data, status, xhr) {
            console.log(data);
            $('#result').text('You spent: $' + data['data']['amount_spent'] + '/$' + data['data']['budget']);
            if (data['data']['amount_spent'] > data['data']['budget']) {
                $('#result').removeClass('alert-warning').addClass('alert-danger');
            }
            else {
                $('#result').removeClass('alert-danger').addClass('alert-warning');
            }
        }
    );
});

function getSpendCategoryData(callback) {
    $.post(
        '/spendCategory',
        {},
        function (data, status, xhr) {
            callback(data);
        }
    );
}

function getMonthlyExpenseData(callback) {
    $.post(
        '/monthlyExpense',
        {},
        function (data, status, xhr) {
            var i, delta = [];
            for(i = 0; i < 12; i += 1) {
                if (i == 0) delta.push(20);
                else delta.push(data['expense'][i] - data['expense'][i-1]);
            }
            callback({
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                        label: "Monthly Income",
                        type: "bar",
                        fillColor: "#337ab7",
                        strokeColor: "#337ab7",
                        highlightFill: "#619ED4",
                        highlightStroke: "#619ED4",
                        data: data['expense']
                    },
                    {
                        label: "Monthly Income",
                        type: "line",
                        fillColor: "#337ab7",
                        strokeColor: "#337ab7",
                        highlightFill: "#619ED4",
                        highlightStroke: "#619ED4",
                        data: delta
                    },
                ]
            });
        }
    );
}

function getBarOptions() {
    return {
        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero : true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke : true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth : 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing : 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing : 1,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };
}

function getPieOptions() {
    return {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,

        //String - The colour of each segment stroke
        segmentStrokeColor : "#fff",

        //Number - The width of each segment stroke
        segmentStrokeWidth : 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout : 50, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps : 100,

        //String - Animation easing effect
        animationEasing : "easeOutBounce",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : false,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><div class=\"box\" style=\"background-color:<%=segments[i].fillColor%>\"/><%if(segments[i].label){%><div class=\"text\"><%=segments[i].label%></div><%}%></li><%}%></ul>"
    };
}