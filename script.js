// OMDb key is 333546da

// Create constant arrays of drinks (gathered via Cocktail Database api) for each genre? Perhaps 3 to 5 options per array?
var movieInputEl = document.querySelector('#movieInput');
var movieForm = document.querySelector('#movieForm');
var resultsDiv = document.querySelector("#results")

function readSearchesFromStorage() {
    var movies = localStorage.getItem('searches');
    if (movies) {
      movies = JSON.parse(movies);
    } else {
      movies = [];
    }
    console.log(movies);
    return movies;
  }
  
  // saves the array of searched movie terms to local storage 
  function saveSearchesToStorage(movies) {
    localStorage.setItem('searches', JSON.stringify(movies));
  }

function addHistoryToPage() {
 
    var movies = readSearchesFromStorage();
    var searchHistoryDiv = document.querySelector("#searchHistoryDiv")
  
    for (var i = 0; i < movies.length; i++) {
      var newMovie = movies[i];
      var btn = document.createElement('button');
      btn.innerHTML = newMovie;    
      searchHistoryDiv.appendChild(btn)
    }
  }

  function getMovieFromHistory(event) {
    event.preventDefault();
    var movieHistoryName = event.target.textContent;
    console.log(movieHistoryName);
    var url =`https://www.omdbapi.com/?apikey=333546da&s=${movieHistoryName}&type=movie`;
    fetch(url)
    .then(function(response){
        response.json().then(function(data){
            destroyList();
            clearDrink();
            addMovieTitle(data.Search) //array
            
        })
    })
    // Clears the search form upon submit
    movieForm.reset();
}

const horrorDrinks = ['Bloody Punch', 'Corpse Reviver', 'Freddy Kruger', 'Grim Reaper', 'Holloween Punch'];

const actionDrinks = ['Bounty Hunter','Buccaneer','Miami Vice','Vesper'];

const comedyDrinks = ['A Piece of Ass', 'Arizona Antifreeze', 'Brain Fart', 'Damned If You Do', 'Happy Skipper', 'Slippery Nipple'];

const crimeDrinks = ['Death in the Afternoon', 'Duchamp\'s Punch', 'Godfather', 'Shot-gun'];

const adventureDrinks = ['A Day at the Beach','Alice In Wonderland','Atlantic Sun','Blue Lagoon','Gideon\'s Green Dinosaur','Grizzly Bear','Jewel of the Nile','Waikiki Beachcomber'];

const dramaDrinks = ['Absolutly Screwed Up','Affair','Bleeding Surgeon','Bruised Heart','Butterfly Effect','Gentleman\'s Club','Hemingway Special']

const romanceDrinks = ['Between the Sheets', 'Cosmopolitan', 'Foxy Lady', 'Screaming Orgasm', 'Sex on the Beach'];

const warDrinks = ['Artillery', 'B-52', 'Veteran']; 

const musicalDrinks = ['Funk and Soul', 'Girl From Ipanema','Jitterbug']

const miscDrinks = ['Tequila Sunrise', 'Bijou', 'Old Fashioned', 'Daiquiri', 'Whiskey Sour']

const sciFiDrinks = ['Green Goblin','Space Odyssey']

function getDrink(genre){
    var drink;
    if(genre == "Action"){
        randomIndex = Math.floor(Math.random()*actionDrinks.length);
        drink = actionDrinks[randomIndex];
    }else if(genre == "Comedy"){
        randomIndex = Math.floor(Math.random()*comedyDrinks.length);
        drink = comedyDrinks[randomIndex];
    }else if(genre == "Horror"){
        randomIndex = Math.floor(Math.random()*horrorDrinks.length);
        drink = horrorDrinks[randomIndex];
    }else if(genre == "Crime"){
        randomIndex = Math.floor(Math.random()*crimeDrinks.length);
        drink = crimeDrinks[randomIndex];
    }else if(genre == "Sci-Fi"){
        randomIndex = Math.floor(Math.random()*sciFiDrinks.length);
        drink = sciFiDrinks[randomIndex];
    }else if(genre == "War"){
        randomIndex = Math.floor(Math.random()*warDrinks.length);
        drink = warDrinks[randomIndex];
    }else if(genre == "Adventure"){
        randomIndex = Math.floor(Math.random()*adventureDrinks.length);
        drink = adventureDrinks[randomIndex];
    }else if(genre == "Romance"){
        randomIndex = Math.floor(Math.random()*romanceDrinks.length);
        drink = romanceDrinks[randomIndex];
    }else if(genre == "Drama"){
        randomIndex = Math.floor(Math.random()*dramaDrinks.length);
        drink = dramaDrinks[randomIndex];
    }else if(genre == "Musical"){
        randomIndex = Math.floor(Math.random()*musicalDrinks.length);
        drink = musicalDrinks[randomIndex];
    }else{
        randomIndex = Math.floor(Math.random()*miscDrinks.length);
        drink = miscDrinks[randomIndex];
    }
    var url =`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;
    fetch(url)
    .then(function(response){
        response.json().then(function(data){
            console.log(data);
            var drinkDiv = document.querySelector('#drinkDiv')
            var drinkTitle = document.createElement('h3');
            drinkTitle.setAttribute("id","drinkTitle");
            drinkTitle.setAttribute("style","z-index:1");
            drinkTitle.textContent = data.drinks[0].strDrink;
            drinkDiv.appendChild(drinkTitle);
            var drinkImg = document.createElement('img');
            drinkImg.setAttribute("id","drinkImg");
            drinkImg.setAttribute("src",`${data.drinks[0].strDrinkThumb}/preview`);
            drinkDiv.appendChild(drinkImg);
           
            getDetails(data)
          

            
        })
    })
}

function getDetails(data){
    var arr = data.drinks[0];
    var ingredient = `strIngredient`
    var measure = `strMeasure`
    var ingredients = [] 
    var measurements = []
    var instructions = arr.strInstructions;
    var fullIngredients = "";
    var recipeDiv = document.querySelector("#recipeDiv");
    for(var i = 1; i <= 15; i++){
        ingredient = `strIngredient${i}`
        measure = `strMeasure${i}`
        if(arr[ingredient]){
            ingredients.push(arr[ingredient])
            measurements.push(arr[measure])        
        }
    } 
    var ins = document.createElement('p');
    ins.textContent = instructions;
    ins.setAttribute("id","ins")
    ins.setAttribute("class","text-base")
    
    var ingr = document.createElement('p');
    ingr.setAttribute("id","ingr")
    ins.setAttribute("class","text-base")
    for(var i = 0; i < ingredients.length; i++){
        if(measurements[i] == null){
            fullIngredients += `${ingredients[i].trim()}, `
        }else{
        fullIngredients += `${ingredients[i].trim()} (${measurements[i].trim()}), `}

    }
    fullIngredients = fullIngredients.slice(0,-2)
    ingr.textContent = fullIngredients;
    recipeDiv.appendChild(ingr)
    recipeDiv.appendChild(ins);



}

function getMovie(event) {
    event.preventDefault();
    var movieName = document.querySelector('#movieInput').value.trim();
    console.log(movieName);
  
    if (!movieName) {
      console.error("You must enter a search term!");
      return;
    }
    var movies = readSearchesFromStorage();
    movies.unshift(movieName);
    saveSearchesToStorage(movies);
    searchHistoryDiv.innerHTML = '';
      addHistoryToPage();
    var url =`https://www.omdbapi.com/?apikey=333546da&s=${movieInputEl.value}&type=movie`;
    fetch(url)
    .then(function(response){
        response.json().then(function(data){
            console.log(data)
            console.log(data.Search)
            destroyList();
            clearDrink();
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
        btn.addEventListener("click", getMovieInfo)
        movieList.appendChild(li)
        li.appendChild(btn)
    }
  }

function destroyList(){
    var movieList = document.querySelector('#movieList');
    if (movieList){movieList.remove()}
    
    var tags = document.querySelectorAll("li")
    for(var i = 0; i < tags.length; i++){
        tags[i].remove();
    }
}

function clearDrink(){
    var drinkTitle = document.querySelector('#drinkTitle');
    if (drinkTitle){drinkTitle.remove()}
    var drinkImg = document.querySelector('#drinkImg');
    if (drinkImg){drinkImg.remove()}
    var drinkDesc = document.querySelector('#drinkDesc');
    if (drinkDesc){drinkDesc.remove()}
    var drinkLink = document.querySelector('#drinkLink');
    if (drinkLink){drinkLink.remove()}
    var movieTitle = document.querySelector('#movieTitle');
    if (movieTitle){movieTitle.remove()}
    var movieImg = document.querySelector('#movieImg');
    if (movieImg){movieImg.remove()}
    var ins = document.querySelector('#ins');
    if (ins){ins.remove()}
    var ingr = document.querySelector('#ingr');
    if (ingr){ingr.remove()}

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
    fetch(`https://www.omdbapi.com/?apikey=333546da&t=${movieInfoPlus}`)
    .then(function(response){
        response.json().then(function(data){
            console.log(data)
            destroyList()
            var movieDiv = document.querySelector('#movieDiv')
            var movieTitle = document.createElement('h3');
            movieTitle.setAttribute("id","movieTitle");
            movieTitle.textContent = data.Title;
            movieDiv.appendChild(movieTitle);
            var movieImg = document.createElement('img');
            movieImg.setAttribute("id","movieImg");
            movieImg.setAttribute("src",`${data.Poster}`);
            movieDiv.appendChild(movieImg);

            var genres = data.Genre;
            var genresArray = genres.split(',');
            for(var i = 0; i < genresArray.length; i++){
                genresArray[i]=genresArray[i].trim();
            }
            randomIndex = Math.floor(Math.random()*genresArray.length);
            var randomGenre = genresArray[randomIndex];
            console.log(randomGenre)
            
            getDrink(randomGenre);

        })
    })
}

// Prints existing search history on initial page load   
addHistoryToPage();

// event listener for the search button
movieForm.addEventListener("submit",getMovie);

// event listener for clicks on the search history entries
searchHistoryDiv.addEventListener('click', getMovieFromHistory);
