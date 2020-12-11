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
  $("head").prepend('<link rel="apple-touch-icon" href="../assets/images/apple-touch-icon.png"></link>');
       
  //inserting Bootstrap, it can override my own css, pending review
  //$("head").prepend('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">');
  //$("head").prepend('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>');
  
}); 