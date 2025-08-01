$(document).ready( () => {

Highcharts.chart('timelineChart', {
    chart: {
      type: 'timeline',
      inverted: false
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
      text: 'Assessment Dates and Decisions'
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
        x: '2025-09',
        name: 'School start',
        label: 'School start',
        description: "Starting at Putney Little Fingers."
      }, {
        x: '2025-10',
        name: 'Ballot',
        label: 'Ballot',
        description: 'Bute House ballot drawn.'
      }, {
        x: '2026-01',
        name: 'School start',
        label: "School start",
        description: "Starting petite section at L'Ecole des Petits from January 2026."
      }, {
        x: '2026-02',
        name: 'Assessment',
        label: 'Assessment',
        description: 'Wimbledon Common Prep assessment takes place 18 months prior to entry.'
      }, {
        x: '2026-09',
        name: 'Assessment',
        label: "Assessment",
        description: "Newton Prep, as a practice."
      }, {
        x: '2026-10',
        name: 'Assessment',
        label: 'Assessment',
        description: 'Westminster Under assessment takes place on a rolling basis starting 12 months prior to entry.'
      }, {
        x: '2027-01',
        name: 'Assessment',
        label: 'Assessment',
        description: 'Glendower and Kensington Prep assessments take place in the beginning of the entry year.'
      }, {
        x: '2027-09',
        name: 'School start',
        label: "School start",
        description: "New school year at either new English school or L'Ecole des Petits."
      }]
    }]
  });

});