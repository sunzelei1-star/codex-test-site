import { movies } from './data/movies.js';
import { createPosterGradient, createStars } from './utils/helpers.js';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const movieGrid = document.querySelector('#movie-grid');
const resultsText = document.querySelector('#results-text');
const featuredTitle = document.querySelector('#featured-title');
const featuredSummary = document.querySelector('#featured-summary');
const featuredLink = document.querySelector('#featured-link');

const featuredMovie = [...movies].sort((a, b) => b.rating - a.rating)[0];
featuredTitle.textContent = `${featuredMovie.title} · ${featuredMovie.year}`;
featuredSummary.textContent = featuredMovie.highlight;
featuredLink.href = `./movie.html?id=${featuredMovie.id}`;

function createMovieCard(movie) {
  return `
    <article class="movie-card">
      <div class="movie-poster" style="background:${createPosterGradient(movie.colors)}">
        <span class="movie-poster__badge">${movie.tag}</span>
      </div>
      <div class="movie-card__content">
        <h3>${movie.title}</h3>
        <p class="movie-meta">${movie.year} · ${movie.runtime} · ${movie.director}</p>
        <p class="movie-summary">${movie.summary}</p>
        <div class="movie-rating">${createStars(movie.rating)} ${movie.rating.toFixed(1)}</div>
        <div class="movie-meta">${movie.genre.join(' / ')}</div>
        <a class="card-link" href="./movie.html?id=${movie.id}">查看详情</a>
      </div>
    </article>
  `;
}

function renderMovies(query = '') {
  const keyword = query.trim().toLowerCase();
  const filteredMovies = movies.filter((movie) => {
    const haystack = [movie.title, movie.director, movie.genre.join(' '), movie.tag]
      .join(' ')
      .toLowerCase();

    return haystack.includes(keyword);
  });

  resultsText.textContent = keyword
    ? `共找到 ${filteredMovies.length} 部与 “${query}” 相关的电影`
    : `共收录 ${movies.length} 部精选电影`;

  if (!filteredMovies.length) {
    movieGrid.innerHTML = `
      <div class="empty-state">
        <h3>没有找到相关电影</h3>
        <p>试试搜索别的片名、导演或类型，例如“科幻”“诺兰”。</p>
      </div>
    `;
    return;
  }

  movieGrid.innerHTML = filteredMovies.map(createMovieCard).join('');
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  renderMovies(searchInput.value);
});

searchInput.addEventListener('input', (event) => {
  renderMovies(event.target.value);
});

renderMovies();
