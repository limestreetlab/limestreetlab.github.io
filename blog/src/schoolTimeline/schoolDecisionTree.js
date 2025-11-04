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
            tooltip: {
                pointFormat: '{point.name}'
            },
            keys: ['name', 'id', 'parent', 'level'],
            data: [
                ['School decisions', '4+ results'],
                ['Offer from Bute', 'Bute &#10003;', '4+ results'],
                ['No offer from Bute', 'Bute &#10007;', '4+ results'],
                ['Bute House', 'Bute House', 'Bute &#10003;', 6],
                ['Offer from Westminster', 'WUS &#10003;', 'Bute &#10007;'],
                ['No offer from Westminster', 'WUS &#10007;', 'Bute &#10007;'],
                ['Westminster Under School', 'Westminster', 'WUS &#10003;', 6],
                ['Offer from Ken Prep', 'KP &#10003;', 'WUS &#10007;'],
                ['No offer from Ken Prep', 'KP &#10007;', 'WUS &#10007;'],
                ['Kensington Prep', 'Kensington', 'KP &#10003;', 6],
                ['Offer from Glendower', 'GP &#10003;', 'KP &#10007;'],
                ['No offer from Glendower', 'GP &#10007;', 'KP &#10007;'],
                ['Glendower Prep', 'Glendower', 'GP &#10003;', 6],
                ['Stay at Ecole des Petits', "Ecole des Petits", 'GP &#10007;']
                
            ]
        }
    ]
  });

});

