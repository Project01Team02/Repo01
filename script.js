// OMDb key is 333546da

var movieInputEl = document.querySelector('#movieInput');
var movieForm = document.querySelector('#movieForm');
var resultsDiv = document.querySelector("#results")

function getDrink(){
    var url =`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
    fetch(url)
    .then(function(response){
        response.json().then(function(data){
            console.log(data)
        })
    })
}
getDrink();

function getMovie(event) {
    event.preventDefault();
    var url =`https://www.omdbapi.com/?apikey=333546da&s=${movieInputEl.value}&type=movie`;
    fetch(url)
    .then(function(response){
        response.json().then(function(data){
            console.log(data)
            console.log(data.Search)
             //write a function to destroy the dynamically generated list
            addMovieTitle(data.Search) //array
           
        })
    })
    // Clears the search form upon submit
    movieForm.reset();
    
}
function addMovieTitle(movies){
    var movieList = document.createElement("ul")
    movieList.setAttribute("id", "movieList")
    resultsDiv.appendChild(movieList)
    for(var i = 0; i < movies.length; i++){
        var li = document.createElement("li")
        var btn = document.createElement("button")
        btn.textContent = `${movies[i].Title} (${movies[i].Year})`;
        btn.setAttribute("class","btn")
        btn.addEventListener("click", getMovieInfo)
        movieList.appendChild(li)
        li.appendChild(btn)


    }
  }
  function getMovieInfo(event){
    console.log(event.target)



  }
movieForm.addEventListener("submit",getMovie);


