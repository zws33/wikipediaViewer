
function myFunction(){
  var searchButton = document.getElementById('searchButton');
  var resultsContainer = document.getElementById('resultsContainer');
  var keyword;

  function test(string) {
    console.log(string);
  }

  function getKeyword() {
    return document.getElementById("searchBox").value;
  }

  //Function to create list of search results
  function createResultsList(data) {
    test('createResultsList is running');

    var ul = document.createElement('ul');
    ul.className = "list-group";

    for (var i=0; i<=data.length; i++){
      var li = document.createElement('li');
      var a = document.createElement('a');
      var h1 = document.createElement('h1');
      var p = document.createElement('p');

      var title = data[i].title;
      var url = "http://en.wikipedia.org/wiki/" + title.replace(/ /g, "_");
      var snippet = data[i].snippet +"...";

      h1.innerHTML = title;
      p.innerHTML = snippet;

      a.appendChild(h1);
      a.appendChild(p);
      a.href = url;

      li.className = "list-group-item";
      li.appendChild(a);
      //test(li);
      ul.appendChild(li);
      //test(ul);
    }
    test(ul);
    return ul;
  }

  function showResults(res) {
    test('showResults is running');
    //Remove top margin for search bar
    document.getElementById("input-group").style.margin ="0";

    //Store data in variables
    var searchData = res.query.search;
    test("searchData stored");
    // Create list of results
    var resultsList = createResultsList(searchData);
    test(resultsList);
    // Append list of results to resultsContainer
    resultsContainer.appendChild(resultsList);
  }

  searchButton.addEventListener("click", function(event){
    //Clear previous search results
    resultsContainer.innerHTML="";

    //Get keyword
    var keyword = getKeyword();

    $.ajax({
      type: "GET",
      url: "https://en.wikipedia.org/w/api.php",
      data: {
        action: 'query',
  			format: 'json',
  			list: 'search',
  			srprop: 'snippet',
  			srsearch: keyword
      },
      dataType: 'jsonp',
      success: function( response ){
        showResults(response);
      }
    });
  });  
}
