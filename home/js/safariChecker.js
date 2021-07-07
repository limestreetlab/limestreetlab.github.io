//script to detect if broswer is Safari, if yes then turn off CSS scroll-snapping
//reason is that safari behaves differently on scroll-snapping; when a page height is above 100vh, it keeps snapping back
$(document).ready(function() {

  var platform = navigator.platform.toLowerCase();
  var ios = ["iphone", "ipad", "mac"]; //keyword that should show in navigator.platform if browser is safari
  
  //set boolean to check if device is apple 
  var isSafari = 0;
  for (var i = 0; i < ios.length; i++) {
    if ( platform.includes(ios[i]) ) {
      isSafari = 1;
    }
  }

  //disable scroll snapping by setting scroll-snap-type to none if iOS detected
  if (isSafari) {
    $("#mainpage-container").css("scroll-snap-type", "none");
  }

}
);

