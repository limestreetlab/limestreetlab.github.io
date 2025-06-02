$(document).ready( () => {

Highcharts.chart('timelineChart', {
    chart: {
      zooming: {
        type: 'x'
      },
      type: 'timeline',
      inverted: true
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      visible: false
    },
    yAxis: {
      gridLineWidth: 1,
      title: null,
      labels: {
        enabled: false
      }
    },
    legend: {
      enabled: false
    },
    title: {
      text: 'Base case timeline'
    },
    tooltip: {
      style: {
        width: 400
      }
    },
    series: [{
      dataLabels: {
        allowOverlap: false,
        style: {
            fontSize: 10
        },
        format: '<span style="color:{point.color}">● </span><span ' +
          'style="font-weight: bold;" > ' +
          '{point.x:%b %Y}</span><br/>{point.label}'
      },
      marker: {
        symbol: 'circle'
      },
      data: [{
        x: '2025-06',
        name: 'School change',
        label: 'School change',
        description: "Ending Stewart and starting Warwick Preschool until L'Ecole des Petits."
      }, {
        x: '2025-10',
        name: 'Ballot',
        label: 'Ballot',
        description: 'Bute House ballot is drawn.'
      }, {
        x: '2026-01',
        name: 'School start',
        label: "School start",
        description: "Starting petite section at L'Ecole des Petits from January 2026, but will repeat it from September 2026."
      }, {
        x: '2026-02',
        name: 'Assessment',
        label: 'Assessment',
        description: 'Wimbledon Common Prep assessment takes place 18 months prior to 2027 September reception entry.'
      }, {
        x: '2026-09',
        name: 'School start',
        label: "School start",
        description: "Starting petite section at L'Ecole des Petits."
      }, {
        x: '2026-10',
        name: 'Assessment',
        label: 'Assessment',
        description: 'Westminster Under assessment takes place on a rolling basis starting 12 months prior to 2027 September reception entry.'
      }, {
        x: '2027-01',
        name: 'Assessment',
        label: 'Assessment',
        description: 'Glendower and Kensington Prep assessments take place in the beginning of the entry year.'
      }, {
        x: '2027-09',
        name: 'School start',
        label: "Moyenne section at L'Ecole des Petits",
        description: "Starting moyenne section at L'Ecole des Petits."
      },{
        x: '2028-09',
        name: 'School start',
        label: "Grande section at L'Ecole des Petits",
        description: "Starting grande section at L'Ecole des Petits."
      },{
        x: '2029-09',
        name: 'School start',
        label: "Starting new English school",
        description: "After exit from L'Ecole des Petits, starting Year2 at an English school, such as Kings House/Kew College/Fulham Bilingual, until 11+."
      }]
    }]
  });

});