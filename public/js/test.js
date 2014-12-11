$(document).ready(function () {
    "use strict";

    // To create a chart, we need to instantiate the Chart class
    var lineChartCtx = $("#myLineChart").get(0).getContext("2d");

    // With the Chart class set up, we can go on to create one of the charts Chart.js has available
    // e.g. Line Chart
    var data, options;

    data = getLineData();
    // These options will be merged with global options
    // Global options: Chart.defaults.global
    options = getLineOptions();
    var myLineChart = new Chart(lineChartCtx).Line(data, options);

    // Now a bar chart!
    var barChartCtx = $("#myBarChart").get(0).getContext("2d");

    data = getBarData();
    options = getBarOptions();
    var myBarChart = new Chart(barChartCtx).Bar(data, options);

    // Next, draw a pie chart
    var pieChartCtx = $("#myPieChart").get(0).getContext("2d");
    data = getPieData();
    options = getPieOptions();
    var myPieChart = new Chart(pieChartCtx).Pie(data, options);

    // Finally, draw a line bar chart
    var line = document.getElementById("line").getContext("2d");
    var bar = document.getElementById("bar").getContext("2d");
    var lineBar = document.getElementById("line-bar").getContext("2d");
    var multiLineBar = document.getElementById("multi-line-bar").getContext("2d");
    data = getLineBarData(0);
    myLineChart = new Chart(line).Line(data);
    myBarChart = new Chart(bar).Bar(data);
    var myLineBarChart = new Chart(lineBar).LineBar(data);
    var myMultiLineBarChart = new Chart(multiLineBar).LineBar(getLineBarData(1));
});

function getLineData() {
    return {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
}

function getLineOptions() {
    return {

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether the line is curved between points
        bezierCurve : true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.0,

        //Boolean - Whether to show a dot for each point
        pointDot : true,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };
}

function getBarData() {
    return {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
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

function getPieData() {
    return [
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
    ];
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
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };
}

function getLineBarData(turn) {
    if (turn === 0) {
        return {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "My First dataset",
                //new option, barline will default to bar as that what is used to create the scale
                type: "line",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 4, 81, 56, 55, 40]
            }, {
                label: "My First dataset",
                //new option, barline will default to bar as that what is used to create the scale
                type: "bar",
                fillColor: "rgba(220,20,220,0.2)",
                strokeColor: "rgba(220,20,220,1)",
                pointColor: "rgba(220,20,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [32, 25, 33, 88, 12, 92, 33]
            }]
        };
    }
    else {
        return {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "My First dataset",
                //new option, barline will default to bar as that what is used to create the scale
                type: "line",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 4, 81, 56, 55, 40]
            }, {
                label: "My First dataset",
                //new option, barline will default to bar as that what is used to create the scale
                type: "bar",
                fillColor: "rgba(220,20,220,0.2)",
                strokeColor: "rgba(220,20,220,1)",
                pointColor: "rgba(220,20,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [32, 25, 33, 88, 12, 92, 33]
            }, {
                label: "My First dataset",
                //new option, barline will default to bar as that what is used to create the scale
                type: "line",
                fillColor: "rgba(20,20,220,0.2)",
                strokeColor: "rgba(20,20,220,1)",
                pointColor: "rgba(20,20,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [32, 25, 33, 88, 12, 92, 33]
            },{
                label: "My First dataset",
                //new option, barline will default to bar as that what is used to create the scale
                type: "bar",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 4, 81, 56, 55, 40]
            }]
        };
    }
}
