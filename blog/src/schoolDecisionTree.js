$(document).ready( () => {



Highcharts.chart('decisionTreeChart', {
    chart: {
      inverted: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: ''
    },
    series: [
        {          
            type: 'treegraph',
            marker: {
                symbol: "circle",
                radius: 30
                
            },
             dataLabels: {
                pointFormat: '{point.id}'
            },
            keys: ['id', 'parent', 'level'],
            data: [
                ['Decisions'],
                ['WUS &#10003;', 'Decisions'],
                ['WUS &#10007;', 'Decisions'],
                ['Westminster', 'WUS &#10003;', 5],
                ['KP &#10003;', 'WUS &#10007;'],
                ['KP &#10007;', 'WUS &#10007;'],
                ['Kensington', 'KP &#10003;', 5],
                ['WP &#10003; GP &#10003;', 'KP &#10007;'],
                ['WP &#10007; GP &#10003;', 'KP &#10007;'],
                ['WP &#10003; GP &#10007;', 'KP &#10007;'],
                ['WP &#10007; GP &#10007;', 'KP &#10007;'],
                ['Glendower', 'WP &#10003; GP &#10003;'],
                ['Glendower', 'WP &#10007; GP &#10003;'],
                ['Wimbledon', 'WP &#10003; GP &#10007;'],
                ["Ecole des Petits", 'WP &#10007; GP &#10007;']
                
            ]
        }
    ]
  });

});

