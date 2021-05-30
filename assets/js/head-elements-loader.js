//script to group and load commonly included head elements, required first jqeury for loading
$(document).ready(function() {
  
  //prepend or append doesn't matter, except for css insertions

  //inserting meta tags into head
  $("head").prepend('<meta name="description" content="Dean Street, Technology&#8745;Statistics">');
  $("head").prepend('<meta name="keywords" content="Dean Street Lab, Dean Street">');
  $("head").prepend('<meta name="author" content="Dean Street">');
  $("head").prepend('<meta charset="utf-8">');
  $("head").prepend('<meta name="robots" content="max-snippet:35, index, follow">');
  $("head").prepend('<meta name="viewport" content="width=device-width, initial-scale=1">');
  
  //inserting images into head
  $("head").prepend('<link rel="icon" type="image/png" href="../assets/images/favicon.png">');
  $("head").prepend('<link rel="apple-touch-icon" href="../assets/images/apple-touch-icon.png">');
       
}); 