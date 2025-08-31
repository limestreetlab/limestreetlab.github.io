
function initMap() {
  
      const tiffin = {
            lat: 51.424730,  
            lng: -0.303384
      };

      const catchmentMap = new google.maps.Map(document.getElementById("innerCatchmentMap"), {
            zoom: 12,
            center: tiffin, 
            mapTypeId: "terrain",
            zoomControl: true,
            cameraControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
      });

      const innerCatchmentCoordinates = [
            { lat: 51.455682, lng: -0.304159 },
            { lat: 51.456471, lng: -0.301992 },
            { lat: 51.450288, lng: -0.296281 },
            { lat: 51.436023, lng: -0.255453 },
            { lat: 51.415044, lng: -0.250217 },
            { lat: 51.410976, lng: -0.249101 },
            { lat: 51.407174, lng: -0.244381 },
            { lat: 51.401713, lng: -0.243866 },
            { lat: 51.398714, lng: -0.245153 },
            { lat: 51.395126, lng: -0.253479 },
            { lat: 51.393252, lng: -0.261032},
            { lat: 51.389280, lng: -0.268634},
            { lat: 51.397126, lng: -0.275779},
            { lat: 51.396926, lng: -0.277088},
            { lat: 51.396641, lng: -0.277249},
            { lat: 51.394115, lng: -0.280435},
            { lat: 51.392314, lng: -0.280982}, 
            { lat: 51.390781, lng: -0.281934},
            { lat: 51.387012, lng: -0.291396},
            { lat: 51.385459, lng: -0.295516},
            { lat: 51.379231, lng: -0.297683},
            { lat: 51.379941, lng: -0.301911},
            { lat: 51.378428, lng: -0.302640},
            { lat: 51.378177, lng: -0.302691},
            { lat: 51.378826, lng: -0.307109},
            { lat: 51.380303, lng: -0.308176},
            { lat: 51.384970, lng: -0.311223},
            { lat: 51.389951, lng: -0.315171},
            { lat: 51.392950, lng: -0.318390},
            { lat: 51.399217, lng: -0.309668},
            { lat: 51.402001, lng: -0.308295},
            { lat: 51.407623, lng: -0.308295},
            { lat: 51.416991, lng: -0.307093},
            { lat: 51.420631, lng: -0.305033},
            { lat: 51.424271, lng: -0.306921},
            { lat: 51.427642, lng: -0.311728},
            { lat: 51.430157, lng: -0.318079},
            { lat: 51.433100, lng: -0.326576},
            { lat: 51.440110, lng: -0.330010},
            { lat: 51.443855, lng: -0.326576},
            { lat: 51.448509, lng: -0.306149},
            { lat: 51.452092, lng: -0.302544},
            { lat: 51.454499, lng: -0.303488},
            { lat: 51.455682, lng: -0.304159 },
      ];


      // Construct the polygon.
      const innerCatchment = new google.maps.Polygon({
            paths: innerCatchmentCoordinates,
            strokeColor: "#810FCB",
            strokeOpacity: 0.5,
            strokeWeight: 3.0,
            fillColor: "#810FCB",
            fillOpacity: 0.3,
      });

      //add a marker for Tiffin and other schools, legacy API, Google now uses new AdvancedMarkerElement
      new google.maps.Marker({
            position: tiffin,
            map: catchmentMap,
            title: "Tiffin Girls School"
      });


      innerCatchment.setMap(catchmentMap);
  
};
