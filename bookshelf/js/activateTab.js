/*script to assign .active to right tab when a bookshelf is back.
for ex, if a programming shelf is viewed and then comes back, the page should have programming tab active.
this requires the viewed shelf page embeds data to the bookshelf page, telling the bookshelf where which shelf was viewed before.
hence one page needs to pass data to another. 
it is done using a string query where a programming shelf will go back to the main bookshelf page via bookshelf.html#programming.
then bookshelf.html retrieves the data after #, by reading the url and spliting it with # as a delimiter, then trigger a click on the tab
*/ 
$(document).ready(function(){
  
  var tab = window.location.href.split("#")[1]; //retrieving anything following # from the url, if # doesn't exist it is undefined
  var tabID = "#" + tab; //make it html ID
  $(tabID).trigger("click"); //trigger a click
  $(tabID).blur(); //make it lose focus after a click

});