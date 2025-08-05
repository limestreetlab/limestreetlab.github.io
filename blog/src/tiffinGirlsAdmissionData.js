$(document).ready( () => {

Highcharts.chart('admissionData', {

    chart: {
        type: 'column'
    },

    credits: {
      enabled: false
    },

    title: {
        text: 'Past data',
        align: 'left'
    },

    xAxis: {
        categories: ['2022', '2023', '2024']
    },

    yAxis: {
        min: 0,
        max: 1600,
        tickInterval: 400,
        title: {
            text: 'Candidates'
        }
    },

     legend: {
        enabled: true
    },

    tooltip: {
        format: '<b>{key}</b><br/>{series.name}: {y}<br/>' +
            'Total: {point.stackTotal}'
    },

    plotOptions: {
        column: {
            stacking: 'normal'
        }
    },

    series: [{
        name: 'Stage 1: Outer',
        data: [1169, 1185, 1206],
        stack: 'Stage 1'
    }, {
        name: 'Stage 1: Inner',
        data: [245, 260, 279],
        stack: 'Stage 1'
    }, {
        name: 'Stage 2: Outer',
        data: [374, 375, 366],
        stack: 'Stage 2'
    }, {
        name: 'Stage 2: Inner',
        data: [86, 102, 99],
        stack: 'Stage 2'
    }]
});


});
