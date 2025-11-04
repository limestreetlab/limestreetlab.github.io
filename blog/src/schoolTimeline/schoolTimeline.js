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
      text: ''
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
        description: "Starting at Little Fingers."
      }, {
        x: '2025-10',
        name: 'School change',
        label: 'School start',
        description: 'Switch to Melrose House.'
      }, {
        x: '2026-01',
        name: 'School start',
        label: "School start",
        description: "Starting at L'Ecole des Petits."
      }, {
        x: '2026-01',
        name: 'Assessment',
        label: 'Assessment',
        description: 'Wimbledon Prep assessment on 6 Jan.'
      }, {
        x: '2026-05',
        name: 'Waiting list',
        label: 'Waiting list',
        description: 'Bute\'s waitlist should start moving (ranked 1-6 on the list of 12).'
      }, {
        x: '2026-09',
        name: 'Assessment',
        label: "Assessment",
        description: "Newton Prep, as a practice."
      }, {
        x: '2026-12',
        name: 'Assessment',
        label: 'Assessment',
        description: 'Westminster Under assessment takes place on a rolling basis from October.'
      }, {
        x: '2027-01',
        name: 'Assessment',
        label: 'Assessment',
        description: 'Glendower assessment takse place around January.'
      }, {
        x: '2027-02',
        name: 'Assessment',
        label: 'Assessment',
        description: 'Ken Prep assessment takse place around January/February.'
      }, {
        x: '2027-09',
        name: 'School start',
        label: "School start",
        description: "New school year at either an English school or L'Ecole des Petits."
      }]
    }]
  });

});