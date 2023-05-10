// OMDb key is 333546da

// Create constant arrays of drinks (gathered via Cocktail Database api) for each genre? Perhaps 3 to 5 options per array?
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
    
    // Trims the year from the event target's text content
    var movieInfo = event.target.textContent;
    console.log(movieInfo);
    var index = movieInfo.lastIndexOf(' ');
    movieInfo = movieInfo.substring(0, index);
    // Puts a "+" in place of any spaces in the title, for API URL purposes
    var movieInfoPlus = movieInfo.replaceAll(' ', '+');
    console.log(movieInfoPlus);

    /* CHRIS ASKS: AFTER THE TRIM ABOVE, DOES THIS SEQUENCE MAKE SENSE?:
    
    Create API using movieInfoPlus variable:
    https://www.omdbapi.com/?apikey=333546da&t=${movieInfoPlus}
    
    Fetch complete movie info using said API URL

    Use genre info from selected film, randomly select a drink from the drink category that we tie to said genre. Perhaps we have to create an array of a few drinks for each category?

    Display movie title with poster image on page, with drink pairing (and drink thumbnail image?) alongside/underneath
    
    
    */



  }
movieForm.addEventListener("submit",getMovie);


