//INPUT parameters, paths to data files to be plotted
const propertyDataFile= "../data/housing_data.json"; 

//wrap things in document.ready
$(document).ready( () => {
  
  compare($("#group-select").val());

  $("#group-select").change( () => {
    $('#percentage-start-btn').text('Start').off(); //reset the button text and evt handler
    let group = $("#group-select").val();
    compare(group);
  }) 
  
  display($("#city-select").val());

  $("#city-select").change( () => {
    $('#price-start-btn').text('Start').off(); //reset the button text and evt handler
    let city = $("#city-select").val();
    display(city);
  }) 

});//end of document.ready wrapper

//lists of areas applied to each series (national, london, commuters). note the city name used here must exactly match the city name in the aggregated data file
const nationalCities = ["birmingham", "bristol", "cambridge", "cardiff", "edinburgh", "glasgow", "inner london", "leeds", "liverpool", "manchester", "newcastle", "nottingham", "outer london", "oxford", "sheffield", "york"]; //names of cities to include
const londonCouncils = ["barnet", "brent", "camden", "croydon", "ealing", "greenwich", "hackney", "hammersmith and fulham", "islington", "kensington and chelsea", "kingston upon thames", "lambeth", "richmond upon thames", "southwark", "sutton", "tower hamlets", "wandsworth", "westminster"]; //london areas
const londonCommuters = ["chelmsford", "colchester", "dartford", "guildford", "milton keynes", "reading", "sevenoaks", "st albans", "tonbridge", "tunbridge wells", "watford", "windsor and maidenhead", "woking"]; //london commuter towns

/*
function to display property prices in a city
*/
function display(city) {

  let cityData = []; //to hold chart data
  let chart; //the chart object
  
  const duration = 100; // how long animation between new points should take (in milliseconds)
  const startIterator = 1; // how many points to render on init
  let currentIterator = startIterator; //initialized
  let maxIterator = 1; //maximum available data points

  const priceChartButton = $("#price-start-btn"); //the click button
  let priceChartButtonState = "Start"; //[Start, Stop, Resume, Restart] where Restart to chart again at end of data
  let priceChartIntervalId; //identifies an interval set by setInterval(), so can remove it later by clearInterval()
  
  // Fetch JSON data from file and start things
  fetch(propertyDataFile)
  .then(streamData => streamData.json()) //parse response stream to JSON
  .then(JSONdata => { 
    grabData(JSONdata);
    makeChart();
    initEvents();
  });
  
  /*
  function to prepare data
  convert JSON data into Highcharts-ready format and assign to a global variable
  */
  function grabData(data) {

    //[ [date, allPrice, detachedPrice, semidetachedPrice, terracedPrice, flatPrice], ...]
    for (let key in data) {
      
      if ( key.toLowerCase() === city.toLowerCase() ) { 
        cityData.push(
          data[key].map(datapoint => [datapoint.date, datapoint.detachedPrice, datapoint.semidetachedPrice, datapoint.terracedPrice, datapoint.flatPrice])
        );
      }

    }
    
    cityData = cityData[0]; //was an array of 1-element array containing the data, remove the unneeded outer-most array to make it array of arrays
    maxIterator = cityData.length; //count number of data points
    
  }
  
  /*
  function setting Highchart parameters and creating a Highchart chart object
  */
  function makeChart() {

    const chartParams = {

      chart: {
        type: 'column'
      },

      title: {
        floating: true, //can float above other elements
        align: 'left',
        text: '',
        x: 80,
        y: 20,
        style: {
          fontSize: '20px'
        }
      },

      xAxis: {
        min: 2003.7, //set x-axis to start from 2004, give some space for the initial left-side column bars which get cut off if started right at 2004
        softMax: 2010, //flexible max to expand if exceeded
        tickInterval: 1, //increment by 1 year
      },

      yAxis: {
        title: {
          text: 'Average prices (&#163;)',
          margin: 15
        },
        softMax: 200000,
        labels: {
          format: '{value:,.0f}' //thousand separator
        }
      }, 

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      }, 

      tooltip: {
        style: {
          fontSize: '10px' 
        },
        split: true,
        useHTML: true,
        formatter:  function() { 
          return [""].concat(
            this.points.map(point => 
              "<span style='color:" + point.series.color + "'>\u25CF </span>" + 
              point.series.name + ": &#163;" + (point.y).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            )          
          );
        }
      },

      series: [
        {
          name: "Detached",
          data: cityData.slice(0, startIterator).map(point => point[1])
        },
        {
          name: "Semi-detached",
          data: cityData.slice(0, startIterator).map(point => point[2])
        },
        {
          name: "Terraced",
          data: cityData.slice(0, startIterator).map(point => point[3])
        },
        {
          name: "Flat",
          data: cityData.slice(0, startIterator).map(point => point[4])
        }
      ], 

      plotOptions: {
        series: {
          pointStart: 2004, //data start from 2004
          pointInterval: 1/12, //monthly data, each point represents 1/12 of a year
          animation: {
            defer: 500,
            duration: duration
          },
          marker: {
            symbol: 'circle',
            enabled: false
          }
        }, 
        column: {
          borderWidth: 0,
          pointPadding: 0
        }
      },

      credits: {
        enabled: true,
        text: 'Source: HM Land Registry (House Price Index)',
        href: 'https://landregistry.data.gov.uk/',
        style: {
          fontSize: '10px'
        },
        position: {
          align: 'right'
        }
      }

    }; //end of chart options

    chart = Highcharts.chart("price-chart", chartParams);

  }
  
  /*
  function coordinating GUI button clicks to chart calls
  */
  function initEvents() {

    priceChartButton.on("click", function() {
      
      if (priceChartButtonState === 'Stop') { //user clicked btn when showing Stop

        priceChartIntervalId = clearInterval(priceChartIntervalId); //clear setInterval()
        priceChartButton.text("Resume");
        priceChartButtonState = "Resume"; //set button text and state to 'Resume'

      } else { //start charting

        // If animation has finished, recreate chart
        if (priceChartButtonState === 'Restart') {
          makeChart();
        }

        priceChartButton.text("Stop"); //starting chart and setting button text and state to 'Stop'
        priceChartButtonState = "Stop"; 
        redrawChart(++currentIterator); //pre-increment iterator and remake chart

        //repeatedly call function at set interval using setInterval(callback, interval)
        priceChartIntervalId = setInterval( function() {
          
          if (currentIterator == maxIterator) { //reached end of data observations, stop animation
            
            priceChartIntervalId = clearInterval(priceChartIntervalId); //clear setInterval()
            currentIterator = startIterator; //reset iterator
            priceChartButton.text("Restart");  //set button text and state variable
            priceChartButtonState = "Restart"; 
            
          } else {
            
            redrawChart(++currentIterator); //pre-increment iterator and remake chart
            
          }
        }, duration);

      }

    });

  }
  
  /*
  function to incrementally add data points to the chart for redraw
  */
  function redrawChart(iteration) {

    // To each series, add a point:
    chart.series.forEach(
      function(series, seriesIndex) {
       
        //series.addPoint(options [, redraw] [, shift] [, animation] [, withEvent]) where redraw is to redraw after an added point
        series.addPoint( 
          {
            y: cityData[iteration][seriesIndex + 1], 
            dataLabels: {
              enabled: false
            },
            marker: {
              enabled: false
            }
          },
          false, false, false, true
        );
        
      }
    );

    //data added, redraw chart
    chart.redraw({duration});

  }

} //end city price chart function

/*
function to compare different area/city indexed prices
*/
function compare(group) {

  let selectedGroup = [];
  switch(group) {
    case "national":
      selectedGroup = nationalCities;
      break;
    case "london":
      selectedGroup = londonCouncils;
      break;
    case "london commuters":
      selectedGroup = londonCommuters;
      break;    
  }
  
  /*
  globally used variables
  */
  let dataBundle = []; //to hold chart data
  let chart; //the chart object
  const percentageChartButton = $("#percentage-start-btn"); //the click button
  let percentageChartButtonState = "Start"; //[Start, Stop, Resume, Restart] where Restart to chart again at end of data

  const duration = 100; // how long animation between new points should take (in milliseconds)
  const startIterator = 1; // how many points to render on init
  let currentIterator = startIterator; //initialized
  let maxIterator = 1; //maximum available data points

  let intervalId; //identifies an interval set by setInterval(), so can remove it later by clearInterval()

  // Fetch JSON data from file and start things
  fetch(propertyDataFile)
  .then(streamData => streamData.json()) //parse response stream to JSON
  .then(JSONdata => { 
    prepareData(JSONdata);
    makeChart();
    initEvents();
  });

  /*
  function to prepare data
  convert JSON data into Highcharts-ready format and assign to a global variable
  */
  function prepareData(data) {

    //loop through JSON to construct data suitable for Highcharts
    //[ {city: city, data: [ [date, %], [date, %], ..., [date, %] ]}, ...]
    for (let key in data) {

      if ( selectedGroup.includes(key.toLowerCase()) ) { 
        dataBundle.push({
          "city": key, 
          "data": data[key].map(datapoint => [datapoint.date, datapoint.change*100])
        });
      }

    }

    maxIterator = dataBundle[0].data.length; //assuming all city series have the same number of data observations

  }

  /*
  function setting Highchart parameters and creating a Highchart chart object
  */
  function makeChart() {

    const chartParams = {

      chart: {
        type: 'line',
        marginBottom: 50
      },

      title: {
        floating: true, //can float above other elements
        align: 'left',
        text: '',
        x: 80,
        y: 20,
        style: {
          fontSize: '20px'
        }
      },

      xAxis: {
        min: 2004, //set x-axis to start from 2004
        softMax: 2010, //flexible max to expand if exceeded
        tickInterval: 1, //increment by 1 year
      },

      yAxis: {
        title: {
          text: 'Price appreciation (indexed at 2004)',
          margin: 15
        },
        softMax: 120
      }, 

      legend: {
        layout: 'proximate',
        align: 'right'
      }, 

      tooltip: {
        style: {
          fontSize: '7px' 
        },
        split: true,
        useHTML: true,
        formatter:  function() { 
          return [""].concat(
            this.points.map(point => 
              "<span style='color:" + point.series.color + "'>\u25CF </span>" + 
              point.series.name + ": " + (point.y).toFixed(0)
            )          
          );
        }
      },

      series: dataBundle.map(dataObj => {
        return {
          name: dataObj.city,
          data: dataObj.data.slice(0, startIterator).map(point => point[1])
        }
      }), 

      plotOptions: {
        series: {
          pointStart: 2004, //data start from 2004
          pointInterval: 1/12, //monthly data, each point represents 1/12 of a year
          animation: {
            defer: 500,
            duration: duration
          },
          marker: {
            symbol: 'circle',
            enabled: false
          }
        }
      },

      credits: {
        enabled: true,
        text: 'Source: HM Land Registry (House Price Index)',
        href: 'https://landregistry.data.gov.uk/',
        style: {
          fontSize: '10px'
        },
        position: {
          align: 'right'
        }
      }

    }; //end of chart options

    chart = Highcharts.chart("percentage-chart", chartParams);

  }


  /*
  function coordinating GUI button clicks to chart calls
  */
  function initEvents() {

    percentageChartButton.on('click', function() {
      
      if (percentageChartButtonState === 'Stop') { //user clicked btn when showing Stop

        intervalId = clearInterval(intervalId); //clear setInterval()
        percentageChartButton.text("Resume"); //set button text and state to 'Resume'
        percentageChartButtonState = 'Resume'; 

      } else { //start charting

        // If animation has finished, recreate chart
        if (percentageChartButtonState === 'Restart') {
          makeChart();
        }

        percentageChartButton.text("Stop"); //starting chart and setting button text and state to 'Stop'
        percentageChartButtonState = 'Stop'; 
        redrawChart(++currentIterator); //pre-increment iterator and remake chart

        //repeatedly call function at set interval using setInterval(callback, interval)
        intervalId = setInterval( function() {
          
          if (currentIterator == maxIterator) { //reached end of data observations, stop animation
            
            intervalId = clearInterval(intervalId); //clear setInterval()
            currentIterator = startIterator; //reset iterator
            percentageChartButton.text("Restart"); //set button text and state variable
            percentageChartButtonState = 'Restart'; 
            
          } else {
            
            redrawChart(++currentIterator); //pre-increment iterator and remake chart
            
          }
        }, duration);

      }

    });

  }

  /*
  function to incrementally add data points to the chart for redraw
  */
  function redrawChart(iteration) {

    // To each series, add a point:
    chart.series.forEach(
      function(series, seriesIndex) {

        //series.addPoint(options [, redraw] [, shift] [, animation] [, withEvent]) where redraw is to redraw after an added point
        series.addPoint( 
          {
            y: dataBundle[seriesIndex].data[iteration][1],
            dataLabels: {
              enabled: false
            },
            marker: {
              enabled: false
            }
          },
          false, false, false, true
        );
      }
    );

    //data added, redraw chart
    chart.redraw({duration});

  }

}
