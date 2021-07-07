//script to detect if broswer is Safari, if yes then turn off CSS scroll-snapping
//reason is that safari behaves differently on scroll-snapping; when a page height is above 100vh, it keeps snapping back
$(document).ready(function() {

  var platform = navigator.platform.toLowerCase();
  var safari = ["iphone", "ipad", "mac"]; //keyword that should appear in navigator.platform is browser is safari
  
  //set boolean to check if device is iOS 
  var iOS = 0;
  for (var i = 0; i < safari.length; i++) {
    if ( platform.includes(safari[i]) ) {
      iOS = 1;
    }
  }

  //disable scroll snapping by setting scroll-snap-type to none if iOS detected
  if (iOS) {
    $("#mainpage-container").css("scroll-snap-type", "none");
  }

}
);

