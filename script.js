let currentPage = 1
let currentSearch = ""
const loader = document.getElementById("loader")
const input = document.getElementById("searchInput")
const button = document.getElementById("searchBtn")
const moviesContainer = document.getElementById("moviesContainer")

const nextBtn = document.getElementById("nextBtn")
const prevBtn = document.getElementById("prevBtn")

button.addEventListener("click", function(){
    currentPage=1;
    currentSearch = input.value
    searchMovies()
})

async function searchMovies(){
    const movieName= currentSearch;
    loader.style.display = "block"
    moviesContainer.innerHTML = ""
    const response = await fetch(`https://www.omdbapi.com/?s=${movieName}&page=${currentPage}&apikey=1b8efc6b`);
    const data = await response.json()
    loader.style.display = "none"
    moviesContainer.innerHTML =""
    if(data.Response === "False"){
        moviesContainer.innerHTML ="<p>No Movies Found</p>"
        return
        }
    data.Search.forEach(function(movie){

        const poster = movie.Poster !== "N/A" 
            ? movie.Poster
            : "https://placehold.co/300x450?text=No+Image"

        const movieCard = document.createElement("div")
        movieCard.classList.add("movie")
        movieCard.innerHTML =`
        <img src="${poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        `
         movieCard.addEventListener("click", function(){
        getMovieDetails(movie.imdbID)
        })

        moviesContainer.appendChild(movieCard)
        input.value =""
    })
}
async function getMovieDetails(id){
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=1b8efc6b`)
    const data = await response.json()
    const modal = document.getElementById("movieModal")
    const details = document.getElementById("movieDetails")
        details.innerHTML = `
        <img src="${data.Poster}" style="width:200px">
        <h2>${data.Title}</h2>
        <p><b>Year:</b> ${data.Year}</p>
        <p><b>Genre:</b> ${data.Genre}</p>
        <p><b>Actors:</b> ${data.Actors}</p>
        <p><b>Plot:</b> ${data.Plot}</p>
        <p><b>IMDB Rating:</b> ${data.imdbRating}</p>
`
    modal.style.display = "flex"
}
input.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        currentPage = 1
        currentSearch = input.value
        searchMovies()
    }
})

const closeBtn = document.getElementById("closeModal")

closeBtn.addEventListener("click", function(){
document.getElementById("movieModal").style.display = "none"
})

nextBtn.addEventListener("click", function(){
    currentPage++
    searchMovies()
})
prevBtn.addEventListener("click", function(){
    if(currentPage>1){
        currentPage--
        searchMovies()
    }
})