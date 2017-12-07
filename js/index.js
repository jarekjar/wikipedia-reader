var addToDom = [];

$(document).ready(function() {
  $(".search").on("click", searchWiki);
});
var searchWiki = function() {
  $("#articlesContainer").hide();
  $("#articlesContainer").html("");
  var searchBy = $("#search").val();
  searchBy = encodeURIComponent(searchBy.trim());
  console.log(searchBy);
  $.getJSON(
    "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=?&gsrsearch=" +
      searchBy,
    function(data) {
      var results = data.query.pages;
      for (var a in results) {
        var data = {
          title: results[a].title,
          info: results[a].extract,
          pageID: results[a].pageid
        };
        loadTemplate(data);
      }
      $("#articlesContainer").append(addToDom);
      $("#articlesContainer").slideDown(2000);
      addToDom = [];
    }
  );
};

var template = [
  '<a href="https://en.wikipedia.org/?curid={{pageID}}">',
  '<div class="container">',
  '<div class="row text-center">',
  '<div class="border">',
  "<h2>{{title}}</h2>",
  "<p>{{info}}</p>",
  "</div>",
  "</div>",
  "</div>",
  "</a>"
].join("\n");

var loadTemplate = function(data) {
  var article = Mustache.render(template, data);
  addToDom.push(article);  
};