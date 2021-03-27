const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9d69a5ee94809f5868c19ee653bb5f08&page=1';
const imgPath = 'https://image.tmdb.org/t/p/w500';
const searchUrl = 'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=9d69a5ee94809f5868c19ee653bb5f08&query="';

const main= document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('Search');

getMovie(apiUrl);
async function getMovie(url){
  const result = await fetch(url);
  const data = await result.json();

  console.log(data.results);
  showMovies(data.results);
}


function showMovies(movies){
  main.innerHTML = '';

  movies.forEach((movie) => {

    const {title, poster_path, vote_average, overview} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = ` 
    <img src="${imgPath + poster_path}" alt="${title}" />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getrat(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
  
  </div>`;

    main.appendChild(movieEl);
    
  });
}

function getrat(vote){
  if( vote >= 8){
    return 'green';
  } else if( vote >= 5){
      return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== ''){
    getMovie(searchUrl + searchTerm);
    search.value='';
  } else {
    window.location.reload();
  }
});

