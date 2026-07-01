$(document).ready( () => {

Highcharts.chart('grammarSchoolsComparisonChart', {
    chart: {
        type: 'line'
    },
    credits: {
        enabled: false
    }, 
    title: {
        text: 'Oxbridge offers'
    },
    xAxis: {
        categories: [
            '2019', '2020', '2021', '2022', '2023', '2024', '2025'
        ]
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: true
        }
    },
    series: [{
        name: 'Tiffin Girls',
        data: [
            34, 30, 19, 25, 21, 19, 19
        ]
    }, {
        name: 'Pates',
        data: [
            27, 34, 26, 18, 28, 42, 32
        ]
    }, {
        name: 'Colyton',
        data: [
            9, 13, 10, 16, 20, 19, 34
        ]
    }, {
        name: 'Henrietta Barnett',
        data: [
            33, 36, 30, 29, 34, 31, 34
        ]
    }, {
        name: 'Nonsuch',
        data: [
            16, 13, 10, 11, 11, 15, 13
        ]
    }
    ]
});

});
