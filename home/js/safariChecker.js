//script to detect if broser is Safari, if yes then turn off CSS scroll-snapping
$(document).ready(function() {
  var platform = navigator.platform.toLowerCase();
  var safari = ["iphone", "ipad", "mac"]; //keyword that should appear in navigator.platform is browser is safari
  
  var iOS = 0; //a boolean flag
  for (var i = 0; i < safari.length; i++) {
    if ( platform.includes(safari[i]) ) {
      iOS = 1;
    }
  }

  alert(iOS);


}
);

